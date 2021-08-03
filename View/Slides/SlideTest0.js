import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"

export const SlideTest0 = new SlideTest();
var net = new Net();
SlideTest0.slideNet=net;


SlideTest0.drawButtons(net);

net.addLayer();
net.getLayer(0).addNeuron();
net.update();

SlideTest0.drawNeurons_init(net);
