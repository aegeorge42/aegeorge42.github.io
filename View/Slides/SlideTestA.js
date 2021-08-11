import {SlideTest} from "../SlideTest.js"
import { layout } from "../layout.js";

export const SlideTestA = new SlideTest();

var slideheader = new PIXI.Text("INTRO");
    slideheader.anchor.set(0.5);
    slideheader.x=100;
    slideheader.y=layout.HEADER_HEIGHT/2;
SlideTestA.labelsContainer.addChild(slideheader);


var text=new Array();

text[0]=new PIXI.Text("Blah blah blah blah");
    text[0].x=100;
    text[0].y=200;

text[1]=new PIXI.Text("stuff stuff stuff stuff");
    text[1].x=200;
    text[1].y=300;
    
SlideTestA.drawText(text);
SlideTestA.drawTextButtons();

console.log("SlidetestA " + SlideTestA.textContainer.children.length);