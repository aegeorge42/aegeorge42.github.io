import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {small, medium, typewriter, typewriter_large} from "./textstyles.js"


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
    var textInstruct = [    
        ["This is the tool that I needed when I was learning about neural networks", 50, 350],
    ];

    SlideInstruct.drawText(textInstruct);
    SlideInstruct.drawTextButtons();

// INTRO 1
export const SlideIntro1 = new Slide();
var textIntro = [
    ["As humans, we take our ability to recognize objects for granted. ", 50, 100],
    ["Neural networks are a type of machine learning based on the human brain." 
    + '\n'+"Using a neural network, a computer can learn to recognize and classify data." , 100, 200],
    ["This type of neural network is called a perceptron." , 200,250]       
];

SlideIntro1.drawText(textIntro);
SlideIntro1.drawTextButtons();

// INTRO 2
export const SlideIntro2 = new Slide();
var example1 = new PIXI.Sprite(PIXI.Texture.from('images/card.png'));
    example1.isSprite=true;
    example1.scale.set(0.8);
    example1.x=500;
    example1.y=100;

    var e1pic=new PIXI.Sprite(PIXI.Texture.from('images/blueberry.png'));
    e1pic.x=100;
    e1pic.y=100;
    example1.addChild(e1pic);
var example2 = new PIXI.Sprite(PIXI.Texture.from('images/card.png'));
    example2.isSprite=true;
    example2.scale.set(0.8);
    example2.x=800;
    example2.y=100;

    var e2pic=new PIXI.Sprite(PIXI.Texture.from('images/strawberry.png'));
    e2pic.x=100;
    e2pic.y=100;
    example2.addChild(e2pic);

var textIntro = [
    ["So how does it work?", 50, 100],
    ["In order to train our network,"+'\n'+" we need to give it examples." , 50, 170],
    example1,
    example2,
    ["Using our big human brains,"+'\n'+" we label these examples with the right answers" , 50, 250],
    ["blueberry", example1.x, example1.y],
    ["strawberry", example2.x, example2.y],

    ["Next, we label our data with some attributes"+'\n'+" that we think are important for classification.",50,320],
    ["This is what we will use as input for our neural network.",50,360],

    ["length (cm):   3.0", example1.x, example1.y+275],
    ["width (cm):    3.0", example1.x, example1.y+320],
    ["length (cm):   5.0", example2.x, example2.y+275],
    ["width (cm):    2.5", example2.x, example2.y+320]
];

SlideIntro2.drawText(textIntro);
SlideIntro2.drawTextButtons();

// INTRO 3
export const SlideIntro3 = new Slide();
var i3pic=new PIXI.Sprite(PIXI.Texture.from('images/captcha.png'));
i3pic.scale.set(0.4);
i3pic.isSprite=true;

    i3pic.x=200;
    i3pic.y=80;

var textIntro3 = [
    ["If you've ever had to solve a puzzle like this to get into a website...", 10, 50],
    i3pic, //todo: make this at the same time
    ["...you were probably helping label data to train a neural network", 30, 180],
];

SlideIntro3.drawText(textIntro3);
SlideIntro3.drawTextButtons();

//INTRO 4
export const SlideIntro4 = new Slide();
var si4test1=new PIXI.Sprite(PIXI.Texture.from('images/card.png'));
si4test1.scale.set(0.8);
    si4test1.isSprite=true;
    si4test1.x=100;
    si4test1.y=100;


var textIntro4 = [
    ["once our net is finished learning, we'll give it some unlabeled data"+'\n'+
    "to see how well it works.", 50, 50],
    si4test1
];
SlideIntro4.drawText(textIntro4);
SlideIntro4.drawTextButtons();

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

