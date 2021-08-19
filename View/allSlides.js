import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {small, medium, typewriter, typewriter_large} from "./textstyles.js"
//import {MultiStyleText} from "./../pixi/pixi-multistyle-text.js"


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
var textIntro1 = [
    ["As humans, we take our ability to recognize objects for granted. ", 50, 100],
    ["Neural networks are a type of machine learning based on the human brain." 
    + '\n'+"Using a neural network, a computer can learn to recognize and classify data." , 100, 200],
    ["This type of neural network is called a perceptron." , 200,250]       
];

SlideIntro1.drawText(textIntro1);
SlideIntro1.drawTextButtons();

// INTRO 2
export const SlideIntro2 = new Slide();

var examples=new PIXI.Sprite(PIXI.Texture.from('images/examples.png'));
examples.anchor.set(0.5);
examples.isSprite=true;
examples.x=850;
examples.y=325;

var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/examples_labels.png'));
examples_labels.isSprite=true;
examples_labels.anchor.set(0.5);
examples_labels.x=850;
examples_labels.y=325;

var textIntro2 = [
    ["So how does it work?", 50, 100],
    ["In order to train our network,"+'\n'+" we need to give it some examples"+'\n'+"of data we want to classify." , 50, 170],
    examples,
    ["Using our big human brains,"+'\n'+" we label these examples with the right answers" , 50, 250],
    examples_labels
];

var textIntro2_test = [
    [ ["So"], ["how"], ["does it work"], 50, 100],
    [ ["we train with examples"], [100, 150] ],

];

SlideIntro2.drawText_test(textIntro2_test);
SlideIntro2.drawTextButtons();
SlideHome.slideContainer.addChild(opener);        


//Change name eventually
// INTRO 3a
export const SlideIntro3a = new Slide();
var i3_example=new PIXI.Sprite(PIXI.Texture.from('images/example1.png'));
    i3_example.isSprite=true;
 //   i3_example.scale.set(0.8);
    i3_example.anchor.set(0.8);
    i3_example.x=850;
    i3_example.y=425;
var textIntro3a = [
    i3_example,
    ["some nn can classify images using their pixels" , 50, 250],
    ["for our nn, we are going to assign some attributes that we think will be important for classifying" , 50, 250],
    ["length is the object's length, while roundness is a score from 0-1 of how round the object looks",100,100],
    ["this is called data preprocessing",100,200]
];

SlideIntro3a.drawText(textIntro3a);
SlideIntro3a.drawTextButtons();

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
var examples_unlabeled=new PIXI.Sprite(PIXI.Texture.from('images/examples_unlabeled.png'));
    examples_unlabeled.anchor.set(0.5);
    examples_unlabeled.isSprite=true;
    examples_unlabeled.x=850;
    examples_unlabeled.y=300;

var examples_unlabeled2=new PIXI.Sprite(PIXI.Texture.from('images/examples_unlabeled2.png'));
    examples_unlabeled2.anchor.set(0.5);
    examples_unlabeled2.isSprite=true;
    examples_unlabeled2.x=850;
    examples_unlabeled2.y=300;
var textIntro4 = [
    examples_unlabeled,
    ["once our net is finished learning, we'll give it some unlabeled data"+'\n'+
    "to see how well it works.", 50, 50],
    examples_unlabeled2
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

