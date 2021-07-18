import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"

export const Slide0 = new Slide();

var net = new Net();
Slide0.slideNet=net;

const testInput1 = {
    input: [0.5],
    expected: [1],
    expected_text: ["1"]
};

const testInput2 = {
    input: [-1],
    expected: [1,0],
    expected_text: ["1","0"]
};

//const maxLayers = 4;
//const maxNeurons = 10;


var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

var test = 2;


if (test == 1){
    net.setNetInput(testInput1.input,testInput1.expected,testInput1.expected_text);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    
    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
    
    
    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,0.4);
    
    Slide0.updateDraw(Slide0.slideNet);
}

if (test == 2){
    net.setNetInput(testInput2.input,testInput2.expected,testInput2.expected_text);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);

    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(1).setBias(0);


    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,-0.4);
    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(0,0.9);

    Slide0.updateDraw(Slide0.slideNet);
}