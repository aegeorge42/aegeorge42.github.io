//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, Neuron, Layer, Net} from "./Model/net.js"

const view = new View();
const net = new Net();

view.addButtons();
view.drawButtons();

view.draw_layerSetup(net);
view.drawNeurons(net);


//TODO (see view)
//view.drawNeurons(neurons);

//addLayer
view.buttonDrawList[0].on('click', function(e){ 
  if(net.layers.length<5){
    console.clear();
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);

  }
  //console.log("add Layer");
})

//addNeuron
view.buttonDrawList[1].on('click', function(e){ 
  console.clear();
  net.getLayer(1).addNeuron();
  net.update();
  view.draw_layerSetup(net);
  view.drawNeurons(net);
})

view.buttonDrawList[2].on('click', function(e){ 
  view.draw_layerSetup(net);

  //view.drawLayer(net.getLayer(1));
  //console.log("neurons in layer 1: "+ net.getLayer(1).getNeurons().length);
})
