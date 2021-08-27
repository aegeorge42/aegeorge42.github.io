import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {small, medium, typewriter, typewriter_large, textstyles} from "./textstyles.js"
//import {MultiStyleText} from "./../pixi/pixi-multistyle-text.js"


// HOME
export const SlideHome = new Slide();

// INSTRUCTIONS
export const SlideInstruct = new Slide();

var textInstruct = [    
    [ ["Here is that tool that I needed to learn about neural networks"], [150, 150]],
];    
SlideInstruct.drawText(textInstruct);
SlideInstruct.drawTextButtons();

// INTRO 1
export const SlideIntro1 = new Slide();
    var textIntro1= [
        [ ["As humans, we take our ability to recognize objects for granted. "], [50, 100] ],
        [ ["Neural networks are a type of machine learning based on the human brain." 
        + '\n'+"Using a neural network, a computer can learn to recognize and classify data." ], [100, 200] ],
        [ ["This type of neural network is called a"], [" perceptron.",typewriter_large ], [200,300] ]       
    ];
    SlideIntro1.drawText(textIntro1);
    SlideIntro1.drawTextButtons();

// INTRO 2
export const SlideIntro2 = new Slide();

    var examples=new PIXI.Sprite(PIXI.Texture.from('images/allexamples_nolabels.png'));
    examples.anchor.set(0.5);
    examples.isSprite=true;
    examples.x=550;
    examples.y=325;

    var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/allexamples_labels.png'));
    examples_labels.isSprite=true;
    examples_labels.anchor.set(0.5);
    examples_labels.x=550;
    examples_labels.y=325;

    var textIntro2 = [
        [ ["So how does it work?", typewriter_large], [50, 100]],
        [examples,["In order to train our network,"+'\n'+" we need to give it some examples"+'\n'+"of data we want to classify."], [50, 170]],
        [["Using our big human brains,"+'\n'+" we label these examples"+'\n'+" with the right answers" ], [50, 300]],
        examples_labels
    ];

    SlideIntro2.drawText(textIntro2);
    SlideIntro2.drawTextButtons();

// INTRO 3
export const SlideIntro3 = new Slide();
    var captcha=new PIXI.Sprite(PIXI.Texture.from('images/captcha.png'));
    captcha.isSprite=true;
        captcha.x=200;
        captcha.y=80;

    var textIntro3 = [
        [ captcha,["If you've ever had to solve a puzzle like this to get into a website..."], [10,50]],
        [ ["...you were probably helping label data to train a neural network"], [200, 380]]
    ];

    SlideIntro3.drawText(textIntro3);
    SlideIntro3.drawTextButtons();

//INTRO 4
export const SlideIntro4 = new Slide();
    var examples1=new PIXI.Sprite(PIXI.Texture.from('images/examples1.png'));
        examples1.anchor.set(0.5);
        examples1.isSprite=true;
        examples1.x=850;
        examples1.y=300;

    var examples2=new PIXI.Sprite(PIXI.Texture.from('images/examples2.png'));
        examples2.anchor.set(0.5);
        examples2.isSprite=true;
        examples2.x=850;
        examples2.y=300;

    var textIntro4 = [


        [examples1, ["Once our net is finished learning, we'll give it some unlabeled data"+'\n'+
        "to test if it works."],[100,100]],
        examples2
    ];
    SlideIntro4.drawText(textIntro4);
    SlideIntro4.drawTextButtons();


//Change name eventually
// INTRO 3a
export const SlideIntro3a = new Slide();
    var i3_example=new PIXI.Sprite(PIXI.Texture.from('images/single_example.png'));
        i3_example.isSprite=true;
    //   i3_example.scale.set(0.8);
        i3_example.anchor.set(0.5);
        i3_example.x= (window.innerWidth*3/4);//850;
        i3_example.y= (window.innerHeight/2);//425;
    var textIntro3a = [
        [ i3_example, ["some nn can classify images using their pixels"], [20,50] ],
        [ ["for our nn, we are going to assign some attributes"+'\n'+"that we think will be important for classifying"], [50,150]],
        [ ["length is the object's length,"+'\n'+"while roundness is a score from 0-1 "+'\n'+"of how round the object looks", small], [150,300]],
        [ ["this is called data preprocessing"], [0,400 ]]
    ];

    SlideIntro3a.drawText(textIntro3a);
    
    SlideIntro3a.drawTextButtons();

