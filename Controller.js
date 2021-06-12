//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, staticInput, Neuron, Layer, Net} from "./Model/net.js"

const view = new View();
const net = new Net();

const maxLayers = 3;
const maxNeurons = 3;

view.addButtons();
view.drawButtons();

view.draw_layerSetup(net);
view.drawNeurons(net);

view.drawInputs(staticInput);

//console.log("LAST LAYER" + net.getLayer(net.layers.length-1).getLayerOuts());

//net.getLayer().addNeuron();


net.update();
view.drawNeurons(net);

//TODO - give buttons IDs for easier access + knowing what they do
//this works for now tho
//view.buttonDrawList[2].alpha = 0;
//view.buttonDrawList[2].interactive = false;
view.buttonDrawList[2].visible= false;
view.buttonDrawList[3].visible = false;

var finalAdded=0;

//addLayer
view.buttonDrawList[0].on('click', function(e){ 
  if(net.layers.length<maxLayers && finalAdded==0){
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
  

  //make next layer "add neuron" button visible
  if(view.buttonDrawList[2].visible == false){
    view.buttonDrawList[2].visible = true;
  } else if (view.buttonDrawList[2].visible == true && view.buttonDrawList[3].visible == false){
    view.buttonDrawList[3].visible = true;
  }
  }

  net.printNet();
})

//addNeuron
view.buttonDrawList[1].on('click', function(e){ 
  if(net.getLayer(0).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(0).addNeuron();
    net.update();
    view.drawNeurons(net);
    net.printNet();
  }
})

view.buttonDrawList[2].on('click', function(e){ 
  if(net.getLayer(1).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(1).addNeuron();
    net.update();
    view.drawNeurons(net);    
    net.printNet();
  }
})

view.buttonDrawList[3].on('click', function(e){ 
  if(net.getLayer(2).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(2).addNeuron();
    net.update();
    view.drawNeurons(net);
    net.printNet();
  }
})

//ready to train!
//add in one final neuron to get single output - maybe toggle on and off?
//kind of an ugly solution. sleep on it.

//we need this to get single output for our training data answers
view.buttonDrawList[4].on('click', function(e){ 
  if(finalAdded==0){
    finalAdded=1;
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
    net.printNet();
  }
})