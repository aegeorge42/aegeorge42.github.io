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
        this.calcCost();
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
        this.calcCost();

    }

    learn(){
    //    this.backprop();
        this.backprop_test();

        this.calcCost();
        this.updateWeights_test();

        //iterate thru dataset
        this.dataIdx=(this.dataIdx+1)%this.data.length;
       //this.dataIdx=0;  // use for testing one data point
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
                }
            }
//            console.log(" total cost: " + this.costTot);
        } 
    }

    //multiple neurons per layer
    backprop_test(){
    //    console.log("-------------")
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);
            //console.log(" layer " +currentLayer.layerNumber);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);
                //console.log(" neuron "+ currentNeuron);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);
                    //console.log(" weight "+currentWeight);


                    //dz_dw
                    if(currentLayer.layerNumber==0){
                        currentNeuron.dz_dw[k]=this.netInput[k];
                    } else {
                        currentNeuron.dz_dw[k]=this.getLayer(currentLayer.layerNumber-1).getNeuron(k).output;
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

                    //dc_da

                    if(currentLayer.layerNumber==this.layers.length-1){
                        currentNeuron.dc_da[k]=currentNeuron.output-this.target[j];
                    } else {

                          // dear god
                        for(var m = 0; m<this.getLayer(currentLayer.layerNumber+1).getNeuron(k).weights.length; m++){
                            currentNeuron.dc_da[k]=this.getLayer(currentLayer.layerNumber+1).getNeuron(k).weights[m];
                        }


                        //currentNeuron.dc_da[k]=this.getLayer(currentLayer.layerNumber+1).getNeuron(k).weights[k];
                        console.log(this.getLayer(currentLayer.layerNumber+1).getNeuron(k));

                        //    currentNeuron.dc_da[k] = this.getLayer(currentLayer.layerNumber+1).getNeuron(j).dc_da[j]
                    //    * this.getLayer(currentLayer.layerNumber+1).getNeuron(k).da_dz;
                    //console.log(this.getLayer(currentLayer.layerNumber+1));
                    //console.log(this.getLayer(currentLayer.layerNumber+1).getNeuron(j));

                        //    (this.getLayer(currentLayer.layerNumber+1).getNeuron(k).da_dz
                    //     * this.getLayer(currentLayer.layerNumber+1).getNeuron(k).dc_da[k]
                    //     * this.getLayer(currentLayer.layerNumber+1).getNeuron(k).weights[k]);
                    }

                    currentNeuron.dc_dw[k]= currentNeuron.dc_da[k]*currentNeuron.da_dz*currentNeuron.dz_dw[k];
                    //console.log(currentNeuron.dc_da[k]*currentNeuron.da_dz*currentNeuron.dz_dw[k])
                //    console.log("dc_da"+currentNeuron.dc_da[k])

                }
                
            }
        }
    }
    
    backprop(){
/*
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
                        currentNeuron.dz_dw[k]=this.getLayer(currentLayer.layerNumber-1).getNeuron(k).output;
                    }

                    //dc_dw
                    currentNeuron.dc_dw[k]= currentNeuron.dc_da[k]*currentNeuron.da_dz*currentNeuron.dz_dw[k];
                    //console.log(currentNeuron);

                    console.log("layer " + currentLayer.layerNumber + '\n'
                            + "neuron " + currentNeuron.neuronNumber + '\n'
                            + "  weight " + k + " = " + currentWeight + '\n'
                            + "     dc_da = " + currentNeuron.dc_da + '\n'
                            + "     da_dz = " + currentNeuron.da_dz + '\n'
                            + "     dz_dw = " + currentNeuron.dz_dw + '\n' + '\n'
                            + "     dc_dw = " + currentNeuron.dc_dw + '\n' + '\n'


                            );
                            
                   //  currentNeuron.w_new[k]=currentWeight-(this.learnRate*(currentNeuron.dc_dw));
                    // currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                
                }
            }

        }
*/
    }

    updateWeights_test(){
        console.log("...............................")
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);
                    
                    var grad = -1*this.learnRate*(currentNeuron.dc_dw[k]);
                //    console.log(""+grad)
                    currentNeuron.w_new[k]= currentWeight+grad;
                    currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                }
                console.log("layer " + currentLayer.layerNumber + '\n'
                            + "neuron " + currentNeuron.neuronNumber + '\n'
                            + "  weights " + currentNeuron.weights + '\n'
                            + "     dc_da = " + currentNeuron.dc_da + '\n'
                            + "     da_dz = " + currentNeuron.da_dz + '\n'
                            + "     dz_dw = " + currentNeuron.dz_dw + '\n' + '\n'
                            + "     dc_dw = " + currentNeuron.dc_dw + '\n');
                
            }
        }
    }

    updateWeights(){
        /*
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);

                    var grad = -1*this.learnRate*(currentNeuron.dc_dw);
                    currentNeuron.w_new[k]= currentWeight+grad;
                    currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                }
            }
        }
        */
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

