//import {Button, textureButton, onButtonDown, getDown} from "./View/Button.js"
import {Button} from "./View/Button.js"
import {actFns, Neuron, Layer, Net} from "../Model/net.js"

const mode = 0;
const textureButton = PIXI.Texture.from('images/button.png');
const textureButtonOver = PIXI.Texture.from('images/button_over.png');
const textureButtonDown = PIXI.Texture.from('images/button_down.png');

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

const button1 = new Button(textureButton,100,100);

button1.on('mouseover', function(e){
    button1.texture=textureButtonOver;
    console.log("over");
})

button1.on('mouseout', function(e){
    button1.texture=textureButton;
    console.log("out");
})

button1.on('mousedown', function(e){
    button1.texture=textureButtonDown;
    console.log("down");
})

button1.on('mouseup', function(e){
    button1.texture=textureButton;
    console.log("up");
})



//button1.texture=textureCat;

app.stage.addChild(button1)


/*
const button1 = new Button(textureButton,{
    texture: textureButton,
    width: 200,
    height: 80,
    onTap: () => console.log('Play')
})
app.stage.addChild(button1)

*/