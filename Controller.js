//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, defaultInput, Neuron, Layer, Net} from "./Model/net.js"

const view = new View();
const net = new Net();

const maxLayers = 3;
const maxNeurons = 4;

//const userInputs= [1,1,0,1]; //pig
const userInputs = {
  inputs: [1,1,0,1],
  expected: 1,
  expected_text: "Pig"
};
//const userInputs= [1,1,1,0]; //not pig
//const userInputs= [1,1,0,1]; //pig
//const userInputs= [1,1,1,1]; //pig


const userActFun="";

view.setup_buttons();
view.draw(net);

var finalAdded=0;


view.buttonContainer.getChildByName("b_addlayer").on('click', function(e){
  if(net.layers.length<maxLayers && finalAdded==0){
    net.addLayer();
    net.update();
    view.draw(net);
  
    //make next layer "add neuron" button visible
    //TODO: makeInvis() in View
    if(view.buttonContainer.getChildByName("b_addn1").visible == false){

      view.buttonContainer.getChildByName("b_addn1").visible = true;
      view.buttonContainer.getChildByName("b_remn1").visible = true;

    } else if (view.buttonContainer.getChildByName("b_addn1").visible == true
        && view.buttonContainer.getChildByName("b_addn2").visible == false){

        view.buttonContainer.getChildByName("b_addn2").visible = true;
        view.buttonContainer.getChildByName("b_remn2").visible = true;

    }
  }
})

view.buttonContainer.getChildByName("b_remlayer").on('click', function(e){
  if(net.layers.length>1 && finalAdded==0){
    net.removeLayer();
    net.update();
    view.draw(net);
  }
});

view.buttonContainer.getChildByName("b_addn0").on('click', function(e){ 
  if(net.getLayer(0).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(0).addNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_remn0").on('click', function(e){ 
  if(net.getLayer(0).neurons.length>1 && finalAdded==0){
    net.getLayer(0).removeNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_addn1").on('click', function(e){ 
  if(net.getLayer(1).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(1).addNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_remn1").on('click', function(e){ 
  if(net.getLayer(1).neurons.length>1 && finalAdded==0){
    net.getLayer(1).removeNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_addn2").on('click', function(e){ 
  if(net.getLayer(2).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(2).addNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_remn2").on('click', function(e){ 
  if(net.getLayer(2).neurons.length>1 && finalAdded==0){
    net.getLayer(2).removeNeuron();
    net.update();
    view.draw(net);
  }
})

view.buttonContainer.getChildByName("b_addf").on('click', function(e){ 
  if(finalAdded==0){
    finalAdded=1;
    net.addLayer();
    net.update();
    view.draw(net);
    console.log("FINAL OUT: " + net.finalOut);
    console.log("ERROR:" + net.error);

  }
})

view.buttonContainer.getChildByName("b_in").on('click', function(e){ 
  net.setNetInput(userInputs.inputs,userInputs.expected);
  view.addInputs(userInputs.inputs, userInputs.expected, userInputs.expected_text);
  net.update();
  view.draw(net);
  console.log("EXPECTED OUT: "+net.expectedOut);
})

view.buttonContainer.getChildByName("b_actfn_linear").on('click', function(e){ 
  net.setNetActFn(actFns.LINEAR);
  net.update();
  view.draw(net);

})

view.buttonContainer.getChildByName("b_actfn_binstep").on('click', function(e){ 
  net.setNetActFn(actFns.BINSTEP);
  net.update();
  view.draw(net);
})

