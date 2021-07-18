import { Net } from "../../Model/net.js";
//import {layerbuttons,neuronbuttons_add,neuronbuttons_rem,setButtonFunctions} from "../../View/Buttons.js"

import {Slide, layout} from "../Slide.js"

import { Slide0} from "./Slide0.js"

export const Slide1 = new Slide();
export const net1= new Net();
Slide1.slideNet=net1;
Slide1.drawButtons(Slide1.slideNet);

Slide1.updateDraw(net1);


/*Slide1.slideNet=Slide0.slideNet;
Slide1.drawButtons(Slide1.slideNet);

Slide1.updateDraw(Slide1.slideNet);

var slidetext = new PIXI.Text("Slide 1");
slidetext.x=160;
slidetext.y=50;
Slide1.inputContainer.addChild(slidetext);
*/