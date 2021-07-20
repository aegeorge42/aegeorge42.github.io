import {Neuron} from "../Model/neuron.js"

export class Layer{
    layerNumber;
    neurons; //list of neurons in layer
    layerInputs = [];  //list of inputs to all neurons in layer
    layerOutputs; //list of all outputs from neurons in layer
//    layerBias = 0;  //each layer has the same bias
    layerWeights = [];

    //no such thing as an empty layer
    constructor(){
    //    this.layerNumber=0;
        this.neurons=[];
        var n = new Neuron();
        this.addNeuron(n);
//      this.setLayerBias(Math.random() * 2 - 1);
//        this.setLayerBias(0);
//        console.log("LAYER BIAS" + this.layerBias)
    }

    setLayerBias(b){
 //       this.layerBias=b;
//        console.log(this.neurons);
 //       this.neurons.forEach(function(neuron) {
 //           neuron.setBias(b);
  //      });
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

    getNeuron(n){
        return this.neurons[n];
    }

    getLayerWeights(){
        this.forEach(function(neuron) {
            this.layerWeights.push(neuron.weights);
        });
        return this.layerWeights;
    }
}