import {Slide, layout} from "../Slide.js"
import { ViewSlideTest } from "../ViewSlideTest.js"
import {viewst } from "../../Controller.js"

import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"
import { Neuron } from "../../Model/neuron.js";
import { Data } from "../../Model/Data.js"

export const Slide0 = new Slide();

var header = new PIXI.Sprite(PIXI.Texture.from('images/overneuron.png'));
    header.anchor.set(0.5);
    header.x=(window.innerWidth)/2;
    header.y=(window.innerHeight)/3;
Slide0.slideContainer.addChild(header);        

window.addEventListener('resize', resize);     

function resize(){
    console.log("resize slide1");
//    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    header.x=(window.innerWidth)/2;
    header.y=(window.innerHeight)/3;
}
//start button lives in viewslidetest for now
//if (viewst !== undefined){
//    console.log("nice")
//}