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
    outLayer_temp;
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

        this.setLearnRate(0.2);
    }

    setOutLayer(){
        this.outLayer_temp=new Layer();
        for(var i=0;i<this.target.length-1;i++){
            this.outLayer_temp.addNeuron();
        }
        this.layers.push(this.outLayer_temp);
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
            this.layers.splice(this.layers.length-1,0,l);
            l.layerNumber=this.layers.length-2;


        }
        console.log(l.layerNumber);

        this.lastLayer = this.getLayer(this.layers.length-1);
        this.lastLayer.layerNumber=this.layers.length-1;

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
        this.lastLayer = this.getLayer(this.layers.length-1);
        this.lastLayer.neurons.forEach(function(neuron){
            if(neuron.actFun != netfn){
                neuron.actFun = netfn;
            }
            neuron.calcOut();
        });
        this.netOut=this.lastLayer.getLayerOuts();
        
    }

    learn(){
        this.calcCost();
        this.backProp_finalLayer();
        this.backProp_hiddenLayer();
        //iterate thru dataset
        this.dataIdx=(this.dataIdx+1)%this.data.length;
   //    this.dataIdx=0;  // use for testing one data point
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

        this.cost[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;

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

    // might come back to this...
/*    calcError_old(){
        this.eTot=0;
        if (this.target !== undefined){
            for( var i = 0; i<this.target.length; i++){
                this.error[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;
                this.eTot=this.eTot+this.error[i];
                this.delta[i]=this.netOut[i]-this.target[i];
                console.log("target: " + this.target[i]+ " net: " +this.netOut[i]+ " error: "+this.error[i]);

            }
            console.log("Error total: " + this.eTot);
        }


       //     this.error=this.target-this.netOut;

     //   this.error = this.target-this.netOut;
     //   this.error_tot = (this.error ** 2) * 0.5;
        //Etot = 1/2 (target-output)^2
        
    }

    backProp_long(){
        console.log('\n' + "--BACKPROP LONG--");
        switch(this.netActFn){
            case(actFns.LINEAR):
        
                var lr = this.learnRate;
                var etot = this.eTot;
                var dlta = this.delta;
                
                for(var i =0; i<this.lastLayer.neurons.length; i++){
                    var oldweightf=[];
                    oldweightf = this.lastLayer.neurons[i].weights;
                    console.log("OLDF: "+ oldweightf)
                    
                    var newweightf = [];
                    newweightf[0] = oldweightf[0] - lr*dlta*this.lastLayer.neurons[i].inputs[0];
                    newweightf[1] = oldweightf[1] - lr*dlta*this.lastLayer.neurons[i].inputs[1];
                    console.log("NEWF: "+newweightf)
                    this.oldweightf=oldweightf;
                }

                for(var i =0; i<this.getLayer(0).neurons.length; i++){
                    var oldweighth=[];
                    oldweighth = this.getLayer(0).neurons[i].weights;
                    console.log("OLDH: "+ oldweighth)
                    
                    var newweighth = [];
                    newweighth[0] = oldweighth[0]-lr*dlta*this.getLayer(0).neurons[i].inputs[0]*this.oldweightf[0];
                    newweighth[1] = oldweighth[1]-lr*dlta*this.getLayer(0).neurons[i].inputs[1]*this.oldweightf[1];
                    console.log("NEWH: "+ newweighth)

                }
            break;
        }
    }

    backProp(){
    console.log('\n' + "--BACKPROP--");

        switch(this.netActFn){
            case(actFns.LINEAR):
                var lr = this.learnRate;
                var etot = this.eTot;
                var dlta = this.delta;

                //for each layer, starting at final
                for(var layeri = this.layers.length-1; layeri>-1; layeri--){
                    //for each neuron
                    for(var neuroni =0; neuroni< this.getLayer(layeri).neurons.length; neuroni++){
                        console.log("layer" +layeri +" neuron" + neuroni+ " "+this.getLayer(layeri).getNeuron(neuroni).weights);
                        //for each WEIGHT
                        for(var weighti =0; weighti< this.getLayer(layeri).neurons[neuroni].weights.length; weighti++){
                            //for final layer
                            if(layeri-1>=0){
                                //weights_new = oldweights-(learnrate)(delta)(output from previous layer)
                                this.getLayer(layeri).getNeuron(neuroni).weights_new[weighti]=
                                    this.getLayer(layeri).getNeuron(neuroni).weights[weighti]-lr*dlta*
                                        this.getLayer(layeri-1).layerOutputs[weighti]
                            //so close...
                            }else{
                            this.getLayer(layeri).getNeuron(neuroni).weights_new[weighti]=
                                    this.getLayer(layeri).getNeuron(neuroni).weights[weighti]-lr*dlta*
                                        this.netInput[weighti] /* *this.getLayer(layeri+1).getNeuron(neuroni).weights[weighti];
                            }

                        }
                        console.log("NEW layer" +layeri +" neuron" + neuroni+ " "+this.getLayer(layeri).getNeuron(neuroni).weights_new);
                    }   
                }
            break;
        }
    }



   backProp(){
     I honestly forget what I was going for here
       var lastLayer = this.layers.length-1;

        //currently pretending net has 1 input, 1 hidden, 1 output

        //how much does the total error change with respect to the output?
        var graderr_wrtout = -this.target - this.netOut; // ∂error_tot/∂out
        console.log("graderr_wrtout " + graderr_wrtout);
          error_tot  = 1/2(target-out)^2
          ∂error_tot/∂out = 2 * 0.5(target-out)^(2-1) * -1 + 0
          ∂error_tot/∂out = -(target-out) 
      

        //how much does the net output change with respect to net input
        //need to get derivative of actfn
        // right now using default sigmoid
        var gradout_wrtin = this.netOut * (1-this.netOut);
       
        var gradnet_wrtweight =  this.getLayer(lastLayer-1).getLayerOuts();

        var gradetot_wrtweight = graderr_wrtout * gradout_wrtin * gradnet_wrtweight;

    }
*/
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

