import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import { actFns } from "../Model/neuron.js";
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {small, medium, typewriter, typewriter_large, textstyles} from "./textstyles.js"
import { Button } from "./Button.js";

//draw things the right size for window
/*
var resize_w = window.innerWidth/1280;
var resize_h = layout.INNERHEIGHT/564;
var resize=Math.min(resize_h,resize_w);
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        [ ["As humans, we take our ability to recognize objects for granted. "], [50, 70] ],
        [ ["Neural networks are a type of machine learning based on the human brain." 
        + '\n'+"Using a neural network, a computer can learn to recognize and classify data." ], [150, 120] ],
        [ ["This type of neural network is called a"], [" perceptron.",typewriter_large ], [300,200] ],
        //[ percep_blank1, ["Here's a perceptron that has learned to identify strawberries and blueberries"],[200,300]]       
    ];
    SlideIntro1.drawText(textIntro1);
    SlideIntro1.drawTextButtons();

export const SlideIntro1a = new Slide();
    var percep_blank1 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
    percep_blank1.isSprite=true;
    percep_blank1.x=170;
    percep_blank1.y=200;

    var textIntro1a= [
        [percep_blank1,  ["Here's a perceptron that has learned to identify"],
            [" strawberries ", textstyles.default_red],
            ["and"],
            [" blueberries ", textstyles.default_blue],

            [200,100]]       
    ];

   // SlideIntro1a.slideContainer.addChild(percep_blank1);

    SlideIntro1a.drawText(textIntro1a);
    SlideIntro1a.drawTextButtons();

export const SlideIntro1b = new Slide();
    var percep_blank =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
        percep_blank.isSprite=true;
        percep_blank.x=percep_blank1.x;
        percep_blank.y=percep_blank1.y;

    var singleblue =new PIXI.Sprite(PIXI.Texture.from('images/singleblue.png'));
    singleblue.scale.set(0.8)
    singleblue.isSprite=true;
    singleblue.x=500;
    singleblue.y=50;
    singleblue.interactive=true;
    singleblue.buttonMode=true;
    singleblue.on('click', async function(e){
        this.x=percep_blank.x-100;
        this.y=percep_blank.y+50;

        singlestraw.x=670;
        singlestraw.y=50;
        singlecherry.x=840;
        singlecherry.y=50;

        await sleep(500);
        percep_blank.texture=PIXI.Texture.from('images/percep_blue.png');
    });


    var singlestraw =new PIXI.Sprite(PIXI.Texture.from('images/singlestraw.png'));
    singlestraw.scale.set(0.8)
    singlestraw.isSprite=true;
    singlestraw.x=670;
    singlestraw.y=50;
    singlestraw.interactive=true;
    singlestraw.buttonMode=true;
    singlestraw.on('click', async function(e){
        this.x=percep_blank.x-100;
        this.y=percep_blank.y+50;

        singleblue.x=500;
        singleblue.y=50;
        singlecherry.x=840;
        singlecherry.y=50;

        await sleep(500);
        percep_blank.texture=PIXI.Texture.from('images/percep_straw.png');
    });

    var singlecherry =new PIXI.Sprite(PIXI.Texture.from('images/single_cherry.png'));
    singlecherry.scale.set(0.8)
    singlecherry.isSprite=true;
    singlecherry.x=840;
    singlecherry.y=50;
    singlecherry.interactive=true;
    singlecherry.buttonMode=true;
    singlecherry.on('click', async function(e){
        this.x=percep_blank.x-100;
        this.y=percep_blank.y+50;

        singleblue.x=500;
        singleblue.y=50;
        singlestraw.x=670;
        singlestraw.y=50;

        await sleep(500);
        percep_blank.texture=PIXI.Texture.from('images/percep_unknown.png');
    });

    SlideIntro1b.slideContainer.addChild(singleblue,singlestraw,singlecherry);

    var textIntro1b= [
        [percep_blank, ["Click on an image to feed it into the perceptron. "], [50, 100] ],
    ];
    SlideIntro1b.drawText(textIntro1b);
    SlideIntro1b.drawTextButtons();


export const SlideIntro1c = new Slide();

// INTRO 2
export const SlideIntro2 = new Slide();

    var examples=new PIXI.Sprite(PIXI.Texture.from('images/examples_nolabels.png'));
        examples.isSprite=true;
        //examples.anchor.set(0,0.5);
        examples.x=400;
        examples.y=50;
        //examples.x=Math.max(70,500);
       // examples.y=(window.innerHeight/2)-50;

     //   examples.scale.set(resize);

    var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/examples_labels.png'));
        examples_labels.isSprite=true;
        examples_labels.anchor.set(1,0);

        examples_labels.x=400;
        examples_labels.y=50;

     //   examples_labels.scale.set(resize);


    var textIntro2 = [
       // [ ["So how does it work?", typewriter_large], [50, 100]],
       //examples,
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
        captcha.x=100;
        captcha.y=120;
       // captcha.scale.set(resize);


    var textIntro3 = [
        [ captcha,["If you've ever had to solve a puzzle like this to get into a website..."], [50,70]],
        [ ["...you were probably helping label data to train a neural network"], [400, 380]]
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


        [examples1, ["Once our net is finished learning,"+'\n'+ "we'll give it some unlabeled data"+'\n'+
        "to test if it works."],[50,100]],
        examples2
    ];
    SlideIntro4.drawText(textIntro4);
    SlideIntro4.drawTextButtons();


//Change name eventually
// INTRO 3a
export const SlideIntro3a = new Slide();
    var example_blue_no=new PIXI.Sprite(PIXI.Texture.from('images/example1_blue_no.png'));
        example_blue_no.isSprite=true;
        example_blue_no.anchor.set(0.5);
        example_blue_no.x= (window.innerWidth*1/4);
        example_blue_no.y= (window.innerHeight/2);

    var example_blue_char=new PIXI.Sprite(PIXI.Texture.from('images/example_blue_char.png'));
        example_blue_char.isSprite=true;
        example_blue_char.anchor.set(0.5);
        example_blue_char.x= (window.innerWidth*1/4);
        example_blue_char.y= (window.innerHeight/2);


    var textIntro3a = [
        [ example_blue_no, ["Some neural networks can classify images using their pixels."], [50,70] ],
        [ ["for our neural network, we are going to assign some attributes"+'\n'+"that we think are important."], [300,150]],
        example_blue_char,
        [ ["roundness is a score from 0-1 "+'\n'+"of how round the object looks", textstyles.small], [300,300]],
        [ ["This step is called"],[" data preprocessing.",textstyles.ital], [300,400 ]]
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
    SlideNeuron2.slideContainer.addChild(inputexample);

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
        [neuron_large_actfncover,["Each input is multiplied by a weight."], [100,100]],
        [["Next, we take the sum of all those values."], [100,150]],
        [["We also add in another number - called the"], [" bias", textstyles.ital], [100,200]],
        [["Hover your mouse over the weights and click the buttons to increase and decrease the weights"], [100,250]],
        [["There's one more step that happens before getting the final output"], [100,300]],

    ];

    SlideNeuron2b.drawText(textNeuron2b);
    SlideNeuron2b.drawTextButtons();

//INTERACTIVE NEURON with ACTFN
export const SlideNeuron2c = new Slide();
    SlideNeuron2c.largenet=1;

    SlideNeuron2c.slideNet=net_neuron;
    SlideNeuron2c.slideNet.update();
    SlideNeuron2c.draw_init_large(SlideNeuron2c.slideNet);

    var textNeuron2c = [
        [ ["we plug that value from the last step into a special function called an"],[" activation function", textstyles.ital], [50,100]],   
        [ ["Right now, we're using the sigmoid function (pic)"], [50,150]],
        [ ["which squishes our output between 0 and 1"], [50,200]],
    ];
    SlideNeuron2c.drawText(textNeuron2c);
    SlideNeuron2c.drawTextButtons();  

export const SlideNeuron2d = new Slide();
    SlideNeuron2d.largenet=1;

    SlideNeuron2d.slideNet=net_neuron;
    SlideNeuron2d.slideNet.update();
    SlideNeuron2d.draw_init_large(SlideNeuron2d.slideNet);

    var textNeuron2d = [
        [ ["There's also the RELU function (pic)"], [50,150]],
        [ ["which gives us 0 if the input is 0 or below, or returns the input if it's greater than 0."], [50,200]],
        [ ["click the buttons below to change your activation function."], [50,200]],

        [ ["importance"], [50,300]],

    ];
    SlideNeuron2d.drawText(textNeuron2d);
    SlideNeuron2d.drawTextButtons();  
    SlideNeuron2d.drawActFnButtons(SlideNeuron2d.slideNet);


    /*
        [ ["There's also the RELU function (pic)"], [50,150]],
        [ ["which gives us 0 if the input is 0 or below, or returns the input if it's greater than 0."], [50,150]],
        [ ["which gives us 0 if the input is 0 or below, or returns the input if it's greater than 0."], [50,150]],

        [ ["sentence about importance"], [50,200]],



       // [neuron_large_over2,["pp"], [0,100]],
*/


    //  SlideNeuron2c.buttonContainer.getChildByName("relu").on('click', function(e){console.log("hi")});
