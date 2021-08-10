import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {ViewSlideTest} from "../ViewSlideTest.js"
import {small, medium, typewriter} from "../textstyles.js"


export const SlideTest3 = new SlideTest();
SlideTest3.drawTextButtons();

var net2 = new Net();
net2.removeLayer();
SlideTest3.slideNet=net2;

//SlideTest3.drawButtons(net2);

const train_input2 = {
    input: [0.99,0.01],
    expected: [1],
    expected_text: ["strawberry"]
}

const train_data2 = {
    points: [train_input2],
    labels: ["length", "roundness"],
    type: ["strawberry"]
}

SlideTest3.slideNet.setNetData(train_data2);
SlideTest3.slideNet.setOutLayer();
SlideTest3.slideNet.update();
SlideTest3.draw_init(SlideTest3.slideNet);

// only show neuron
/*SlideTest3.setVis(SlideTest3.weightsContainer,false);
SlideTest3.setVis(SlideTest3.inputContainer,false);
SlideTest3.setVis(SlideTest3.labelsContainer,false);
*/