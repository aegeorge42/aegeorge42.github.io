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
export const defaultActFn = actFns.SIGMOID;


export class Neuron{

    constructor(){
        this.bias = 0//Math.random() * 2 - 1 //bias between -1 and 1
        this.inputs = [];
        this.actFun = [];
        this.weights = [];

        //for backpropgation
        this.dc_dw=[]; //partial derivative of cost wrt weight (layer l)
        this.dz_dw=[]; //partial derivative of stuff inside actfn - aka "z" (weight*a^(l-1) + bias) wrt weight (layer l)
        this.da_dz=[]; //partial derivative of neuron output (layer l) wrt z
        this.dc_da=[]; //partial derivative of cost wrt neuron output (layer l-1)
        this.dc_db=[]; //partial derivative of cost wrt bias

    //    this.w_old= [];
        this.bias_new=0;
        this.w_new= [];

        this.wgrad=[];
        this.bgrad=0;

        this.wgrad_batch=[];
        this.bgrad_batch=[];

        this.totgrad=[];

    }

    setBias(b){
        this.bias = b;
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
            this.weights[i]=
             (Math.random() * (0.5- -0.5)) + -0.5;    
           }
        }

        //if a neuron has some inputs already but needs more
        //because another neuron was added in the prev layer
        if(this.weights.length < v.length){
            for(var i=this.weights.length; i<v.length; i++){
              this.weights[i]= 
              (Math.random() * (0.5- -0.5)) + -0.5;  
            }
        }

        if(this.weights.length > v.length){
            this.weights.splice(v.length, this.weights.length - v.length);
        }

    }

    getWeight(weightNum){
        return this.weights[weightNum];
    }

    setWeight(weightNum, w){
        this.weights[weightNum]=w;
    }


    calcOut(){
        var outlist = [];
        var outsum = 0;
        for(var i = 0; i<this.weights.length; i++){
            outlist[i]= this.inputs[i]*this.weights[i];
            
            outsum=outsum+outlist[i];
        }
        outsum = outsum +this.bias;
        this.output_nofn = outsum;


        switch(this.actFun){
            case(actFns.LINEAR):
                this.output = outsum;
            break;

            case(actFns.SIGMOID):
                this.output=1/(1+(Math.E ** -outsum));
                break;
            case(actFns.RELU):
                if(outsum<=0){
                    this.output=0;
                } else {
                    this.output = outsum;
                }
            break;

        }
    }

    /* 4 testing
    printNeuron(){
        var ins = "";
        var ws = "";
        var os = ""; 
        var o = "";

        for(var i =0; i<this.inputs.length; i++){
            ins += this.inputs[i].toFixed(5) + " ";
            ws += this.weights[i].toFixed(5) + " "; 
        }

        os = this.output_nofn.toFixed(5) + " ";
        o = this.output.toFixed(5) + " ";
        console.log("inputs " + ins + "weights " + ws + "outsum: " + os + "out: " + o);
    }*/
}