import {SlideTest} from "../SlideTest.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {ViewSlideTest} from "../ViewSlideTest.js"
import {small, medium, typewriter} from "../textstyles.js"
import {fruits, fruits_small} from "../../Model/data.js"
import { layout } from "../layout.js";



export const SlideTest4 = new SlideTest();
SlideTest4.drawTextButtons();

/*var text=new Array();
text[0]=new PIXI.Text("FOUR");
    text[0].x=100;
    text[0].y=200;
*/
//SlideTest4.drawText(text);
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(1/10), (layout.HEADER_HEIGHT + (layout.CARDHEIGHT/4)),
                     "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(1/10) +100, (layout.HEADER_HEIGHT + (layout.CARDHEIGHT/4)),
                     "strawberry", ["length", "roundness"], [0.9,1.0], 'images/strawberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(1/10) +100, (layout.HEADER_HEIGHT + (layout.CARDHEIGHT/4)),
                     "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(4/10), (layout.HEADER_HEIGHT + (layout.CARDHEIGHT/4)),
                     "strawberry", ["length", "roundness"], [0.9,1.0], 'images/strawberry.png');

SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(1/10), (layout.HEADER_HEIGHT + layout.CARDHEIGHT*(3/4)),
                     "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(2/10), (layout.HEADER_HEIGHT + layout.CARDHEIGHT*(3/4)),
                     "strawberry", ["length", "roundness"], [0.9,1.0], 'images/strawberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(3/10), (layout.HEADER_HEIGHT + layout.CARDHEIGHT*(3/4)),
                     "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
SlideTest4.drawCard(1,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(4/10), (layout.HEADER_HEIGHT + layout.CARDHEIGHT*(3/4)),
                     "strawberry", ["length", "roundness"], [0.9,1.0], 'images/strawberry.png');

