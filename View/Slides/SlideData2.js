import {Slide} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {small, medium, typewriter} from "../textstyles.js"


export const SlideData2 = new Slide();
SlideData2.drawTextButtons();

var net2 = new Net();
net2.removeLayer();
SlideData2.slideNet=net2;

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

SlideData2.slideNet.setNetData(train_data2);
SlideData2.slideNet.setOutLayer();
SlideData2.slideNet.update();
SlideData2.draw_init(SlideData2.slideNet);

// only show neuron
/*SlideTest3.setVis(SlideTest3.weightsContainer,false);
SlideTest3.setVis(SlideTest3.inputContainer,false);
SlideTest3.setVis(SlideTest3.labelsContainer,false);
*/