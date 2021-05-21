const actFns = {
	LINEAR: "linear",
	BINSTEP: "binstep",
}

class Neuron {
  inputs; //array
  weights; //array
  bias;
  outputs; //array
  actFn;

  constructor(inputs,weights,bias) {
	  this.inputs = inputs;
	  this.weights = weights;
	  this.bias = bias;
    this.setActFn();
	}

  setActFn(){
  //TODO: make buttons that will be used to
  //set actfns
  //for now, just hard code
  //actfn should be set at level of net (bc affects entire net)
  //and then assigned to neurons

    if(!this.actFn){
      this.actFn=actFns.LINEAR;
    }
  }

  calcOut(){
   var outArray = []; //get outputs from each input * weight
   var outVal = 0; //single output (b4 activation function)
   var out = 0; //final output after activation fn
		var i;
    for(i=0; i<this.inputs.length; i++){
      outArray[i]=(this.inputs[i] * this.weights[i]) + this.bias;
      outVal=outVal+outArray[i];
      
    }

    console.log("inputs: " + this.inputs.toString());
    console.log("weights: " + this.weights.toString());
    console.log("outputs: " + outArray.toString());
    console.log("output val: " + outVal);

    switch(this.actFn) {
			case actFns.LINEAR:
        out=outVal;
        break;
			case actFns.BINSTEP:
				if(outVal<0 ) { out=0; }
				else if(outVal >=0 ){ out=1; };
				break;
		}

    console.log("final out: " + out);
  } 
}


const n = new Neuron([1,2,3],[0.1,0.2,0.33],0);
n.calcOut();
