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

export const defaultData = {
    inputs: [],
    input_labels: [],
    type: []
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

    netInput; //input to layer 0
    netActFn; //activation function
    target;
    targetText;
    netOut;
    cost;
    costTot;

   learnRate;

    //w_old;

    constructor(){
        this.maxLayers=5;
        this.maxNeurons=3;
        this.data=[];
//        this.setNetActFn(defaultActFn);
        this.dataIdx=0;
        this.setNetInput(defaultInput);
        this.netActFn=actFns.SIGMOID;
        this.layers=[];
        this.cost=[];
        this.delta=[];
        //this.w_old=[];
        this.b_old=[];
        this.addLayer();
        this.calcCost();
        this.update();

        this.setLearnRate(0.1);

        this.batchgrad=[];
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
        this.setNetInput(data.points[0]);
    }

    setNetInput(datapoint){
        this.netInput=datapoint.input;
        this.target=datapoint.expected;
        this.targetText=datapoint.expected_text;
    }

    setNetData_test(data){
        this.data=data;
        this.setNetInput_test(data.points[0]);
    }

    setNetInput_test(datapoint){
        this.netInput=datapoint.input;
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
    }

    //need a way to access layers in order to add a neuron
    //remember layer numbers start at 0
    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }

    update_single(){
        this.lastLayer = this.getLayer(this.layers.length-1);
        this.lastLayer.layerNumber=this.layers.length-1;

        this.getLayer(0).setLayerIns(this.netInput);
        var netfn = this.netActFn;

        this.lastLayer.neurons.forEach(function(neuron){
                        if(neuron.actFun != netfn){
                            neuron.actFun = netfn;
                        }
                        neuron.calcOut();
                    });
            
                    this.netOut=this.lastLayer.getLayerOuts();

    }
    update(){

        this.lastLayer = this.getLayer(this.layers.length-1);
        this.lastLayer.layerNumber=this.layers.length-1;

        this.getLayer(0).setLayerIns(this.netInput);
        var netfn = this.netActFn;

        for(var i=0; i<this.layers.length-1; i++){

            //update act fn for each neuron to user input
            //get output for each neuron in layer i
            this.getLayer(i).neurons.forEach(function(neuron){
                if(neuron.actFun != netfn){
                    neuron.actFun = netfn;
                }

                neuron.calcOut();
            });

            //all outputs from layer i become inputs for layer i+1
            this.getLayer(i+1).setLayerIns(this.getLayer(i).getLayerOuts());
        }

        // get outputs from last layer
        // NOTE: last layer only uses sigmoid
        this.lastLayer.neurons.forEach(function(neuron){
//            if(neuron.actFun != netfn){
                neuron.actFun = actFns.SIGMOID;
//            }
            neuron.calcOut();
        });

        this.netOut=this.lastLayer.getLayerOuts();
        this.calcCost();
    }

    learn(){
        this.dataIdx=(this.dataIdx+1)%this.data.points.length;
        this.setNetInput(this.data.points[this.dataIdx]);
        this.update();

        this.backprop();
        this.update_backprop();
        /*
        this.backprop();
    //    this.calcCost();
        this.update_backprop();

        //iterate thru dataset
        this.dataIdx=(this.dataIdx+1)%this.data.points.length;
       //this.dataIdx=0;  // use for testing one data point
       this.setNetInput(this.data.points[this.dataIdx]);
       this.update();
       */
    }

    learn_batch(){
        this.backprop_batch();
    //    this.calcCost();
        this.update_backprop();
    }

    //each neuron in the final layer will have a cost
    calcCost(){ 
//        console.log("------------CALL----------")
        this.costTot=0;
        if (this.target !== undefined){
            for( var i = 0; i<this.target.length; i++){
                if(this.netOut[i] !== undefined){
                    this.cost[i]= 0.5* ( Math.abs(this.target[i]-this.netOut[i]) ** 2);
                //    this.cost[i]=0.5 * (this.target[i]-this.netOut[i]) ** 2;
                    this.costTot=this.costTot+this.cost[i];
          //          console.log("target: " + this.target[i] + " net out: " + this.netOut[i] + " dcost "+ (this.target[i]-this.netOut[i])+ " cost "+ this.cost[i])
                }
         //       console.log("TOTAL COST: " + this.costTot);
            }
        } 
        return this.costTot;
    }

    // where the action happens
    backprop(){

        /**UPDATE WEIGHTS */
        //dc_dw = dc_da * da_dz * dz_dw

        // for each layer
        for(var i=this.layers.length-1; i>-1; i--){

            var currentLayer=this.getLayer(i);
            var nextLayer=this.getLayer(currentLayer.layerNumber+1);


            //for each neuron
            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);
                //console.log(currentNeuron.output);

                //console.log(this.netActFn);

                // derivative of output (da) with respect to (inputs * weights + bias)
                // z is the value that goes inside the activation function
                // a is the neuron output after the activation funtion

                if(this.netActFn == actFns.LINEAR){
                    currentNeuron.da_dz=1;

                } else if(this.netActFn == actFns.SIGMOID){
                    currentNeuron.da_dz=(currentNeuron.output)*(1-currentNeuron.output);
                } else if(this.netActFn == actFns.RELU) {
                    if(currentNeuron.output<=0){
                        currentNeuron.da_dz=0;
                    } else {
                        currentNeuron.da_dz=1;
                    }
                }

                /*switch(this.netActFn){
                    case(actFns.LINEAR):
                    console.log("hi");

                        currentNeuron.da_dz=1;
                    break;
                    case(actFns.SIGMOID):
                    console.log("hi");

                        currentNeuron.da_dz=(currentNeuron.output)*(1-currentNeuron.output);
                    case(actFns.ReLU):
                    console.log("hi");

                    console.log(currentNeuron.output);

                        if(currentNeuron.output<=0){
                            currentNeuron.da_dz=0;
                        } else {
                            currentNeuron.da_dz=1;
                        }
                    break;
                }*/

                //for each weight
                for(var k=0; k<currentNeuron.weights.length; k++){
                
                    // derivative of cost (dc) with respect to current output
                    // hidden layers influence cost thru multiple channels
                  if(currentLayer.layerNumber==this.layers.length-1){
                    currentNeuron.dc_da=currentNeuron.output-this.target[j];
                    } else {
                        var dc_da_weightlist=new Array(nextLayer.neurons.length);
                        var dc_da_templist=new Array(nextLayer.neurons.length);
                        var dc_da_temp =0;
    
                        for(var m=0; m<nextLayer.neurons.length; m++){
                            dc_da_weightlist[m]= nextLayer.neurons[m].weights[j];
                         
                        /*  console.log("weight2calc: " + currentNeuron.weights[k] + '\n'
                          + "needed: " + dc_da_weightlist[m] +'\n'
                          + "da_dz: "+ nextLayer.neurons[m].da_dz +'\n'
                          + "dc_da: "+ nextLayer.neurons[m].dc_da);
                        */
                          dc_da_templist[m]= dc_da_weightlist[m]
                                            *nextLayer.neurons[m].da_dz
                                            *nextLayer.neurons[m].dc_da;
                                               dc_da_temp=dc_da_temp+dc_da_templist[m];
                        }
                        currentNeuron.dc_da=dc_da_temp;  
                    }

                    if(currentLayer.layerNumber==0){
                        currentNeuron.dz_dw[k]=this.netInput[k];
                    } else {
                        currentNeuron.dz_dw[k]=this.getLayer(currentLayer.layerNumber-1).getNeuron(k).output;
                    }         

                    // derivative of cost (dc) wrt to current weight
                    // finally - how much this individual weight affects the overall cost
                    currentNeuron.dc_dw[k]= currentNeuron.dc_da*currentNeuron.da_dz*currentNeuron.dz_dw[k];
                    
                    // how much to change each weight in order to decrease the cost
                    currentNeuron.wgrad[k] = this.learnRate*(currentNeuron.dc_dw[k]);
                    
                }
             //   console.log(currentNeuron.wgrad);

   //             console.log("layer: "+currentLayer.layerNumber 
     //                               + " neuron: " + currentNeuron.neuronNumber
       //                              + '\n' + "wgrad: "+ currentNeuron.wgrad);
                /**** UPDATE BIAS *****/
                // dc_db = dc_da * da_dz * dz_db
                // but dz_db always = 1
                // so 
                // dc_db = dc_da * da_dz
                currentNeuron.dc_db=currentNeuron.dc_da * currentNeuron.da_dz;
                currentNeuron.bgrad = this.learnRate*(currentNeuron.dc_db);
                //console.log("neuron " +currentLayer.layerNumber+""+ currentNeuron.neuronNumber + " bgrad: " + currentNeuron.bgrad);

            }
        }
    }


    backprop_batch(){
        var costs=new Array(this.data.points.length);
        var batchCost=0;
        for(var h=0; h<this.data.points.length; h++){
            this.setNetInput(this.data.points[h]);
            this.update();
             /* 
             console.log("----INPUT " + (h)
             + " " + this.data.points[h].expected_text
             + " " + this.netInput
             +" ---------" )
             */
            this.backprop();
            costs[h]=this.calcCost();
            batchCost=batchCost+costs[h];
            
            for(var i=this.layers.length-1; i>-1; i--){
                var currentLayer=this.getLayer(i);

                for(var j=0; j<currentLayer.neurons.length; j++){
                    var currentNeuron = currentLayer.getNeuron(j);
                //    console.log(currentNeuron.wgrad)

                  currentNeuron.wgrad_batch[h]=[...this.getLayer(i).getNeuron(j).wgrad];
                  currentNeuron.bgrad_batch[h]=this.getLayer(i).getNeuron(j).bgrad;
                  console.log("neuron " +currentLayer.layerNumber+""+ currentNeuron.neuronNumber + " bgrad: " + currentNeuron.bgrad_batch);
                //  console.log("neuron " +currentLayer.layerNumber+""+ currentNeuron.neuronNumber + " wgrad: " + currentNeuron.wgrad_batch);

                } 
            }
        }

        this.costTot=batchCost/this.data.points.length;

        //sum of gradients
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);

                currentNeuron.wgrad_batch_tot=new Array(currentNeuron.wgrad_batch[0].length).fill(0);
                currentNeuron.wgrad.fill(0);
