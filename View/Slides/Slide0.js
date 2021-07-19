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

const testInput21 = {
    input: [1],
    expected: [1,0],
    expected_text: ["1","0"]
};

const testInput22 = {
    input: [0.2],
    expected: [0,1],
    expected_text: ["0","1"]
};

const testInput3 = {
    input: [5],
    expected: [1,0,0],
    expected_text: ["1","0","0"]
};
//const maxLayers = 4;
//const maxNeurons = 10;


var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

var test = 3;


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
    net.setNetInput(testInput21.input,testInput21.expected,testInput21.expected_text);
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

if (test == 3){
    net.setNetInput(testInput21.input,testInput21.expected,testInput21.expected_text);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);

    Slide0.slideNet.getLayer(0).addNeuron();
    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(0).getNeuron(1).setBias(0);

    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(1).setBias(0);


    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(0).getNeuron(1).setWeight(0,-0.2);

    
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,-0.4);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(1,0.8);

    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(0,0.9);
    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(1,-0.3);


    Slide0.updateDraw(Slide0.slideNet);

    net.setNetInput(testInput22.input,testInput22.expected,testInput22.expected_text);

}

if (test == 4){
    net.setNetInput(testInput3.input,testInput3.expected,testInput3.expected_text);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    Slide0.updateDraw(Slide0.slideNet);

}