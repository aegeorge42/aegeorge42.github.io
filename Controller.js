//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {ViewSlideTest} from "./View/ViewSlideTest.js"
import {Slide} from "./View/Slide.js"

import {Slide0} from "./View/Slides/Slide0.js"

//import {Neuron, actFns} from "./Model/neuron.js"
//import {Layer} from "./Model/layer.js"

import {Net} from "./Model/net.js"
import {actFns} from "./Model/actfns.js"

const slidetest=1;

if(slidetest==1){
    const viewst = new ViewSlideTest();
}







if (slidetest==0){
const view = new View();
const net = new Net();

const maxLayers = 3;
const maxNeurons = 4;

const userInput = {
  input: [2, 3],
  expected: [1],
  expected_text: ""
};
net.setNetInput(userInput.input,userInput.expected);
view.addInputs(userInput.input, userInput.expected, userInput.expected_text);


//from ppt
/*const userInputs = {
  inputs: [1,1,0,1],
  expected: 1,
  expected_text: "Pig"
};
//const userInputs= [1,1,1,0]; //not pig
//const userInputs= [1,1,0,1]; //pig
//const userInputs= [1,1,1,1]; //pig
*/

/******** FOR TESTING *******/
/*
net.getLayer(0).getNeuron(0).setWeight(0,0.15);
net.getLayer(0).getNeuron(0).setWeight(1,0.20);
net.getLayer(0).getNeuron(1).setWeight(0,0.25);
net.getLayer(0).getNeuron(1).setWeight(1,0.30);

net.addLayer();
net.getLayer(1).addNeuron();
net.update();

net.getLayer(1).getNeuron(0).setWeight(0,0.40);
net.getLayer(1).getNeuron(0).setWeight(1,0.45);
net.getLayer(1).getNeuron(1).setWeight(0,0.50);
net.getLayer(1).getNeuron(1).setWeight(1,0.55);

net.setNetInput(userInput.input,userInput.expected);
  view.addInputs(userInput.input, userInput.expected, userInput.expected_text);
  net.update();
  view.draw(net);

console.log("EXPECTED OUT: "+net.target);

net.getLayer(0).setLayerBias(0.35)
net.getLayer(1).setLayerBias(0.6)

net.update();
view.draw(net);
/***************************/

/* DIFFERENT TESTING */
net.setNetActFn(actFns.LINEAR);
net.update();
net.getLayer(0).addNeuron();
net.update();
net.getLayer(0).getNeuron(0).setWeight(0,0.11);
net.getLayer(0).getNeuron(0).setWeight(1,0.21);

net.addLayer();
net.update();

net.getLayer(0).getNeuron(1).setWeight(0,0.12);
net.getLayer(0).getNeuron(1).setWeight(1,0.08);
net.update();
net.getLayer(1).getNeuron(0).setWeight(0,0.14);
net.getLayer(1).getNeuron(0).setWeight(1,0.15);
net.update();
//net.backProp_long();
net.backProp();

/*******/

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

  }
  console.log("FINAL OUT: " + net.netOut);
  console.log("ERROR:" + net.error);
  console.log("TOTAL ERROR:" + net.error_tot);

})

view.buttonContainer.getChildByName("b_in").on('click', function(e){ 
  net.setNetInput(userInput.input,userInput.expected);
  view.addInputs(userInput.input, userInput.expected, userInput.expected_text);
  net.update();
  view.draw(net);
  console.log("EXPECTED OUT: "+net.target);
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


var button_backprop = new Button("b_bp",PIXI.Texture.from('images/buttons/treasure.png'),100,450);
view.buttonContainer.addChild(button_backprop);

view.buttonContainer.getChildByName("b_bp").on('click', function(e){ 
//  net.backProp();
net.calcError();
})

var button_print = new Button("bp",PIXI.Texture.from('images/buttons/cat.png'),100,380);
view.buttonContainer.addChild(button_print);

view.buttonContainer.getChildByName("bp").on('click', function(e){ 
  net.printNet();
})
}