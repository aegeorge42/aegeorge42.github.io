import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"

export const Slide0 = new Slide();

var net = new Net();
Slide0.slideNet=net;

const input1 = {
    input: [5],
    expected: [1],
    expected_text: ["1"]
};

const input2 = {
    input: [5],
    expected: [1,0],
    expected_text: ["1","0"]
};

    const input31 = {
        input: [0.9],
        expected: [1,0],
        expected_text: ["1","0"]
    };

    const input32 = {
        input: [0.2],
        expected: [0,1],
        expected_text: ["0","1"]
    };

    const input33 = {
        input: [0.1],
        expected: [0,1],
        expected_text: ["0","1"]
    };

    const input34 = {
        input: [0.8],
        expected: [1,0],
        expected_text: ["1","0"]
    };

const input4 = {
    input: [0.9],
    expected: [1,0],
    expected_text: ["1","0"]
};

const input5 = {
    input: [0.9],
    expected: [1,0],
    expected_text: ["1","0"]
};

const input6 = {
    input: [0.9],
    expected: [1],
    expected_text: ["1"]
}

const data3 = [input31,input32,input33,input34];
const data4 = [input4, input31,input32,input33,input34];
const data5 = [input5];
const data6 = [input6];

//const maxLayers = 4;
//const maxNeurons = 10;

var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

var test = 7;

if (test == 1){
    net.setNetInput(input1);
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
    net.setNetInput(input2);
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

}

if (test == 3){
    net.setNetData(data3);
    net.setNetInput(data3[0]);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    
//    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    
    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,-0.4);
    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(0,0.9);

    
    Slide0.updateDraw(Slide0.slideNet);
}

if (test == 4){
    net.setNetData(data4);
    net.setNetInput(data4[0]);
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

if (test == 5){
    net.setNetData(data5);
    net.setNetInput(data5[0]);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();

    Slide0.slideNet.getLayer(0).addNeuron();
    Slide0.drawButtons(net);
    
    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(0).getNeuron(1).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(1).setBias(0);

    //layer 0
    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(0).getNeuron(1).setWeight(0,-0.2);

    //layer 1
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,-0.4);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(1,0.6);
    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(0,0.9);
    Slide0.slideNet.getLayer(1).getNeuron(1).setWeight(1,-0.3);


    
    Slide0.updateDraw(Slide0.slideNet);
}

if (test == 6){
    net.setNetData(data6);
    net.setNetInput(data6[0]);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    Slide0.updateDraw(Slide0.slideNet);

    Slide0.slideNet.addLayer();
    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(2).getNeuron(0).setBias(0);


    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,-0.2);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,0.5);
    Slide0.slideNet.getLayer(2).getNeuron(0).setWeight(0,-0.4);

    
    Slide0.updateDraw(Slide0.slideNet);
    Slide0.slideNet.printNet();
}

if (test == 7){
    net.setNetData(data6);
    net.setNetInput(data6[0]);
    net.setNetActFn(actFns.SIGMOID);
    net.setOutLayer();
    Slide0.drawButtons(net);
    Slide0.updateDraw(Slide0.slideNet);

    Slide0.slideNet.getLayer(0).getNeuron(0).setBias(0);
    Slide0.slideNet.getLayer(1).getNeuron(0).setBias(0);
   


    Slide0.slideNet.getLayer(0).getNeuron(0).setWeight(0,-0.2);
    Slide0.slideNet.getLayer(1).getNeuron(0).setWeight(0,0.5);


    
    Slide0.updateDraw(Slide0.slideNet);
    Slide0.slideNet.printNet();
}