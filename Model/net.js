import {Neuron} from "../Model/neuron.js"
export const defaultInput = [0,0];

export const actFns = {
	LINEAR: "linear", 
	BINSTEP: "binstep", //binary step
    SIGMOID: "sigmoid",
    TANH: "tanh",
    RELU: "relu", //rectified linear unit
    LRELU: "lrelu", //leaky relu
}

export const defaultActFn = actFns.SIGMOID;

export class Layer{
    layerNumber;
    neurons; //list of neurons in layer
    layerInputs = [];  //list of inputs to all neurons in layer
    layerOutputs; //list of all outputs from neurons in layer

    //no such thing as an empty layer
    constructor(){
        this.neurons=[];
        var n = new Neuron();
        this.addNeuron(n);
    }

    addNeuron(){
        var n = new Neuron();
        this.neurons.push(n);
        n.neuronNumber=this.neurons.length-1;
    }

    removeNeuron(){
        this.neurons.pop();
    }

    //get output from each neuron in layer
    getLayerOuts(){
        var lo=[];
        this.neurons.forEach(function(neuron) {
            lo.push(neuron.output);
        });
        this.layerOutputs=lo;
        return this.layerOutputs; 
    }

    //for each neuron in layer, set same inputs
    setLayerIns(v){
        this.neurons.forEach(function(neuron) {
            neuron.setInputs(v);
        });
    }

    printLayer(){
        this.neurons.forEach(function(neuron) {
            console.log("  neuron #"+neuron.neuronNumber);
            neuron.printNeuron();
        });
        console.log("Layer " + this.layerNumber + " outs: " + this.layerOutputs);
    }

    getNeurons(){
        return this.neurons;
    }
}

export class Net{
    layers; //list of layers
    netInput; //input to layer 0
    netActFn; //activation function
    target;
    netOut;
    error;
    error_tot;

    constructor(){
        this.setNetActFn(defaultActFn);
        this.setNetInput(defaultInput);
        this.layers=[];
        this.addLayer();
        this.update();
    }

    setNetInput(data,target){
        this.netInput=data;
        this.target=target;
    }

    setNetActFn(actfn){
        this.netActFn=actfn;
    }

    addLayer(){
        var l = new Layer();
        this.layers.push(l);
        l.layerNumber=this.layers.length-1;
    }

    removeLayer(){
        this.layers.pop();
    }

    //need a way to access layers in order to add a neuron
    //remember layer numbers start at 0
    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }

    update(){
        this.getLayer(0).setLayerIns(this.netInput);
        var netfn = this.netActFn;

        for(var i=0; i<this.layers.length-1; i++){
        //    console.log("net actfn: "+ this.netActFn);

            //update act fn for each neuron to user input
            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                if(neuron.actFun != netfn){
                    neuron.actFun = netfn;
                }
            //    console.log("neuron actfn: " + neuron.actFun);
             //   console.log("net actfn in loop: " + netfn);

                neuron.calcOut();
            });

            //all outputs from layer i become inputs for layer i+1
            this.getLayer(i+1).setLayerIns(this.getLayer(i).getLayerOuts());
        }

        //need this to get final outputs
        var lastLayer = this.layers.length-1;
        this.getLayer(lastLayer).neurons.forEach(function(neuron){
            if(neuron.actFun != netfn){
                neuron.actFun = netfn;
            }
            neuron.calcOut();
        });
        this.netOut=this.getLayer(lastLayer).getLayerOuts();

        this.calcError();
        }

    calcError(){
        this.error = this.target-this.netOut;
        this.error_tot = (this.error ** 2) * 0.5;
    }

    backProp(){
        var lastLayer = this.layers.length-1;

        //currently pretending net has 1 input, 1 hidden, 1 output

        //how much does the total error change with respect to the output?
        var graderr_wrtout = -this.target - this.netOut; // ∂error_tot/∂out
        console.log("graderr_wrtout " + graderr_wrtout);
     /*   error_tot  = 1/2(target-out)^2
          ∂error_tot/∂out = 2 * 0.5(target-out)^(2-1) * -1 + 0
          ∂error_tot/∂out = -(target-out) 
     */  

        //how much does the net output change with respect to net input
        //need to get derivative of actfn
        // right now using default sigmoid
        var gradout_wrtin = this.netOut * (1-this.netOut);
       
        var gradnet_wrtweight =  this.getLayer(lastLayer-1).getLayerOuts();

        var gradetot_wrtweight = graderr_wrtout * gradout_wrtin * gradnet_wrtweight;
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
net.getLayer(1).addNeuron();
net.connect();
net.printNet_weights();
console.log("---------------------------ROUND 4-------------------------------")
net.addLayer();
net.connect();
net.printNet();
*/

