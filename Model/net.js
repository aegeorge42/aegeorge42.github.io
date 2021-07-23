import {Layer} from "../Model/layer.js"
import {actFns} from "../Model/actfns.js"

//export const defaultInput = [];
//const defaultTarget =[];
//const defaultTargetText =[];

export const defaultInput = {
    input: [],
    expected: [],
    expected_text: []
};

export const defaultActFn = actFns.LINEAR;

/* for each neuron in each layer
this.layers.forEach(function(layer) {
    layer.neurons.forEach(function(neuron) {
        //do stuff
    });
});
*/

//TODO - Clone net function

export class Net{
    data; //list of entire data set
    dataIdx; //current data point

    layers; //list of layers
    lastLayer; //makes my life easier
//    outLayer_temp;
    netInput; //input to layer 0
    netActFn; //activation function
    target;
    targetText;
    netOut;
    cost;
    costTot;
//    error;
//    eTot;
   learnRate;
//    delta;
//    oldweightf; //TO DELETE
    w_old;

    constructor(){
        this.data=[];
//        this.setNetActFn(defaultActFn);
        this.dataIdx=0;
        this.setNetInput(defaultInput);
        this.netActFn=actFns.LINEAR;
        this.layers=[];
        this.cost=[];
        this.delta=[];
        this.w_old=[];
        this.addLayer();
        this.update();

        this.setLearnRate(0.05);
    }

    setOutLayer(){
        var outLayer_temp=new Layer();
        outLayer_temp.layerNumber=0;
        for(var i=0;i<this.target.length-1;i++){
            outLayer_temp.addNeuron();
        }
        this.layers.push(outLayer_temp);
        
    }

    setNetData(data){
        this.data=data;
    }

    setNetInput(datapoint){
        this.netInput=datapoint.input;
        this.target=datapoint.expected;
        this.targetText=datapoint.expected_text;
    }

    setNetActFn(actfn){
        this.netActFn=actfn;
    }

    setLearnRate(lr){
        if(this.learnRate===undefined){
            this.learnRate=0.05;
        }
        this.learnRate=lr;
    }

    addLayer(){
        var l = new Layer();
        if(this.layers.length ==0){
            this.layers.push(l);
            l.layerNumber=this.layers.length-1;

            
        }
        else {
            this.layers.splice((this.layers.length-1),0,l);
            l.layerNumber=this.layers.length-2;


        }
    }

    removeLayer(){
        this.layers.splice(this.layers.length-2,1);
       // this.layers.pop();
    }

