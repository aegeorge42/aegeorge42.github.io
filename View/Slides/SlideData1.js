import {Slide} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {small, medium, typewriter} from "../textstyles.js"
import {fruits, fruits_small} from "../../Model/data.js"
import { layout } from "../layout.js";



export const SlideData1 = new Slide();
SlideData1.drawTextButtons();

var slideheader = new PIXI.Text("DATA");
    slideheader.anchor.set(0.5);
    slideheader.x=100;
    slideheader.y=layout.HEADER_HEIGHT/2;
SlideData1.labelsContainer.addChild(slideheader)

var text=new Array();

text[0]=new PIXI.Text("Here's how we can visualize our data");
    text[0].x=100;
    text[0].y=200;



SlideData1.drawText(text);
SlideData1.drawCard(0,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(2/3), layout.INNERHEIGHT, "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
