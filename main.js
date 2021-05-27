
class Neuron{
    neuronNumber;
    bias;
    numInputs;
    inputs;
    output_nofn;
    output;

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
            this.inputs.weights[i]=Math.floor(Math.random() * (1000 - 100) + 100) / 100; //CHANGE BACK TO SAME AS BIAS
        }
    }

    setIns(v,w){
        this.inputs.values=v;
     //   this.inputs.weights=w;
    }

    calcOut(){
        var outlist = [];
        var out = 0;
        for(var i = 0; i<this.inputs.weights.length; i++){
            outlist[i]= this.inputs.values[i]*this.inputs.weights[i];
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
        for(var i =0; i<this.inputs.values.length; i++){
            ins += this.inputs.values[i] + " ";
            ws += this.inputs.weights[i] + " ";
            if(this.output_nofn !== undefined){
                os += this.output_nofn[i] + " ";             }
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
            console.log("neuron out" + neuron.output);

            console.log("lo: " + lo);
        });
        this.layerOutputs=lo;
        console.log("OUTPTS: " +this.layerOutputs);

                                    /*//just for printin
                                    var los = [];
                                    for(var i =0; i<this.layerOutputs.length; i++){
                                    //     los += this.layerOutputs[i].toFixed(2) + " ";
                                        los += this.layerOutputs[i] + " ";

                                    }

                                    // console.log("Layer " + this.layerNumber + " outs: " + los);
                                    */
        return this.layerOutputs; 
    }

    //for each neuron in layer, set same inputs
    //change input params to layer?
    setLayerIns(v){
        console.log("setlayerins");
        this.neurons.forEach(function(neuron) {
           neuron.setIns_init(v);
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
        //console.log("here");
       // var currlayer = this.getLayer(0);
     //   currlayer.getLayerOuts();
      //  var nextlayer = this.getLayer(1);
      //  this.getLayer(1).setLayerIns(this.getLayer(0).getLayerOuts());
        

        console.log("total layers: " +this.layers.length);
        for(var i=0; i<this.layers.length-1; i++){

            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                neuron.calcOut();
            });

            //all outputs from layer i become inputs for layer i+1
            this.getLayer(i+1).setLayerIns(this.getLayer(i).getLayerOuts());
        }
        //need this
        

        var lastLayer = this.layers.length-1;
        this.getLayer(lastLayer).neurons.forEach(function(neuron){
            neuron.calcOut();
        });
        this.getLayer(lastLayer).getLayerOuts();
        console.log("lastLayer: " +lastLayer);
        


       /* for(var i=0; i<this.layers.length; i++){
            console.log(this.layers.length+ " layers");
            console.log("layer " + i + " outs: " + this.getLayer(i).getLayerOuts());
            this.getLayer(i++).setLayerIns(this.getLayer(i).getLayerOuts());
        }
        this.getLayer(1).printLayer();*/
    }

    //put it all together boys
    //needs to run every time a neuron/layer is added/removed



    printNet(){
        console.log("Net has " + this.layers.length + " layers")
        this.layers.forEach(function(layer) {
            //console.log(" Layer #"+ layer.layerNumber + " has " + layer.neurons.length + " neurons");
            console.log("----------LAYER " + layer.layerNumber + "----------");
            layer.printLayer();
        });

    }
}

const net = new Net();
const staticInput = [1.0, 5.0];

net.getLayer(0).addNeuron();
net.getLayer(0).setLayerIns(staticInput);



//net.printNet();
//net.getLayer(0).neurons[0].calcOut();
//net.getLayer(0).neurons[1].calcOut();
net.addLayer();

//net.printNet();
net.connect();

//net.getLayer(1).setLayerIns();
net.getLayer(1).neurons[0].calcOut();
//net.connect();
//net.getLayer(1).neurons[0].calcOut();


console.log("AFTER");
//net.printNet();

console.log("-------LAYER 0---------");
net.getLayer(0).printLayer();

console.log("-------LAYER 1---------");
//net.getLayer(1).getLayerOuts();
//net.getLayer(1).printLayer();

net.printNet();
