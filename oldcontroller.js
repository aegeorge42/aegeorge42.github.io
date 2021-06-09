//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {View} from "./View/View.js"
import {actFns, Neuron, Layer, Net} from "./Model/net.js"

const view = new View();
const net = new Net();

view.drawButtons();
/*

//Button stuff
const textureButton = PIXI.Texture.from('images/button.png');

const test = PIXI.loader.resources["images/button.png"].texture
const textureCat = PIXI.Texture.from('images/cat.png');
const buttonAddLayer = new Button(PIXI.Texture.from('images/button.png'),100,100);
buttonAddLayer.on('click', function(e){

  //only handle 4 layers rn
  if(net.layers.length<5){
    console.clear();
    net.addLayer();
    net.update();

    let n = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture,0,0);
      n.y = 100
      n.x = net.layers.length * 100;
    view.app.stage.addChild(n);
  }
})
view.app.stage.addChild(buttonAddLayer);

let f = new PIXI.Sprite(PIXI.loader.resources["images/treasure.png"].texture,0,0);
      f.y = 50
      f.x = 50;
view.app.stage.addChild(f);
*/




/*
const mode = 0;
const textureButton = PIXI.Texture.from('images/button.png');
const textureCat = PIXI.Texture.from('images/cat.png');

const net = new Net();
//const staticInput = [1.0, 5.0];
//net.getLayer(0).setLayerIns(staticInput);

var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50
});
document.body.appendChild(app.view);

app.loader.add('neuron',"images/cat.png")
    .load(startup);

function startup(){
}

const buttonAddLayer = new Button(textureButton,100,100);
buttonAddLayer.on('click', function(e){

  //only handle 4 layers rn
  if(net.layers.length<5){
    console.clear();
    net.addLayer();
    net.update();

    var n = new PIXI.Sprite(textureCat);
        n.y= 100
        n.x= net.layers.length * 100;
    app.stage.addChild(n);
  }
})
app.stage.addChild(buttonAddLayer);

const buttonAddNeuron = new Button(textureButton,100,200);
buttonAddNeuron.on('click', function(e){
  console.clear();
  net.getLayer(1).addNeuron();
  net.update();
})
//net.printNet();
app.stage.addChild(buttonAddNeuron);
net.printNet();
/* -------------------- NET STUFF ----------------- */

//net.getLayer(0).setLayerIns(staticInput);
//net.update();
//net.printNet();
//net.addLayer();