    //need a way to access layers in order to add a neuron
    //remember layer numbers start at 0
    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }

    update(){

        this.lastLayer = this.getLayer(this.layers.length-1);
        this.lastLayer.layerNumber=this.layers.length-1;

//        console.log("LR: " + this.learnRate);
        this.getLayer(0).setLayerIns(this.netInput);
        var netfn = this.netActFn;

        for(var i=0; i<this.layers.length-1; i++){
        //    console.log("net actfn: "+ this.netActFn);
//        console.log(this.layers[i].layerBias);

            //update act fn for each neuron to user input
            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                if(neuron.actFun != netfn){
                    neuron.actFun = netfn;
                }
//                console.log("neuron actfn: " + neuron.actFun);
//                console.log("net actfn in loop: " + netfn);

                neuron.calcOut();
            });

            //all outputs from layer i become inputs for layer i+1
            this.getLayer(i+1).setLayerIns(this.getLayer(i).getLayerOuts());
        }

        //need this to get final outputs
        this.lastLayer.neurons.forEach(function(neuron){
            if(neuron.actFun != netfn){
                neuron.actFun = netfn;
            }
            neuron.calcOut();
        });
        this.netOut=this.lastLayer.getLayerOuts();

    }

    learn(){
    //    this.calcCost();
        this.bptest();
        this.updateWeights();
    //    this.backprop();
    //    this.backProp_finalLayer();
   //     this.backProp_hiddenLayer();
        //iterate thru dataset
    //    this.dataIdx=(this.dataIdx+1)%this.data.length;
       this.dataIdx=0;  // use for testing one data point
       this.setNetInput(this.data[this.dataIdx]);
    }

    //each neuron in the final layer will have a cost
    calcCost(){
        this.costTot=0;
        if (this.target !== undefined){
            for( var i = 0; i<this.target.length; i++){
                if(this.netOut[i] !== undefined){
                    this.cost[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;
                    this.costTot=this.costTot+this.cost[i];
//                    console.log(
//                    "neuron " + i +'\n'
//                    + "expected: " + this.target[i]+'\n'
//                    + "actual: " + this.netOut[i] +'\n'
//                    + "cost: " + this.cost[i] +'\n'); 
                }
            }
//            console.log(" total cost: " + this.costTot);
        } 
    }

    backProp_finalLayer(){

        
       // this.cost[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;

        //z = output_nofn

        //if I only have one output
        var dc_dw=[]; //partial derivative of cost wrt weight (layer l)
      
        var dz_dw=[]; //partial derivative of (stuff inside actfn - aka "z") (weight*a^(l-1) + bias) wrt weight (layer l)
        var da_dz=[]; //partial derivative of neuron output (layer l) wrt z
        var dc_da=[]; //partial derivative of cost wrt neuron output (layer l-1)
        // var delta=[]; this works but probably won't use
        // var dtest=[];

        var w_old= [];
        var w_new= [];

        if (this.target !== undefined){
            for(var i=0; i<this.lastLayer.neurons.length; i++){
                for(var j=0; j<this.lastLayer.neurons[i].weights.length; j++){
                //dc_da
                dc_da[i]=(this.netOut[i]-this.target[i]);
             
            
                //da_dz
                switch(this.netActFn){
                    case(actFns.LINEAR):
                        da_dz[i]=1;
                    break;
                    case(actFns.SIGMOID):
                        da_dz[i]= this.netOut[i]*(1-(this.netOut[i]))
                    break;    
                }

                //dz_dw
                if(this.layers.length >1){
                    dz_dw[i]=this.getLayer(this.layers.length-2).neurons[j].output;
                } else {
                    dz_dw[i]=this.netInput[j];
                }

                //chain rule to get partial derivative of cost wrt weight (layer l)
                dc_dw[i] = dz_dw[i] * da_dz[i] * dc_da[i]; 
                
//                console.log(this.getLayer(this.layers.length-2).neurons[j].output)
                // delta[i] = -(this.target[i] - this.netOut[i]) * ( (this.netOut[i])*(1-this.netOut[i]));   
                // dtest[i] = -(delta[i]*dz_dw[i]);
                w_old[i]=this.getLayer(this.layers.length-1).neurons[i].weights[j];
                w_new[i]=w_old[i]-(this.learnRate*(dc_dw[i]));

                console.log("neuron " + i +'\n' //+ " = " +this.getLayer(this.layers.length-1).neurons[j].output +'\n'
                 + "weight " + j + " = " + this.getLayer(this.layers.length-1).neurons[i].weights[j] +'\n'

                 + "    cost:  " + this.cost[i] + '\n'
                 + "    costTot:  " + this.costTot + '\n'
                 + "    dc_da: " + dc_da[i] + '\n'
                 + "    da_dz: " + da_dz[i] + '\n' 
              //   + "    dz_dw: " + dz_dw[i] + '\n' 
                 + "    dz_dw: " + dz_dw[i] + '\n' 

                 + "    dc_dw: " + dc_dw[i] + '\n'
                 + "    weights_old: " + w_old[i] + '\n'
                 + "    weights_new: " + w_new[i]
                 );

                 w_old[i]=w_new[i];
                 this.getLayer(this.layers.length-1).neurons[i].setWeight(j,w_old[i]);
                 //this.getLayer(this.layers.length-1).neurons[i].setWeight(i,w_old[i]);
            

                }
            }
        }
    }

    backProp_hiddenLayer(){
        //TODO: something is weird with layer numbers
        var dc_dwh=[];
        var dz_dwh=[]; 
        var da_dzh=[]; 
        var dc_dah=0; 

        var w_oldh= [];
        var w_newh= [];

        var currentLayer=this.getLayer(this.layers.length-2);

        if (this.target !== undefined){
            for(var i=0; i<currentLayer.neurons.length; i++){
                for(var j=0; j<currentLayer.neurons[i].weights.length; j++){
                   
                 //dz_dw
                    if(this.layers.length >2){
                        dz_dwh[i]=this.getLayer(currentLayer.layerNumber-1).neurons[j].output;
                    } else {
                        dz_dwh[i]=this.netInput[j];
                    }

                    //da_dz
                    switch(this.netActFn){
                        case(actFns.LINEAR):
                            da_dzh[i]=1;
                        break;
                        case(actFns.SIGMOID):
                            da_dzh[i]= (currentLayer.neurons[j].output)*(1-currentLayer.neurons[j].output)
                        break;    
                    }

                    //todo get all weights from layer cleanly
                    var wf = [];

                //    console.log(this.getLayer(this.layers.length-1).neurons.weights);


                    //dc_da

                    var da_dzf=[];
                    var dc_daf=[];
                    var dc_dahpart=[];


                    for (var k =0; k<this.getLayer(this.layers.length-1).neurons.length; k++){
                        dc_daf[k]= (this.netOut[k]-this.target[k]);
                        da_dzf[k]= this.netOut[k]*(1-(this.netOut[k]));
                        wf[k]=this.getLayer(this.layers.length-1).neurons[k].weights;
                        dc_dahpart[k]=(dc_daf[k]*da_dzf[k]*wf[k])
                        dc_dah=dc_dah+dc_dahpart[k];
                    }

                    //console.log("dc_daf" + dc_daf)
                    //console.log("wf" + wf)

                    //console.log("da_dzf" + da_dzf)
                    //console.log("dc_dah" + dc_dah)

                    dc_dwh[i]=dc_dah*da_dzh[i]*dz_dwh[i];
                    console.log("dc_da"+dc_dah);
                    console.log("da_dz"+da_dzh);
                    console.log("dz_dw"+dz_dwh);

                    
                    w_oldh[i]=currentLayer.neurons[i].weights[j];
                    w_newh[i]=w_oldh[i]-(this.learnRate*(dc_dwh[i]));

                    console.log(w_oldh);
                    console.log(w_newh);


                        console.log("neuron " + i +'\n'
                 + "weight " + j + " = " + this.getLayer(this.layers.length-2).neurons[i].weights[j] +'\n'

                 + "    cost:  " + this.cost[i] + '\n'
                 + "    costTot:  " + this.costTot + '\n'
                 + "    dc_da: " + dc_dah + '\n'
                 + "    da_dz: " + da_dzh[i] + '\n' 
                 + "    dz_dw: " + dz_dwh[i] + '\n' 

                 + "    dc_dw: " + dc_dwh[i] + '\n'
                 + "    weights_old: " + w_oldh[i] + '\n'
                 + "    weights_new: " + w_newh[i]
                 );

                 w_oldh[i]=w_newh[i];
                 currentLayer.neurons[i].setWeight(j,w_oldh[i]);
                 //w_old[i]=w_new[i];
                 //this.getLayer(this.layers.length-1).neurons[i].setWeight(j,w_old[i]);

                }
            }
        }
    }

    backprop(){
       // this.cost[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;
        //z = output_nofn

        //TODO!!!! MAKE THESE PART OF NEURON, NOT VARS
        var dc_dw=[]; //partial derivative of cost wrt weight (layer l)
        var dz_dw=[]; //partial derivative of stuff inside actfn - aka "z" (weight*a^(l-1) + bias) wrt weight (layer l)
        var da_dz=[]; //partial derivative of neuron output (layer l) wrt z
        var dc_da=[]; //partial derivative of cost wrt neuron output (layer l-1)

        var w_old= [];
        var w_new= [];

        var layerIdx=1;
        var currentLayer=this.getLayer(this.layers.length-layerIdx);

        for(var i=this.layers.length-1; i>-1; i--){
//            var currentLayer=this.getLayer(i);
            for(var j=0; j<currentLayer.neurons.length; j++){
 //               var currentNeuron=currentLayer.getNeuron(j);
                for(var k=0; k<currentLayer.neurons[j].weights.length; k++){
    //                var currentWeight=this.getLayer(currentLayer).getNeuron(currentNeuron).getWeight(k);

                //    console.log("current layer: " + currentLayer + " current neuron: " + currentNeuron + " current weight " + currentWeight);
                    //dc_da
                    if(currentLayer.layerNumber==this.layers.length-1){
                        dc_da[j]=(this.netOut[j]-this.target[j]);
                    } else {
                        //TODO
                        dc_da[j]=0;
                    }

                    //da_dz
                    switch(this.netActFn){
                        case(actFns.LINEAR):
                            da_dz[j]=1;
                        break;
                        case(actFns.SIGMOID):
                           da_dz[j]= (currentLayer.neurons[j].output)*(1-currentLayer.neurons[j].output)
                        break;    
                    }

                    console.log("layer " + i + '\n'
                                + "neuron " + j +'\n'
                                + "weight " + k + " = " + currentLayer.neurons[j].weights[k] +'\n'
                                + "    cost:  " + this.cost[j] + '\n'
                                + "    costTot:  " + this.costTot + '\n'
                                + "    dc_da: " + dc_da + '\n'
                                + "    da_dz: " + da_dz[j] + '\n' 
                                + "    dz_dw: " + dz_dw[j] + '\n' 

                                + "    dc_dw: " + dc_dw[j] + '\n'
                                + "    weights_old: " + w_old[j] + '\n'
                                + "    weights_new: " + w_new[j]
                 );

                }
            }
        }
    }
    
    bptest(){
//        console.log("----------");
        this.costTot=0;
        for( var i = 0; i<this.target.length; i++){
            if(this.netOut[i] !== undefined){
                
                this.cost[i]=0.5 * (this.netOut[i]-this.target[i]) ** 2;
//                console.log(this.cost);
                this.costTot=this.costTot+this.cost[i];
            }
        }

        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);
            //console.log(" layer " +currentLayer.layerNumber);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);
                //console.log(" neuron "+ currentNeuron);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);
                    //console.log(" weight "+currentWeight);

                    //dc_da 
                    if(currentLayer.layerNumber==this.layers.length-1){
                        currentNeuron.dc_da[j]=currentNeuron.output-this.target[j];
                    } else {
                        //idxes prob wrong
                        currentNeuron.dc_da[k] = 
                        (this.getLayer(currentLayer.layerNumber+1).getNeuron(j).da_dz
                         * this.getLayer(currentLayer.layerNumber+1).getNeuron(j).dc_da
                         * this.getLayer(currentLayer.layerNumber+1).getNeuron(j).weights[k]);
                    }

                    //da_dz
                    switch(this.netActFn){
                        case(actFns.LINEAR):
                            currentNeuron.da_dz=1;
                        break;
                        case(actFns.SIGMOID):
                            currentNeuron.da_dz=(currentNeuron.output)*(1-currentNeuron.output);
                        break;    
                    }

                    //dz_dw
                    if(currentLayer.layerNumber==0){
                        currentNeuron.dz_dw[k]=this.netInput[k];
                    } else {
                        currentNeuron.dz_dw=this.getLayer(currentLayer.layerNumber-1).getNeuron(k).output;
                    }

                    //dc_dw
                    currentNeuron.dc_dw[k]= currentNeuron.dc_da[k]*currentNeuron.da_dz*currentNeuron.dz_dw;
                    //console.log(currentNeuron);

//                    var grad = -1*this.learnRate*(currentNeuron.dc_dw);
//                    currentNeuron.w_new[k]=currentWeight-(this.learnRate*(currentNeuron.dc_dw));
//                    currentNeuron.setWeight(k,currentNeuron.w_new[k]);

/*                    console.log("layer " + currentLayer.layerNumber + '\n'
                            + "neuron " + currentNeuron.neuronNumber + '\n'
                            + "  weight " + k + " = " + currentWeight + '\n'
                            + "     dc_da = " + currentNeuron.dc_da + '\n'
                            + "     da_dz = " + currentNeuron.da_dz + '\n'
                            + "     dz_dw = " + currentNeuron.dz_dw + '\n' + '\n'
                            + "     dc_dw = " + currentNeuron.dc_dw + '\n' + '\n'

                            + "     w_old = " + currentWeight+ '\n'
                            + "     grad  = " + grad + '\n'
                            + "     w_new = " + currentNeuron.w_new[k]

                            );
*/                            
                   //  currentNeuron.w_new[k]=currentWeight-(this.learnRate*(currentNeuron.dc_dw));
                    // currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                
                }
            }

        }

    }

    updateWeights(){
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);
            //console.log(" layer " +currentLayer.layerNumber);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);
                //console.log(" neuron "+ currentNeuron);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);

        var grad = -1*this.learnRate*(currentNeuron.dc_dw);
        currentNeuron.w_new[k]=currentWeight-(this.learnRate*(currentNeuron.dc_dw));
        currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                }
            }
        }

    }

    printNet(){
        console.log("Net has " + this.layers.length + " layers")
        this.layers.forEach(function(layer) {
            console.log('\n');
            console.log(" Layer #"+ layer.layerNumber + " has " + layer.neurons.length + " neurons");
            console.log("----------LAYER " + layer.layerNumber + "----------");
            layer.printLayer();
        }); 
    }

    printNet_weights(){
        console.log("Net has " + this.layers.length + " layers")

        this.layers.forEach(function(layer) {
            console.log("----------LAYER " + layer.layerNumber + "----------");
           // layer.printLayer();
            layer.neurons.forEach(function(neuron) {
                console.log("w: " +neuron.weights);
            });
        });
    }

    clone(){

    }
    
}


/*const net = new Net();
const staticInput = [1.0, 5.0];

net.getLayer(0).addNeuron();
net.getLayer(0).setLayerIns(staticInput);
net.addLayer();
net.connect();
/*console.log("---------------------------ROUND 1-------------------------------")
net.printNet_weights();
net.connect();
console.log("---------------------------ROUND 2-------------------------------")
net.printNet_weights();
console.log("---------------------------ROUND 3-------------------------------")
net.getLayer(1).addNeuron();f
net.connect();
net.printNet_weights();
console.log("---------------------------ROUND 4-------------------------------")
net.addLayer();
net.connect();
net.printNet();
*/

