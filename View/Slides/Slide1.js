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