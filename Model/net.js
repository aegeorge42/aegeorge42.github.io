
//activation functions enum
export const actFns = {
	LINEAR: "linear", 
	BINSTEP: "binstep", //binary step
    SIGMOID: "sigmoid",
    TANH: "tanh",
    RELU: "relu", //rectified linear unit
    LRELU: "lrelu", //leaky relu
}

//stuff to set in controller w user input
export const defaultInput = [0,0];
export const defaultActFn = actFns.LINEAR;

export class Neuron{
    neuronNumber;
    bias;
    inputs;
    weights;
    output_nofn; //output before activation fn (same as using linear)
    output; // output after activation fn
    actFun;

    constructor(){
        this.bias = Math.random() * 2 - 1 //bias between -1 and 1
        this.inputs = [];
        this.actFun = [];
        this.setActFn(defaultActFn);
    }

    setActFn(actfn){
        this.actFun=actfn;
    }

    setInputs(v){
        this.inputs=v;

        //if neuron is brand new and needs to be added in
        if(this.weights === undefined){
            this.weights=[];
            for(var i =0; i<this.inputs.length; i++){
            this.weights[i]= Math.random() * 2 - 1; 
           }
        }

        //if a neuron has some inputs already but needs more
        //because another neuron was added in the prev layer
        if(this.weights.length < v.length){
            for(var i=this.weights.length; i<v.length; i++){
                this.weights[i]=Math.random() * 2 - 1;
            }
        }

        if(this.weights.length > v.length){
            this.weights.pop();
        }

        
    }

    calcOut(){
        var outlist = [];
        var outsum = 0;
        for(var i = 0; i<this.weights.length; i++){
            outlist[i]= this.inputs[i]*this.weights[i];
            
            outsum=outsum+outlist[i];
        }
        this.output_nofn = outsum;


        switch(this.actFun){
            case(actFns.LINEAR):
                this.output = outsum;
            break;
            case(actFns.BINSTEP):
                if(outsum <= 0){
                    this.output = 0;
                } else{
                    this.output= 1;
                }
            break;
            case(actFns.SIGMOID):
                this.output=1/(1+(Math.E ** -outsum));
                break;

        }
    }

    printNeuron(){
        var ins = "";
        var ws = "";
        var os = ""; 
        var o = "";

        for(var i =0; i<this.inputs.length; i++){
            ins += this.inputs[i].toFixed(2) + " ";
            ws += this.weights[i].toFixed(2) + " "; 
        }

        os = this.output_nofn.toFixed(2) + " ";
        o = this.output.toFixed(2) + " ";
        console.log("inputs " + ins + "weights " + ws + "outsum: " + os + "out: " + o);
    }
}

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

    constructor(){
        this.setNetActFn(defaultActFn);
        this.setNetInput(defaultInput);
        this.layers=[];
        this.addLayer();
        this.update();
    }

    setNetInput(data){
        this.netInput=data;
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
        this.getLayer(lastLayer).getLayerOuts();
    }

    //update(){
       // console.log("........................");
       // console.log("net has " + this.layers.length + "layers");
    //   console.log("UPDATE");
     //  this.connect();
    //   this.printNet();
    //}

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

