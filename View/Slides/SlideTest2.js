import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {ViewSlideTest} from "../ViewSlideTest.js"
import {small, medium, typewriter} from "../textstyles.js"


export const SlideTest2 = new SlideTest();
var net2 = new Net();
SlideTest2.slideNet=net2;

const train_input2 = {
    input: [0.99,0.01],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_data2 = {
    points: [train_input2],
    labels: ["length", "roundness"],
    type: ["strawberry", "blueberry"]
}

SlideTest2.slideNet.setNetData(train_data2);
SlideTest2.slideNet.setOutLayer();
SlideTest2.slideNet.update();
SlideTest2.draw_init(SlideTest2.slideNet);