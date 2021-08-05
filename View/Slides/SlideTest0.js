import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {ViewSlideTest} from "../ViewSlideTest.js"

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
net.setLearnRate(0.10);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();

net.printNet();

//SlideTest0.drawNeurons_init(net);
//SlideTest0.drawInputs_init(net);

SlideTest0.draw_init(net);

var text0=new PIXI.Text("hello");
    text0.x=150;
    text0.y=330;
var text1=new PIXI.Text("goodbye");
    text1.x=150;
    text1.y=400;
var text2=new PIXI.Text("blah");
    text2.x=300;
    text2.y=400;
var text3=new PIXI.Text("aaaaaaaaa");
    text3.x=400;
    text3.y=400;

var text=new Array(4);
text[0]=text0;
text[1]=text1;
text[2]=text2;
text[3]=text3;


SlideTest0.drawText(text);