//NEURON INTRO - JUST PICTURE
export const SlideNeuron1 = new Slide();
    var neuron_example_x=750;
    var neuron_example_y=350;

    var neuron_example0=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example0.png'));
        neuron_example0.isSprite=true;
        neuron_example0.anchor.set(0.5);
        neuron_example0.x=neuron_example_x;
        neuron_example0.y=neuron_example_y;

    var neuron_example1=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example1.png'));
        neuron_example1.isSprite=true;
        neuron_example1.anchor.set(0.5);
        neuron_example1.x=neuron_example_x;
        neuron_example1.y=neuron_example_y;

    var neuron_example2=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example2.png'));
        neuron_example2.isSprite=true;
        neuron_example2.anchor.set(0.5);
        neuron_example2.x=neuron_example_x;
        neuron_example2.y=neuron_example_y;

    var neuron_example3=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example3.png'));
        neuron_example3.isSprite=true;
        neuron_example3.anchor.set(0.5);
        neuron_example3.x=neuron_example_x;
        neuron_example3.y=neuron_example_y;

    var neuron_example=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example.png'));
        neuron_example.isSprite=true;
        neuron_example.anchor.set(0.5);
        neuron_example.x=neuron_example_x;
        neuron_example.y=neuron_example_y;

    var textNeuron1 = [
        [neuron_example0,["Here's a neuron."], [ 100, 100]],
        [ neuron_example1,["For each neuron, it takes in some inputs..." ], [ 100, 200] ],
        [ neuron_example2,["...some math happens..." ], [ 100, 300]],
        [ neuron_example3,["and it spits out a single output" ], [ 100, 400]],
    ];

    SlideNeuron1.drawText(textNeuron1);
    SlideNeuron1.drawTextButtons();

//INTERACTIVE NEURON
export const SlideNeuron2 = new Slide();
    SlideNeuron2.largenet=1;
    var net_neuron = new Net();
    net_neuron.removeLayer();
    SlideNeuron2.slideNet=net_neuron;

    const train_input2 = {
        input: [0.2,1.0],
        expected: [1],
        expected_text: ["blueberry"]
    }

    const train_data2 = {
        points: [train_input2],
        labels: ["length", "roundness"],
        type: ["blueberry"]
    }

    SlideNeuron2.slideNet.setNetData(train_data2);
    SlideNeuron2.slideNet.setOutLayer();
    SlideNeuron2.slideNet.update();
    SlideNeuron2.draw_init_large(SlideNeuron2.slideNet);

    var neuron_large_actfncover=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_actfncover.png'));
        neuron_large_actfncover.isSprite=true;
        neuron_large_actfncover.anchor.set(0.5);
        neuron_large_actfncover.x=layout.NEURON_LARGE_X;
        neuron_large_actfncover.y=layout.NEURON_LARGE_Y;

    var neuron_large_over=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_over.png'));
        neuron_large_over.isSprite=true;
        neuron_large_over.anchor.set(0.5);
        neuron_large_over.x=layout.NEURON_LARGE_X;
        neuron_large_over.y=layout.NEURON_LARGE_Y;

    var inputexample=new PIXI.Sprite(PIXI.Texture.from('images/single_example.png'));
    inputexample.isSprite=true;
    inputexample.anchor.set(0.5);
    inputexample.scale.set(0.8);
    inputexample.x= (window.innerWidth*1/4);//850;
    inputexample.y= (window.innerHeight/2);//425;

    SlideNeuron2.slideContainer.addChild(inputexample)
    var textNeuron2 = [
        [neuron_large_over,["Let's use one of our data points as an input."], [0,100]],
        [["The two values that we found earlier are fed directly into our net"], [100,350]],

    /*  [["for now, we'll just show the output of the neuron. Also, more yellow= more active"], [150,150]],
        [["but hover over the neuron to see what's going on inside"], [150,200]],*/

    // [ [SlideNeuron2.slideNet.getLayer(0).neurons[0].inputs[0].toFixed(2) +" × "+ SlideNeuron2.slideNet.getLayer(0).neurons[0].weights[0].toFixed(2)], [ 100, 100]]
    ];

    SlideNeuron2.drawText(textNeuron2);
    SlideNeuron2.drawTextButtons();

