import {Layer} from "../Model/layer.js"
import {actFns} from "../Model/actfns.js"

export const defaultInput = [0,0];
export const defaultActFn = actFns.SIGMOID;

/* for each neuron in each layer
this.layers.forEach(function(layer) {
    layer.neurons.forEach(function(neuron) {
        //do stuff
    });
});
*/

export class Net{
    layers; //list of layers
    lastLayer; //makes my life easier
    netInput; //input to layer 0
    netActFn; //activation function
    target;
    netOut;
    error;
    eTot;
    learnRate;
    delta;
    oldweightf; //TO DELETE

    constructor(){
        this.setNetActFn(defaultActFn);
        this.setNetInput(defaultInput);
        this.layers=[];
        this.error=[];
        this.delta=[];
        this.addLayer();
        this.update();
        this.setLearnRate(0.05);
    }

    setNetInput(data,target){
        this.netInput=data;
        this.target=target;
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

    setAllLayerBias(b){
        this.layers.forEach(function(layer) {
            if(layer.layerBias === undefined){
                layer.setLayerBias(b);
            }
        });
    }

    update(){
        console.log("LR: " + this.learnRate);
        this.getLayer(0).setLayerIns(this.netInput);
        var netfn = this.netActFn;

        for(var i=0; i<this.layers.length-1; i++){
        //    console.log("net actfn: "+ this.netActFn);
        console.log(this.layers[i].layerBias);

            //update act fn for each neuron to user input
            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                if(neuron.actFun != netfn){
                    neuron.actFun = netfn;
                    console.log("IF neuron actfn: " + neuron.actFun);
                }
                console.log("neuron actfn: " + neuron.actFun);
                console.log("net actfn in loop: " + netfn);

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

        this.calcError();

        
    }

    calcError(){
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
        console.log('\n' + "--BACKPROP--");
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

/*   backProp(){
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

