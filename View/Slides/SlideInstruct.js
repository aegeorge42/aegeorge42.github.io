import {Slide} from "../Slide.js"
import {small, medium, typewriter} from "../textstyles.js"

export const SlideInstruct = new Slide();
/*
var text=new Array(2);
var text0= new PIXI.Text("this was the tool that I needed" +'\n'+" when I was learning about neural networks"
                            + '\n' + '\n' + "click here to move forwards", typewriter);
    text0.x=200;
    text0.y=200;
var text1= new PIXI.Text("click here to go back", typewriter);
    text1.x=300;
    text1.y=400;
var text2= new PIXI.Text("click here to jump to a differnt section", typewriter);
    text2.x=100;
    text2.y=100;
text[0]=text0;
text[1]=text1;
text[2]=text2;

*/
var text = [    ["text1", 50, 50],
                ["text2", 100, 100],
                ["text3", 200,200]       ];

SlideInstruct.drawText(text);
SlideInstruct.drawTextButtons();