//INTERACTIVE NEURON with WEIGHTS ONLY
export const SlideNeuron2b = new Slide();
    SlideNeuron2b.largenet=1;

    SlideNeuron2b.slideNet=net_neuron;
    SlideNeuron2b.slideNet.update();

    SlideNeuron2b.draw_init_large(SlideNeuron2b.slideNet);

    var textNeuron2b = [
        [neuron_large_actfncover,["math explanation"], [0,100]],
        [["click weights to change and see"], [100,150]],
        [["don't forget to talk about bias"], [100,250]],
        [["quick into to act fn"], [100,300]],

    ];
    SlideNeuron2b.drawText(textNeuron2b);
    SlideNeuron2b.drawTextButtons();

//INTERACTIVE NEURON with ACTFN
export const SlideNeuron2c = new Slide();
    SlideNeuron2c.largenet=1;

    SlideNeuron2c.slideNet=net_neuron;
    SlideNeuron2c.slideNet.update();
    SlideNeuron2c.draw_init_large(SlideNeuron2c.slideNet);

    //SlideNeuron2c.neuronContainer.getChildAt(1).getChildAt(0).visible=true;

    var textNeuron2c = [
        [["act fn"], [0,100]],
       // [neuron_large_over2,["math explanation"], [0,100]],
       // [neuron_large_over2,["pp"], [0,100]],

    ];
    SlideNeuron2c.drawText(textNeuron2c);
    SlideNeuron2c.drawTextButtons();

//INTERACTIVE NEURON with ACTFN - COVER
export const SlideNeuron2d = new Slide();
    SlideNeuron2d.largenet=1;

    SlideNeuron2d.slideNet=net_neuron;
    SlideNeuron2d.slideNet.update();
    SlideNeuron2d.draw_init_large(SlideNeuron2c.slideNet);

    SlideNeuron2d.neuronContainer.getChildAt(1).getChildAt(0).visible=true;

    var textNeuron2c = [
        [["For now, we'll just show the output from each neuron."+'\n'+" Mouse over the neuron to see the math inside tho"], [50,100]],
        [["We can also show how active each neuron is by its color - more yellow is more active"], [50,200]],
    ];
    SlideNeuron2d.drawText(textNeuron2c);
    SlideNeuron2d.drawTextButtons();






//export const SlideData3 = new Slide();
export const SlideNet1 = new Slide();
var net1 = new Net();
SlideNet1.slideNet=net1;
net1.setNetData(fruits_small);
net1.setOutLayer();
net1.removeLayer();
net1.update();
SlideNet1.draw_init(net1);
/*
SlideNet1.weightsContainer.visible=false;
SlideNet1.neuronContainer.visible=false;
SlideNet1.labelsContainer.visible=false;    
console.log(SlideNet1.labelsContainer);
*/
var textNet1 = [
    [["Because we have 2 classes,"+'\n'+ "we need two output neurons"], [50,50]]
];
SlideNet1.drawText(textNet1);
SlideNet1.drawTextButtons();




//SANDBOX
export const SlideSandbox = new Slide();
var net = new Net();
SlideSandbox.slideNet=net;


net.setNetData(fruits_small);
net.setLearnRate(0.10);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();
var g = new Graph(fruits_test);
SlideSandbox.slideContainer.addChild(g.getGraph());

SlideSandbox.draw_init(net);
SlideSandbox.drawButtons(net,g);

var textInstruct2 = [    
    [ ["SASGSGREGSGS"], [50, 350]]
];
SlideSandbox.drawText(textInstruct2);
SlideSandbox.drawTextButtons();

//SlideSandbox.drawLearnButtons(net);

//g.updateGraph( SlideSandbox.slideNet);
//SlideSandbox.addGraphFns(SlideSandbox.slideNet,g);


//GRAPH TEST
export const SlideGraphTest = new Slide();
/*
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
SlideGraphTest.addGraphFns(netGraph,g);
netGraph.setNetData(fruits);
*/
