
class Neuron{
    neuronNumber;
    bias;
    inputs;

    constructor(){
        this.bias = Math.random() * 2 - 1 //bias between -1 and 1
        this.inputs={
            values: [],
            weights: []
        };
    }

    //use during setup
    //weights are random
    setIns_init(v){
        this.inputs.values=v;
        var numInputs= this.inputs.values.length;
        for(var i =0; i<numInputs; i++){
            this.inputs.weights[i]=Math.random();
        }
    }

    setIns(v,w){
        this.inputs.values=v;
        this.inputs.weights=w;
    }

    printNeuron(){
        var ins = "";
        var ws = "";
        
        for(var i =0; i<this.inputs.values.length; i++){
            ins += this.inputs.values[i] + " ";
            ws += this.inputs.weights[i].toFixed(2) + " ";
        }
        console.log("    inputs: " + ins + " weights: " + ws);
    }
}

class Layer{
    layerNumber;
    neurons;

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

    printLayer(){
        this.neurons.forEach(function(neuron) {
            console.log("  neuron #"+neuron.neuronNumber);
            neuron.printNeuron();
        });
    }
}

class Net{
    layers;

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
    //remember layer numbers start at 0!
    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }

    printNet(){
        console.log("Net has " + this.layers.length + " layers")
        this.layers.forEach(function(layer) {
            console.log(" Layer #"+ layer.layerNumber + " has " + layer.neurons.length + " neurons");
            layer.printLayer();
        });

    }
}

const net = new Net();
const staticInput = [1.0, 5.0, -6.0, 4];

net.addLayer();
net.addLayer();
net.getLayer(0).addNeuron();

net.getLayer(0).neurons.forEach(function(neuron) {
    neuron.setIns_init(staticInput);
});


net.printNet();
