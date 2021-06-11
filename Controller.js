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

//console.log("FARTTTTT" + staticInput);
view.drawInputs(staticInput);


//TODO - give buttons IDs for easier access + knowing what they do
//this works for now tho
//view.buttonDrawList[2].alpha = 0;
//view.buttonDrawList[2].interactive = false;
view.buttonDrawList[2].visible= false;
view.buttonDrawList[3].visible = false;

//addLayer
view.buttonDrawList[0].on('click', function(e){ 
  if(net.layers.length<maxLayers){
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
  }

  //make next layer "add neuron" button visible
  if(view.buttonDrawList[2].visible == false){
    view.buttonDrawList[2].visible = true;
  } else if (view.buttonDrawList[2].visible == true && view.buttonDrawList[3].visible == false){
    view.buttonDrawList[3].visible = true;
  }

})

//addNeuron
view.buttonDrawList[1].on('click', function(e){ 
  if(net.getLayer(0).neurons.length<maxNeurons){
    net.getLayer(0).addNeuron();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
  }
})

view.buttonDrawList[2].on('click', function(e){ 
  if(net.getLayer(1).neurons.length<maxNeurons){
    net.getLayer(1).addNeuron();
    net.update();
    view.drawNeurons(net);
  }
})

view.buttonDrawList[3].on('click', function(e){ 
  if(net.getLayer(2).neurons.length<maxNeurons){
    net.getLayer(2).addNeuron();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
  }
})