//                console.log("---------TOTAL---------")

                for(var f = 0; f<currentNeuron.wgrad_batch.length; f++){
                    for(var k = 0; k<currentNeuron.wgrad_batch[k].length; k++){
                 
                        currentNeuron.wgrad[k]= (currentNeuron.wgrad[k]+currentNeuron.wgrad_batch[f][k]);
                    }       
                                 
                }
            
               // console.log(currentNeuron.wgrad);

                //average the sum
                for(var m = 0; m<currentNeuron.wgrad.length; m++){
                    currentNeuron.wgrad[m]=(currentNeuron.wgrad[m]/currentNeuron.wgrad_batch.length)
                }

                var bgrad_tot=0;
                for(var p =0; p<currentNeuron.bgrad_batch.length;p++){
                    bgrad_tot=bgrad_tot+currentNeuron.bgrad_batch[p];

                }
                console.log("neuron " +currentLayer.layerNumber+""+ currentNeuron.neuronNumber + " bgrad_tot: " + bgrad_tot);
                currentNeuron.bgrad=bgrad_tot;



/*
                var bgrad_tot=0;
                for(var p =0; p<currentNeuron.bgrad_batch.length;p++){
                    console.log(currentNeuron.bgrad)
                    bgrad_tot=bgrad_tot+currentNeuron.bgrad[p]
                }
               console.log(bgrad_tot)
                //currentNeuron.bgrad=(bgrad_tot/currentNeuron.bgrad_batch.length);
                //var bgrad_tot=0;
                //bgrad_tot=bgrad_tot+currentNeuron.bgrad

              //  currentNeuron.bgrad=
                /*
                console.log("layer: "+currentLayer.layerNumber 
                                + " neuron: " + currentNeuron.neuronNumber
                                + '\n' + "TOTAL wgrad: "+ currentNeuron.wgrad);
                */
            }
        }
    }

    //reset all weights and biases after calculating gradient
    update_backprop(){
//        console.log("...............................")
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);

                for(var k=0; k<currentNeuron.weights.length; k++){
                    var currentWeight= currentNeuron.getWeight(k);
                    
                    currentNeuron.w_new[k]= currentWeight-currentNeuron.wgrad[k];
                    currentNeuron.setWeight(k,currentNeuron.w_new[k]);
                }

                currentNeuron.bias_new=currentNeuron.bias-currentNeuron.bgrad;
                currentNeuron.setBias(currentNeuron.bias_new);
            }
        //    console.log("layer:" +currentLayer.layerNumber + '\n'
        //                + "  neuron: " + currentNeuron.neuronNumber + '\n'
        //                + "    da_dz: " + currentNeuron.da_dz + '\n' +'\n'
        //                + "    dc_dw: " + currentNeuron.dc_dw
        //    );
        }
        this.update();
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
        //for (var i =0;i<this.layers.length;i++){
       //     var currentLayer=this.getLayer(i);
       // }

        

    }
}