/*
    SlideNeuron2c.buttonContainer.addChild(new Button("relu",PIXI.Texture.from('images/buttons/relu.png'), layout.BUTTONS_X,550,true));
    SlideNeuron2c.buttonContainer.getChildByName("relu").on('click', function(e){
        
            //console.log(net.netActFn);
        //    console.log(SlideNeuron2c.slideNet.netActFn);

            SlideNeuron2c.slideNet.setNetActFn(actFns.RELU);
          //  console.log(SlideNeuron2c.slideNet.netActFn);
           SlideNeuron2c.slideNet.update();
          // console.log()
            SlideNeuron2c.draw_update_large(SlideNeuron2c.slideNet);
        });*/

//INTERACTIVE NEURON with ACTFN - COVER
export const SlideNeuron2e = new Slide();
    SlideNeuron2e.largenet=1;

    SlideNeuron2e.slideNet=net_neuron;
    SlideNeuron2e.slideNet.update();
    SlideNeuron2e.draw_init_large(SlideNeuron2c.slideNet);

    SlideNeuron2e.neuronContainer.getChildAt(1).getChildAt(0).visible=true;

    var textNeuron2e = [
        [["For now, we'll just show the output from each neuron."+'\n'+" Mouse over the neuron to see the math inside tho"], [50,100]],
        [["We can also show how active each neuron is by its color - more yellow is more active"], [50,200]],
    ];
    SlideNeuron2e.drawText(textNeuron2e);
    SlideNeuron2e.drawTextButtons();






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
//SlideSandbox.drawButtons(net);
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
