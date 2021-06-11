
//activation functions enum
export const actFns = {
	LINEAR: "linear", 
	BINSTEP: "binstep", //binary step
    SIGMOID: "sigmoid",
    TANH: "tanh",
    RELU: "relu", //rectified linear unit
    LRELU: "lrelu", //leaky relu
}

export const staticInput = [1.0, 2.0];

export class Neuron{
    neuronNumber;
    bias;
    inputs;
    weights;
    output_nofn;
    output;
    actFun;

    constructor(){
        this.bias = Math.random() * 2 - 1 //bias between -1 and 1
        this.inputs = [];
        this.actFun = [];
        this.setActFn(actFns.BINSTEP);
    }

    setActFn(actfn){
        this.actFun=actfn;
    }


    //TODO:THIS IS SO UGLY

    //use during setup
    //weights are random
    //if neuron is brand new and needs to be added in
    setIns_init_undef(v){
        this.inputs=v;
        this.weights=[];
        for(var i =0; i<this.inputs.length; i++){
            this.weights[i]= Math.random() * 2 - 1; //Math.floor(Math.random() * (1000 - 100) + 100) / 100; //CHANGE BACK TO SAME AS BIAS
        }
    }

    //if a neuron has some inputs already but needs more
    //because another neuron was added in the prev layer
    setIns_init(v){
        this.inputs=v;

        for(var i=this.weights.length; i<v.length; i++){
            this.weights[i]=this.weights[i]= Math.random() * 2 - 1;//Math.floor(Math.random() * (1000 - 100) + 100) / 100; //CHANGE BACK TO SAME AS BIAS
        }
    }

    setIns(v){
        this.inputs=v;
    }


    calcOut(){
        var outlist = [];
        var out = 0;
        for(var i = 0; i<this.weights.length; i++){
            outlist[i]= this.inputs[i]*this.weights[i];
            out=out+outlist[i];
        }
        this.output_nofn = out;


        switch(this.actFun){
            case(actFns.LINEAR):
                this.output = out;
            break;
            case(actFns.BINSTEP):

                if(out <= 0){
                    this.output = 0;
                } else{
                    this.output= 1;
                }
            break;
        }
    }

    printNeuron(){
        var ins = "";
        var ws = "";
        var os = "";
        var o = "";

        //for printin ugh
        for(var i =0; i<this.inputs.length; i++){
            ins += this.inputs[i] + " ";
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

export class Layer{
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
            if(neuron.weights === undefined){
                neuron.setIns_init_undef(v);

            } else if(neuron.weights.length != v.length){
                neuron.setIns_init(v);
            } else {
                neuron.setIns(v);
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

    getNeurons(){
        return this.neurons;
    }
}

export class Net{
    layers; //list of layers
    netInput; //input to layer 0

    constructor(){
        this.layers=[];
        this.addLayer();
    //    this.getLayer(0).setLayerIns(staticInput);
    //    this.setNetInput(staticInput);
        this.connect();
    }

    setNetInput(data){
        this.netInput=data;
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

        this.getLayer(0).setLayerIns(staticInput);

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
       // console.log("........................");
       // console.log("net has " + this.layers.length + "layers");
       console.log("UPDATE");
       this.connect();
    //   this.printNet();
    }

    printNet(){
        console.log("Net has " + this.layers.length + " layers")
        this.layers.forEach(function(layer) {
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

