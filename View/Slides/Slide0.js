import {Slide} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"

export const Slide0 = new Slide();
Slide0.addButton("btest",PIXI.Texture.from('images/button_down.png'),100,200);

const net = new Net();


const testInput = {
    input: [5, 10],
    expected: [1],
    expected_text: ""
};

net.setNetInput(testInput.input,testInput.expected);
net.setNetActFn(actFns.LINEAR);

net.getLayer(0).addNeuron();

net.update();
net.addLayer();
net.update();

//Slide0.drawNet(net);
Slide0.draw(net);

Slide0.buttonContainer.getChildByName("btest").on('click', function(e){
   net.getLayer(0).addNeuron();
   net.update();
   Slide0.draw(net);
});