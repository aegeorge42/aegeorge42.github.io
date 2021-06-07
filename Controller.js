//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {actFns, Neuron, Layer, Net} from "../Model/net.js"

const mode = 0;
const textureButton = PIXI.Texture.from('images/button.png');
/*const textureButtonOver = PIXI.Texture.from('images/button_over.png');
const textureButtonDown = PIXI.Texture.from('images/button_down.png');
*/
const textureCat = PIXI.Texture.from('images/cat.png');

const tintNone = 0xFFFFFF;
const tintOver = 0xFFA500;
const tintDown = 0x00FF00;


const net = new Net();
const staticInput = [1.0, 5.0];
net.getLayer(0).setLayerIns(staticInput);

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

buttonAddLayer.on('mouseover', function(e){
    buttonAddLayer.tint=tintOver;
  //  buttonAddLayer.texture=textureButtonOver;
})

buttonAddLayer.on('mouseout', function(e){
    buttonAddLayer.tint=tintNone;
  //  buttonAddLayer.texture=textureButton;
})

buttonAddLayer.on('mousedown', function(e){
    buttonAddLayer.tint=tintDown;
  //  buttonAddLayer.texture=textureButtonDown;

    //only handle 4 layers rn
    if(net.layers.length<5){
        net.addLayer();
        net.update();

        var n = new PIXI.Sprite(textureCat);
            n.y= 100
            n.x= net.layers.length * 100;
        app.stage.addChild(n);
    }

})

buttonAddLayer.on('mouseup', function(e){
    buttonAddLayer.tint=tintOver;
  //  buttonAddLayer.texture=textureButtonOver;
})

app.stage.addChild(buttonAddLayer);

const buttonAddNeuron = new Button(textureButton,100,200);
buttonAddNeuron.on('mouseover', function(e){
  //  buttonAddNeuron.texture=textureButtonOver;
    buttonAddNeuron.tint=tintOver;
})

buttonAddNeuron.on('mouseout', function(e){
  //  buttonAddNeuron.texture=textureButton;
    buttonAddNeuron.tint=tintNone;

})

buttonAddNeuron.on('mousedown', function(e){
  //  buttonAddNeuron.texture=textureButtonDown;
    buttonAddNeuron.tint=tintDown;

    net.getLayer(1).addNeuron();
    net.update();
   // net.printNet();
})

buttonAddNeuron.on('mouseup', function(e){
  //  buttonAddNeuron.texture=textureButtonOver;
    buttonAddNeuron.tint=tintOver;

})

net.printNet();
app.stage.addChild(buttonAddNeuron);

/* -------------------- NET STUFF ----------------- */

//net.getLayer(0).setLayerIns(staticInput);
//net.update();
//net.printNet();
//net.addLayer();