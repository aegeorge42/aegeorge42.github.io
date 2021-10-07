import {Layer} from "../Model/layer.js"
import {actFns} from "../Model/actfns.js"

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

export class Net{

    constructor(){
        this.maxLayers=4;
        this.maxNeurons=3;

        this.data=[];
        this.dataIdx=0;

        this.setNetInput(defaultInput);
        this.setLearnRate(0.1);
        this.netActFn=actFns.SIGMOID;

        this.layers=[];
        this.cost=[];
        this.addLayer();
        this.calcCost();
        this.update();
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

    getLayer(layerNum){
        var gotLayer = this.layers[layerNum];
        return gotLayer;
    }


    //if the first layer weights are all negative, just make one positive
    //otherwise it struggles
    checkInit(){

        var hasPos=0;
        for(var i=0; i<this.getLayer(0).neurons.length; i++){
            for(var j=0; j<this.getLayer(0).getNeuron(i).weights.length; j++){
                    if(this.getLayer(0).getNeuron(i).weights[j] >0){
                        hasPos=1;
                    } 
            }
        }

        if(hasPos==0){
            this.getLayer(0).getNeuron(0).setWeight(0,0.5);
        }
    }

    //needed for single neuron net
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

    // FORWARD PROPOGATION
    // the output from each layer becomes the input of the next
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
        // NOTE: last layer only uses sigmoid!
        this.lastLayer.neurons.forEach(function(neuron){
            neuron.actFun = actFns.SIGMOID;
            neuron.calcOut();
        });

        this.netOut=this.lastLayer.getLayerOuts();
        this.calcCost();
    }

    // stochastic gradient descent - update net after each data point 
    learn(){
        this.dataIdx=(this.dataIdx+1)%this.data.points.length;
        this.setNetInput(this.data.points[this.dataIdx]);
        this.update();

        this.backprop();
        this.update_backprop();
    }

    // "vanilla" gradient descent - update net after AVERAGING data points
    learn_batch(){
        this.backprop_batch();
        this.update_backprop();
    }

    calcCost(){ 
        this.costTot=0;
        if (this.target !== undefined){
            for( var i = 0; i<this.target.length; i++){
                if(this.netOut[i] !== undefined){
                    this.cost[i]= 0.5* ( Math.abs(this.target[i]-this.netOut[i]) ** 2);
                    this.costTot=this.costTot+this.cost[i];
                }
            }
        } 
        return this.costTot;
    }

    // where the action happens
    // note that this is for a single example
    // backprop_batch handles averaging across all data points
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

                /**** UPDATE BIAS *****/
                // dc_db = dc_da * da_dz * dz_db
                // but dz_db always = 1
                // so 
                // dc_db = dc_da * da_dz
                currentNeuron.dc_db=currentNeuron.dc_da * currentNeuron.da_dz;
                currentNeuron.bgrad = this.learnRate*(currentNeuron.dc_db);
            }
        }
    }


    backprop_batch(){
        var costs=new Array(this.data.points.length);
        var batchCost=0;
        for(var h=0; h<this.data.points.length; h++){
            this.setNetInput(this.data.points[h]);
            this.update();
             
            this.backprop();
            costs[h]=this.calcCost();
            batchCost=batchCost+costs[h];
            
            for(var i=this.layers.length-1; i>-1; i--){
                var currentLayer=this.getLayer(i);

                for(var j=0; j<currentLayer.neurons.length; j++){
                    var currentNeuron = currentLayer.getNeuron(j);

                  currentNeuron.wgrad_batch[h]=[...this.getLayer(i).getNeuron(j).wgrad];
                  currentNeuron.bgrad_batch[h]=this.getLayer(i).getNeuron(j).bgrad;
                } 
            }
        }

        //average cost 
        this.costTot=batchCost/this.data.points.length;
        this.costTot_batch=batchCost/this.data.points.length;

        //sum of gradients
        for(var i=this.layers.length-1; i>-1; i--){
            var currentLayer=this.getLayer(i);

            for(var j=0; j<currentLayer.neurons.length; j++){
                var currentNeuron = currentLayer.getNeuron(j);

                currentNeuron.wgrad_batch_tot=new Array(currentNeuron.wgrad_batch[0].length).fill(0);
                currentNeuron.wgrad.fill(0);

                for(var f = 0; f<currentNeuron.wgrad_batch.length; f++){
                    for(var k = 0; k<currentNeuron.wgrad_batch[k].length; k++){
                 
                        currentNeuron.wgrad[k]= (currentNeuron.wgrad[k]+currentNeuron.wgrad_batch[f][k]);
                    }       
                                 
                }
            

                //average the sum
                for(var m = 0; m<currentNeuron.wgrad.length; m++){
                    currentNeuron.wgrad[m]=(currentNeuron.wgrad[m]/currentNeuron.wgrad_batch.length)
                }

                var bgrad_tot=0;
                for(var p =0; p<currentNeuron.bgrad_batch.length;p++){
                    bgrad_tot=(bgrad_tot+currentNeuron.bgrad_batch[p]);
                }

                currentNeuron.bgrad=bgrad_tot/currentNeuron.bgrad_batch.length;
            }
        }
    }

    //reset all weights and biases after calculating gradient
    update_backprop(){
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
        }
        this.update();
    }
    
    

}
