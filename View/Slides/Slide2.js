import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"


export const Slide2 = new Slide();

const train_input13 = {
    input: [0.9,0.1],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_data = {
    points: [train_input13],
    labels: ["length", "roundness"],
    type: ["strawberry", "blueberry"]
 }
var net2 = new Net();
Slide2.slideNet=net2;

net2.setNetData(train_data);
net2.setNetActFn(actFns.SIGMOID);
net2.setOutLayer();
Slide2.drawButtons(net2);
//Slide2.clearButtons();
//net.setLearnRate(0.05);
//SlideX.updateDraw(SlideX.slideNet);

//net.setLearnRate(0.3);

Slide2.updateDraw(Slide2.slideNet);
Slide2.clearButtons();
Slide2.setVisAll(Slide2.weightsContainer,false);
Slide2.setVisAll(Slide2.buttonContainer,false);