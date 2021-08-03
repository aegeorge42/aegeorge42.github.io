import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"
import { Neuron } from "../../Model/neuron.js";
import { Data } from "../../Model/Data.js"

export const SlideX = new Slide();

//var fruits = new Data(["strawberry", "blueberry"],["length", "roundness"]);

var net = new Net();
SlideX.slideNet=net;

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

const test_data1 = {

}
//const maxLayers = 4;
//const maxNeurons = 10;

var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
SlideX.inputContainer.addChild(slidetext);

var test = 3;

if (test == 1){
    net.setNetData(train_data1);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    SlideX.drawButtons(net);
    net.setLearnRate(0.05);
    net.getLayer(0).addNeuron();
    SlideX.updateDraw(SlideX.slideNet);

    net.setLearnRate(0.3);

    SlideX.updateDraw(SlideX.slideNet);

}


if (test == 2){
    net.setNetData(train_data1);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    SlideX.drawButtons(net);
    net.setLearnRate(0.05);
    net.getLayer(0).addNeuron();
    net.getLayer(0).addNeuron();
    net.getLayer(0).addNeuron();

    net.addLayer();
    net.getLayer(1).addNeuron();
    net.getLayer(1).addNeuron();
    net.getLayer(1).addNeuron();

    SlideX.updateDraw(SlideX.slideNet);

    net.setLearnRate(0.5);

    SlideX.updateDraw(SlideX.slideNet);

}

if (test == 3){
    net.setNetData(train_data1);
    net.setNetActFn(actFns.RELU);
    net.setOutLayer();
    SlideX.drawButtons(net);
    net.getLayer(0).addNeuron();
    net.setLearnRate(0.5);

    net.getLayer(0).getNeuron(0).setBias(0);
    net.getLayer(0).getNeuron(1).setBias(0);
    net.getLayer(1).getNeuron(0).setBias(0);
    net.getLayer(1).getNeuron(1).setBias(0);

   /* net.getLayer(0).getNeuron(0).setWeight(0,0.5);
    net.getLayer(0).getNeuron(0).setWeight(1,-0.2);

    net.getLayer(0).getNeuron(1).setWeight(0,-0.3);
    net.getLayer(0).getNeuron(1).setWeight(1,0.6);

    net.getLayer(1).getNeuron(0).setWeight(0,0.7);
    net.getLayer(1).getNeuron(0).setWeight(1,-0.4);

    net.getLayer(1).getNeuron(1).setWeight(0,-0.8);
    net.getLayer(1).getNeuron(1).setWeight(1,0.9);

*/

    net.getLayer(0).getNeuron(0).setWeight(0,0.5);
    net.getLayer(0).getNeuron(0).setWeight(1,-0.5);

    net.getLayer(0).getNeuron(1).setWeight(0,-0.5);
    net.getLayer(0).getNeuron(1).setWeight(1,0.5);

    net.getLayer(1).getNeuron(0).setWeight(0,0.5);
    net.getLayer(1).getNeuron(0).setWeight(1,-0.5);

    net.getLayer(1).getNeuron(1).setWeight(0,-0.5);
    net.getLayer(1).getNeuron(1).setWeight(1,0.5);


    SlideX.slideNet.update();
    SlideX.drawInit(SlideX.slideNet);
  //  SlideX.updateDraw(SlideX.slideNet);

}