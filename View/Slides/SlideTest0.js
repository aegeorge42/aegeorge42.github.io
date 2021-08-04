import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"

export const SlideTest0 = new SlideTest();
var net = new Net();
SlideTest0.slideNet=net;


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
   points: [train_input12,train_input13,train_input14,train_input11],
   labels: ["length", "roundness"],
   type: ["strawberry", "blueberry"]
}

SlideTest0.drawButtons(net);
net.setNetData(train_data1);

net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();
SlideTest0.drawNeurons_init(net);

net.printNet();