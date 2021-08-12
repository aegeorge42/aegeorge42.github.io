import {Slide} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {small, medium, typewriter} from "../textstyles.js"
import {fruits, fruits_small} from "../../Model/data.js"
//import {data, fruits} from "../Model/data.js"


export const SlideSandbox = new Slide();

var net = new Net();
SlideSandbox.slideNet=net;

SlideSandbox.drawButtons(net);

net.setNetData(fruits_small);
net.setLearnRate(0.10);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();

//SlideSandbox.drawNeurons_init(net);
//SlideSandbox.drawInputs_init(net);

SlideSandbox.draw_init(net);

var text0=new PIXI.Text("hello",typewriter);
    text0.x=150;
    text0.y=330;
var text1=new PIXI.Text("goodbye",typewriter);
    text1.x=150;
    text1.y=400;
var text2=new PIXI.Text("blah",typewriter);
    text2.x=300;
    text2.y=400;
var text3=new PIXI.Text("aaaaaaaaa",typewriter);
    text3.x=400;
    text3.y=400;

var text=new Array(4);
text[0]=text0;
text[1]=text1;
text[2]=text2;
text[3]=text3;


SlideSandbox.drawText(text);
SlideSandbox.drawTextButtons();

