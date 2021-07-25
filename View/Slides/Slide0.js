import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"
import { Neuron } from "../../Model/neuron.js";
import { Data } from "../../Model/Data.js"

export const Slide0 = new Slide();

//var fruits = new Data(["strawberry", "blueberry"],["length", "roundness"]);

var net = new Net();
Slide0.slideNet=net;

const train_input11 = {
    input: [0.99,0.01],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_input12 = {
    input: [0.01,0.99],
    expected: [0,1],
    expected_text: ["blueberry"]
}

const train_input13 = {
    input: [0.9,0.1],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_input14 = {
    input: [0.001,0.999],
    expected: [0,1],
    expected_text: ["blueberry"]
}

const train_data1 = {
   inputs: [train_input11,train_input12,train_input13,train_input14],
   input_labels: ["length", "roundness"],
   type: ["strawberry", "blueberry"]
}

const test_data1 = {

}
//const maxLayers = 4;
//const maxNeurons = 10;

var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

var test = 1;

if (test == 1){
    net.setNetData(train_data1);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    net.setLearnRate(0.05);
    net.getLayer(0).addNeuron();
    Slide0.updateDraw(Slide0.slideNet);

    net.setLearnRate(0.1);

    Slide0.updateDraw(Slide0.slideNet);

}


if (test == 2){
    net.setNetData(train_data1);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    net.setLearnRate(0.05);
    net.getLayer(0).addNeuron();
    net.getLayer(0).addNeuron();
    net.getLayer(0).addNeuron();

    net.addLayer();
    net.getLayer(1).addNeuron();
    net.getLayer(1).addNeuron();
    net.getLayer(1).addNeuron();

    Slide0.updateDraw(Slide0.slideNet);

    net.setLearnRate(0.5);

    Slide0.updateDraw(Slide0.slideNet);

}