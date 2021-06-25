import {Button} from "./Button.js"

export class Slide{
    slideContainer; // holds it ALL
    inputContainer; // inputs to draw
    buttonContainer; // all buttons to draw
    netContainer; // net to draw

    constructor(){
        this.buttonContainer = new PIXI.Container();
        this.inputContainer = new PIXI.Container();
        this.netContainer = new PIXI.Container();

        this.slideContainer=new PIXI.Container();
        this.slideContainer.addChild(this.buttonContainer,this.inputContainer,this.netContainer);
    }

    addButton(name, textureimg, x, y){
        var newb = new Button(name,PIXI.Texture.from(textureimg),x,y)
        this.buttonContainer.addChild(newb);
    }

    clearButtons(){}
    clearInputs(){}
    clearNet(){}
    
    clear(){}
}