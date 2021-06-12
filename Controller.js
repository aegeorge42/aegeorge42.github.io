//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, defaultInput, Neuron, Layer, Net} from "./Model/net.js"

const view = new View();
const net = new Net();

const maxLayers = 2;
const maxNeurons = 3;

const userInputs= [3,4];

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
      console.log("bn1 invisible :0")
      view.buttonContainer.getChildByName("b_addn1").visible = true;
    } else if (view.buttonContainer.getChildByName("b_addn1").visible == true
        && view.buttonContainer.getChildByName("b_addn2").visible == false){
        view.buttonContainer.getChildByName("b_addn2").visible = true;
    }

  net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn0").on('click', function(e){ 
  if(net.getLayer(0).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(0).addNeuron();
    net.update();
    view.drawNeurons(net);
    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn1").on('click', function(e){ 
  if(net.getLayer(1).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(1).addNeuron();
    net.update();
    view.drawNeurons(net);
    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addn2").on('click', function(e){ 
  if(net.getLayer(2).neurons.length<maxNeurons && finalAdded==0){
    net.getLayer(2).addNeuron();
    net.update();
    view.drawNeurons(net);
    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_addf").on('click', function(e){ 
  if(finalAdded==0){
    finalAdded=1;
    net.addLayer();
    net.update();
    view.draw_layerSetup(net);
    view.drawNeurons(net);
    net.printNet();
  }
})

view.buttonContainer.getChildByName("b_in").on('click', function(e){ 
  net.setNetInput(userInputs);
  view.addInputs(userInputs);
  view.drawInputs();
  console.log("fart")
  net.update();
  view.drawNeurons(net);

})