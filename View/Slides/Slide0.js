import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"

export const Slide0 = new Slide();

var net = new Net();
Slide0.slideNet=net;

const testInput = {
    input: [5, 10],
    expected: [1, 0],
    expected_text: ["1","0"]
};

//const maxLayers = 4;
//const maxNeurons = 10;

net.setNetInput(testInput.input,testInput.expected,testInput.expected_text);
net.setNetActFn(actFns.SIGMOID);
net.setOutLayer();
Slide0.drawButtons(net);

var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

Slide0.updateDraw(net);