import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"
import { Neuron } from "../../Model/neuron.js";
import { Data } from "../../Model/Data.js"

export const Slide1 = new Slide();

var slidename = new PIXI.Text("SLIDE 1");
slidename.x=100;
slidename.y=100;
Slide1.slideContainer.addChild(slidename);


var card= new PIXI.Sprite(PIXI.Texture.from('images/card.png'));
card.anchor.set(0.5);
card.x=500;
card.y=350;
Slide1.slideContainer.addChild(card);


var blue1 = new PIXI.Sprite(PIXI.Texture.from('images/blue1.png'));
blue1.anchor.set(0.5);
blue1.scale.set(0.5);
blue1.x=500;
blue1.y=350;
Slide1.slideContainer.addChild(blue1);

var label = new PIXI.Text("blueberry");
label.x=400;
label.y=150;
Slide1.slideContainer.addChild(label);

var label1 = new PIXI.Text("size    0.1");
label1.x=400;
label1.y=470;
Slide1.slideContainer.addChild(label1)

var label2 = new PIXI.Text("roundness   0.9");
label2.x=400;
label2.y=520;
Slide1.slideContainer.addChild(label2)