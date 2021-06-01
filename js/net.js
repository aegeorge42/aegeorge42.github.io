
//activation functions enum
const actFns = {
	LINEAR: "linear", 
	BINSTEP: "binstep", //binary step
    SIGMOID: "sigmoid",
    TANH: "tanh",
    RELU: "relu", //rectified linear unit
    LRELU: "lrelu", //leaky relu
}

class Neuron{
    neuronNumber;
    bias;
    numInputs;
    values;
    weights;
    output_nofn;
    output;

    constructor(){
        this.bias = Math.random() * 2 - 1 //bias between -1 and 1
        this.values = [];
    }

    //use during setup
    //weights are random
    setIns_init(v){
        this.values=v;
        this.weights=[];
        var numInputs= this.values.length;
        for(var i =0; i<numInputs; i++){
            this.weights[i]=Math.floor(Math.random() * (1000 - 100) + 100) / 100; //CHANGE BACK TO SAME AS BIAS
        }
    }

    setIns(v,w){
        this.values=v;
        this.weights=w;
    }

    calcOut(){
        var outlist = [];
        var out = 0;
        for(var i = 0; i<this.weights.length; i++){
            outlist[i]= this.values[i]*this.weights[i];
            out=out+outlist[i];
        }
        this.output_nofn = outlist;
        this.output = out;
    }

    printNeuron(){
        var ins = "";
        var ws = "";
        var os = "";
        var o = "";

        //for printin ugh
        for(var i =0; i<this.values.length; i++){
            ins += this.values[i] + " ";
            ws += this.weights[i] + " ";
            if(this.output_nofn !== undefined){
                os += this.output_nofn[i] + " ";         
            }
        }

        if(this.output !== undefined){
            o=this.output;
        }

        console.log("    inputs: " + ins + " weights: " + ws + "outputs: " + os + "out: " +o);
    }
}

class Layer{
    layerNumber;
    neurons; //list of neurons in layer
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

    getLayerOuts(){
        var lo=[];
        this.neurons.forEach(function(neuron) {
            lo.push(neuron.output);
        });
        this.layerOutputs=lo;
        return this.layerOutputs; 
    }

    //for each neuron in layer, set same inputs
    //change input params to layer?
    setLayerIns(v){
        this.neurons.forEach(function(neuron) {
           // console.log(neuron.weights);
            if(neuron.weights === undefined){
                neuron.setIns_init(v);
            } 
        });
    }

    printLayer(){
        this.neurons.forEach(function(neuron) {
            console.log("  neuron #"+neuron.neuronNumber);
            neuron.printNeuron();
        });
        console.log("Layer " + this.layerNumber + " outs: " + this.layerOutputs);

        
    }
}

class Net{
    layers; //list of layers

    constructor(){
        this.layers=[];
        var l = new Layer();
        this.addLayer(l);
    }

    addLayer(){
        var l = new Layer();
        this.layers.push(l);
        l.layerNumber=this.layers.length-1;
    }

    //need a way to access layers in order to add a neuron
    //remember layer numbers start at 0
    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }

    connect(){
        for(var i=0; i<this.layers.length-1; i++){

            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                neuron.calcOut();
            });

            //all outputs from layer i become inputs for layer i+1
            this.getLayer(i+1).setLayerIns(this.getLayer(i).getLayerOuts());
        }

        //need this to get final outputs
        var lastLayer = this.layers.length-1;
        this.getLayer(lastLayer).neurons.forEach(function(neuron){
            neuron.calcOut();
        });
        this.getLayer(lastLayer).getLayerOuts();
    }

    update(){
        console.log("........................");
        console.log("net has " + this.layers.length + "layers");
    }

    printNet(){
        console.log("Net has " + this.layers.length + " layers")
        this.layers.forEach(function(layer) {
            //console.log(" Layer #"+ layer.layerNumber + " has " + layer.neurons.length + " neurons");
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

const net = new Net();
const staticInput = [1.0, 5.0];

net.getLayer(0).addNeuron();
net.getLayer(0).setLayerIns(staticInput);
net.addLayer();
net.connect();
console.log("---------------------------ROUND 1-------------------------------")
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







