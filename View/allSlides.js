import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"



// HOME
export const SlideHome = new Slide();
var opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
    opener.anchor.set(0.5);
    opener.x=(window.innerWidth)/2;
    opener.y=(window.innerHeight)/3;
SlideHome.slideContainer.addChild(opener);        

window.addEventListener('resize', resize);     

function resize(){
    opener.x=(window.innerWidth)/2;
    opener.y=(window.innerHeight)/3;
}


// INSTRUCTIONS
export const SlideInstruct = new Slide();
    var textInstruct = [    ["This is the tool that I needed when I was learning about neural networks", 50, 50],
                    [".", 100, 100],
                    [".", 200,200]       
                ];

    SlideInstruct.drawText(textInstruct);
    SlideInstruct.drawTextButtons();

// INTRO
export const SlideIntro = new Slide();
var textIntro = [    ["nns were invented in blah blah", 50, 50],
                [".", 100, 100],
                [".", 200,200]       ];

SlideIntro.drawText(textIntro);
SlideIntro.drawTextButtons();

//DATA 1: CARD INTRO
export const SlideData1 = new Slide();
SlideData1.drawCard(0,layout.CARDHEIGHT, layout.CARDWIDTH, window.innerWidth*(2/3), layout.INNERHEIGHT, "blueberry", ["length", "roundness"], [0.9,1.0], 'images/blueberry.png');
var textData1 = [["here's how we can" + '\n' +"visualize our data", 150, 150]];

SlideData1.drawText(textData1);
SlideData1.drawTextButtons();

//NEURON INTRO
export const SlideData2 = new Slide();

var net2 = new Net();
net2.removeLayer();
SlideData2.slideNet=net2;

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
SlideData2.drawTextButtons();

/*var g = new Graph(fruits_test);
SlideData2.slideContainer.addChild(g.getGraph());
g.updateGraph(SlideData2.slideNet)
*/

export const SlideData3 = new Slide();

//SANDBOX
export const SlideSandbox = new Slide();
var net = new Net();
SlideSandbox.slideNet=net;

SlideSandbox.drawButtons(net);

net.setNetData(fruits_small);
net.setLearnRate(0.10);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();

SlideSandbox.draw_init(net);
//SlideSandbox.drawText(text);
SlideSandbox.drawTextButtons();

//GRAPH TEST
export const SlideGraphTest = new Slide();

var netGraph=new Net();
    netGraph.setNetData(fruits);
    netGraph.setOutLayer();
    netGraph.getLayer(0).addNeuron();

    netGraph.getLayer(0).getNeuron(0).setWeight(0,1);
    netGraph.getLayer(0).getNeuron(0).setWeight(1,-1);

    netGraph.getLayer(0).getNeuron(1).setWeight(0,-1);
    netGraph.getLayer(0).getNeuron(1).setWeight(1,1);

    netGraph.getLayer(1).getNeuron(0).setWeight(0,1);
    netGraph.getLayer(1).getNeuron(0).setWeight(1,-1);

    netGraph.getLayer(1).getNeuron(1).setWeight(0,-1);
    netGraph.getLayer(1).getNeuron(1).setWeight(1,1);

    netGraph.update();
    SlideGraphTest.draw_init(netGraph);

var g = new Graph(fruits);

SlideGraphTest.drawButtons(netGraph,g);

SlideGraphTest.slideContainer.addChild(g.getGraph());
g.updateGraph(netGraph);
SlideGraphTest.addGraph(netGraph,g);
netGraph.setNetData(fruits);

