//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, defaultInput, Neuron, Layer, Net} from "./Model/net.js"
import {TextInput} from "./PIXI.TextInput.js"


const view = new View();
const net = new Net();

const maxLayers = 3;
const maxNeurons = 3;

const userInputs= [3,4,5];
const userActFun="";

view.setup_buttons();
view.draw_layerSetup(net);
view.drawNeurons(net);

view.buttonContainer.getChildByName("b_addn1").visible = false;
view.buttonContainer.getChildByName("b_addn2").visible = false;
var finalAdded=0;

view.buttonContainer.getChildByName("b_addlayer").on('click', function(e){
  if(net.layers.length<maxLayers && finalAdded==0){
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
  

    //make next layer "add neuron" button visible
    if(view.buttonContainer.getChildByName("b_addn1").visible == false){

      view.buttonContainer.getChildByName("b_addn1").visible = true;
    } else if (view.buttonContainer.getChildByName("b_addn1").visible == true
        && view.buttonContainer.getChildByName("b_addn2").visible == false){
        view.buttonContainer.getChildByName("b_addn2").visible = true;
    }

//  net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn0").on('click', function(e){ 
  if(net.getLayer(0).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(0).addNeuron();
    net.update();
    view.drawNeurons(net);
//    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn1").on('click', function(e){ 
  if(net.getLayer(1).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(1).addNeuron();
    net.update();
    view.drawNeurons(net);
//    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn2").on('click', function(e){ 
  if(net.getLayer(2).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(2).addNeuron();
    net.update();
    view.drawNeurons(net);
//    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addf").on('click', function(e){ 
  if(finalAdded==0){
    finalAdded=1;
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
//    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_in").on('click', function(e){ 
  net.setNetInput(userInputs);
  view.addInputs(userInputs);
  view.drawInputs();
  net.update();
  view.drawNeurons(net);

})

view.buttonContainer.getChildByName("b_actfn_linear").on('click', function(e){ 
  console.log("linear")
  net.setNetActFn(actFns.LINEAR);
  net.update();
  view.drawNeurons(net);
})

view.buttonContainer.getChildByName("b_actfn_binstep").on('click', function(e){ 
  console.log("binstep")
  net.setNetActFn(actFns.BINSTEP);
  net.update();
  view.drawNeurons(net);
})

/*
var input = new TextInput({
  input: {
    fontSize: '36px',
    padding: '12px',
    width: '500px',
    color: '#26272E'
  },
  box: {
    default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
    focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
    disabled: {fill: 0xDBDBDB, rounded: 12}
  }
})

input.placeholder = 'Enter your Text...'
input.x = 500
input.y = 300
input.pivot.x = input.width/2
input.pivot.y = input.height/2
view.app.stage.addChild(input)
console.log(input.text);
*/