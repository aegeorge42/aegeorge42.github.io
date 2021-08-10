import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {small, medium, typewriter} from "../textstyles.js"
import {fruits, fruits_small} from "../../Model/data.js"
import { layout } from "../layout.js";
import { Slide } from "../Slide.js";



export const SlideTest2 = new SlideTest();
SlideTest2.drawTextButtons();

var slideheader = new PIXI.Text("DATA");
    slideheader.anchor.set(0.5);
    slideheader.x=100;
    slideheader.y=layout.HEADER_HEIGHT/2;
SlideTest2.labelsContainer.addChild(slideheader)

var text=new Array();

text[0]=new PIXI.Text("Here's how we can visualize our data");
    text[0].x=100;
    text[0].y=200;



SlideTest2.drawText(text);
SlideTest2.drawCard(0,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(2/3), layout.INNERHEIGHT, "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
