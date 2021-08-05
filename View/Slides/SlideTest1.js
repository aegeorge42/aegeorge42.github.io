import {SlideTest} from "../SlideTest.js"
import {small, medium, typewriter} from "../textstyles.js"

export const SlideTest1 = new SlideTest();

var text=new Array(2);
var text0= new PIXI.Text("this was the tool that I needed" +'\n'+" when I was learning about neural networks", typewriter);
    text0.x=200;
    text0.y=200;
var text1= new PIXI.Text("click here to see the next text", typewriter);
text1.x=300;
text1.y=400;
text[0]=text0;
text[1]=text1;

SlideTest1.drawText(text);
SlideTest1.drawTextButtons();
