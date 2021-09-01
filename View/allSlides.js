import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import { actFns } from "../Model/neuron.js";
import {fruits, fruits_small, fruits_test} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {small, medium, typewriter, typewriter_large, textstyles} from "./textstyles.js"
import { Button } from "./Button.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// HOME
export const SlideHome = new Slide();

// INSTRUCTIONS
export const SlideInstruct = new Slide();
    var textInstruct = [    
        [ ["Here is that tool that I needed to learn about neural networks"], [layout.LEFTBUFFER, 150]],
    ];    
    SlideInstruct.drawText(textInstruct);
    SlideInstruct.drawTextButtons();

    /* visualize buffer area
        var rect = new PIXI.Graphics();
        rect.drawRect(0,0,1100,450);
        SlideInstruct.slideContainer.addChild(rect);
        rect.x=(window.innerWidth-1100)/2;
        rect.y=60;
    */


/********  INTRO ********/
export const SlideIntro1 = new Slide();

    var textIntro1= [
        [ ["As humans, we take our ability to recognize objects for granted. "], [layout.LEFTBUFFER, 70] ],
        [ ["Neural networks are a type of machine learning based on the human brain." 
        + '\n'+"Using a neural network, a computer can learn to recognize and classify data." ], [layout.LEFTBUFFER, 120] ],
        [ ["This type of neural network is called a"], [" perceptron.",typewriter_large ], [layout.LEFTBUFFER,200] ],
    ];
    SlideIntro1.drawText(textIntro1);
    SlideIntro1.drawTextButtons();

export const SlideIntro1a = new Slide();
    var percep_blank1 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
    percep_blank1.isSprite=true;

    percep_blank1.x=layout.LEFTBUFFER + 150;
    percep_blank1.y=200;

    var textIntro1a= [
        [percep_blank1,  ["Here's a perceptron that has learned to classify"],
            [" strawberries ", textstyles.default_red],
            ["and"],
            [" blueberries ", textstyles.default_blue],
            [layout.LEFTBUFFER,100]]       
    ];

    SlideIntro1a.drawText(textIntro1a);
    SlideIntro1a.drawTextButtons();

// INTRO - example percep - INTERACTIVE
export const SlideIntro1b = new Slide();
    var percep_blank =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
        percep_blank.isSprite=true;
        percep_blank.x=percep_blank1.x;
        percep_blank.y=percep_blank1.y;

    var textIntro1b= [
        [percep_blank, ["Click on an image to feed it into the perceptron. "], [layout.LEFTBUFFER, 100] ],
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro1b[0][1][0],textstyles.default).width;

    var bluex=layout.LEFTBUFFER+textwid+50;
    var strawx=bluex+150;
    var cherryx=strawx+150;

    var inx= layout.LEFTBUFFER+150;
    var iny = percep_blank.y+80;

    var singleblue =new PIXI.Sprite(PIXI.Texture.from('images/singleblue.png'));
        singleblue.scale.set(0.8)
        singleblue.isSprite=true;
        singleblue.x=bluex;
        singleblue.y=50;
        singleblue.interactive=true;
        singleblue.buttonMode=true;
        singleblue.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singlestraw.x=strawx;
            singlestraw.y=50;
            singlecherry.x=cherryx;
            singlecherry.y=50;

            await sleep(500);
           percep_blank.texture=PIXI.Texture.from('images/percep_blueberry.png');
        });


    var singlestraw =new PIXI.Sprite(PIXI.Texture.from('images/singlestraw.png'));
        singlestraw.scale.set(0.8)
        singlestraw.isSprite=true;
        singlestraw.x=strawx;
        singlestraw.y=50;
        singlestraw.interactive=true;
        singlestraw.buttonMode=true;
        singlestraw.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=bluex;
            singleblue.y=50;
            singlecherry.x=cherryx;
            singlecherry.y=50;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/percep_strawberry.png');
        });

    var singlecherry =new PIXI.Sprite(PIXI.Texture.from('images/single_cherry.png'));
        singlecherry.scale.set(0.8)
        singlecherry.isSprite=true;
        singlecherry.x=cherryx;
        singlecherry.y=50;
        singlecherry.interactive=true;
        singlecherry.buttonMode=true;
        singlecherry.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=bluex;
            singleblue.y=50;
            singlestraw.x=strawx;
            singlestraw.y=50;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/percep_idk.png');
        });

    SlideIntro1b.slideContainer.addChild(singleblue,singlestraw,singlecherry);

    SlideIntro1b.drawText(textIntro1b);
    SlideIntro1b.drawTextButtons();

export const SlideIntro1c = new Slide();
var textIntro1c= [
    [["So how does it work? ",textstyles.large_bold], [layout.LEFTBUFFER+200, 100] ],
    [["First, we have to train our neural network."], [layout.LEFTBUFFER+200, 200] ],

];
SlideIntro1c.drawText(textIntro1c);
SlideIntro1c.drawTextButtons();

export const SlideIntro2 = new Slide();

    var examples=new PIXI.Sprite(PIXI.Texture.from('images/examples_nolabels.png'));
        examples.isSprite=true;
        examples.scale.set(0.8);
        examples.x=0;
        examples.y=70;

    var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/examples_labels.png'));
        examples_labels.isSprite=true;
        examples_labels.scale.set(0.8);
        examples_labels.x=0;
        examples_labels.y=70;


    var textIntro2 = [
        [["In order to train our network, "+'\n'+"we need to give it some examples "+'\n'+"of data we want to classify."], [layout.LEFTBUFFER, 170]],
        examples,
        [["Using our big human brains,"+'\n'+" we label these examples"+'\n'+" with the right answers" ], [layout.LEFTBUFFER, 300]],
        examples_labels
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro2[0][0][0],textstyles.default).width;
    examples.x=layout.LEFTBUFFER+textwid +20;
    examples_labels.x=layout.LEFTBUFFER+textwid +20;



    SlideIntro2.drawText(textIntro2);
    SlideIntro2.drawTextButtons();

export const SlideIntro3 = new Slide();
    var captcha=new PIXI.Sprite(PIXI.Texture.from('images/captcha.png'));
    captcha.isSprite=true;
        captcha.x=layout.LEFTBUFFER;
        captcha.y=120;
        captcha.scale.set(0.8);


    var textIntro3 = [
        [ captcha,["If you've ever had to solve a puzzle like this to get into a website..."], [layout.LEFTBUFFER,80]],
        [ ["...you were probably helping label data to train a neural network"], [layout.LEFTBUFFER +300, 380]]
    ];

    SlideIntro3.drawText(textIntro3);
    SlideIntro3.drawTextButtons();

export const SlideIntro4 = new Slide();
    var examples1=new PIXI.Sprite(PIXI.Texture.from('images/examples1.png'));
        examples1.isSprite=true;
        examples1.scale.set(0.8);
        examples1.x=layout.LEFTBUFFER;
        examples1.y=80;

    var examples2=new PIXI.Sprite(PIXI.Texture.from('images/examples2.png'));
        examples2.isSprite=true;
        examples2.scale.set(0.8);

        examples2.x=layout.LEFTBUFFER;
        examples2.y=80;

    var textIntro4 = [
        [examples1, ["Once our net is finished learning, "+'\n'+ "we'll give it some unlabeled data"+'\n'+
        "to test if it works."],[layout.LEFTBUFFER,100]],
        examples2
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro4[0][1][0],textstyles.default).width;
    examples1.x=examples1.x+textwid;
    examples2.x=examples2.x+textwid;


    SlideIntro4.drawText(textIntro4);
    SlideIntro4.drawTextButtons();

export const SlideIntro3a = new Slide();
    var example_blue_no=new PIXI.Sprite(PIXI.Texture.from('images/example1_nolabel.png'));
        example_blue_no.isSprite=true;
        example_blue_no.x= layout.LEFTBUFFER;
        example_blue_no.y= 50;//(window.innerHeight/2);

        console.log("WIDTH"+example_blue_no.width)
    var example_blue_char=new PIXI.Sprite(PIXI.Texture.from('images/example1_label.png'));
        example_blue_char.isSprite=true;
        example_blue_char.x= layout.LEFTBUFFER
        example_blue_char.y= 50;


    var textIntro3a = [
        [ example_blue_no, ["Some neural networks can classify images using their pixels. "], [layout.LEFTBUFFER+350,100] ],
        [ ["for our neural network, we are going to assign some attributes"+'\n'+"that we think are important."], [layout.LEFTBUFFER+350,150]],
        example_blue_char,
       // [ ["roundness is a score from 0-1 "+'\n'+"of how round the object looks", textstyles.medium], [layout.LEFTBUFFER+340,400]],
        [ ["This step is called"],[" data preprocessing.",textstyles.ital], [layout.LEFTBUFFER+400,340 ]],
        [ ["Now we're ready to start building our neural network.",textstyles.large_bold], [layout.LEFTBUFFER+350,400]]
    ];

    textwid= PIXI.TextMetrics.measureText(textIntro3a[0][1][0],textstyles.default).width;
    //example_blue_no.x=layout.LEFTBUFFER+textwid;
    //example_blue_char.x=layout.LEFTBUFFER+textwid;

    

    SlideIntro3a.drawText(textIntro3a);
    
    SlideIntro3a.drawTextButtons();



/************      NEURON     **************/
export const SlideNeuronA = new Slide();

    var percep_blank2 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
        percep_blank2.scale.set(1.2)
        percep_blank2.isSprite=true;

        percep_blank2.x=layout.LEFTBUFFER + 150;
        percep_blank2.y=150;

    var percep_labels =new PIXI.Sprite(PIXI.Texture.from('images/percep_labels.png'));
        percep_labels.scale.set(1.2)
        percep_labels.isSprite=true;

        percep_labels.x=layout.LEFTBUFFER + 150;
        percep_labels.y=150;

    var textNeuronA = [
        [percep_blank2,["A neural network is made up of "], ["neurons",textstyles.large_bold],[" connected by "], ["weights. ",textstyles.large_bold],[ layout.LEFTBUFFER, 100]],
        percep_labels
    ];

    SlideNeuronA.drawText(textNeuronA);
    SlideNeuronA.drawTextButtons();

export const SlideNeuron1 = new Slide();

    var neuron_example_x=layout.LEFTBUFFER;
    var neuron_example_y=70;
    var scale=0.8;

    var neuron_example0=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example0.png'));
        neuron_example0.scale.set(scale);
        neuron_example0.isSprite=true;
        neuron_example0.x=neuron_example_x;
        neuron_example0.y=neuron_example_y;

    var neuron_example1=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example1.png'));
        neuron_example1.scale.set(scale);
        neuron_example1.isSprite=true;
        neuron_example1.x=neuron_example_x;
        neuron_example1.y=neuron_example_y;

    var neuron_example2=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example2.png'));
        neuron_example2.scale.set(scale);
        neuron_example2.isSprite=true;
        neuron_example2.x=neuron_example_x;
        neuron_example2.y=neuron_example_y;

    var neuron_example3=new PIXI.Sprite(PIXI.Texture.from('images/neuron_example3.png'));
        neuron_example3.scale.set(scale);
        neuron_example3.isSprite=true;
        neuron_example3.x=neuron_example_x;
        neuron_example3.y=neuron_example_y;

    var textNeuron1 = [
        [neuron_example0,["Here's a neuron. ", textstyles.large_bold], [ layout.LEFTBUFFER, 120]],
        [ neuron_example1,["A neuron takes in some inputs... " ], [ layout.LEFTBUFFER, 200] ],
        [ ["(each input is a single number)", textstyles.medium ], [ layout.LEFTBUFFER+20, 250] ],
        [ neuron_example2,["...some math happens... " ], [ layout.LEFTBUFFER+500, 450]],
        [ neuron_example3,["...and spits out a single output. " ], [ layout.LEFTBUFFER+760, 350]],
    ];

    var textwid= PIXI.TextMetrics.measureText(textNeuron1[1][1][0],textstyles.default).width;
    neuron_example1.x=neuron_example_x+textwid;
    neuron_example2.x=neuron_example_x+textwid;
    neuron_example3.x=neuron_example_x+textwid;
    neuron_example0.x=neuron_example_x+textwid;

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

    var neuron_large_over=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_over.png'));
        neuron_large_over.isSprite=true;
        neuron_large_over.anchor.set(0.5);
        neuron_large_over.x=layout.NEURON_LARGE_X;
        neuron_large_over.y=layout.NEURON_LARGE_Y;

    var inputexample=new PIXI.Sprite(PIXI.Texture.from('images/single_example.png'));
        inputexample.isSprite=true;
        inputexample.scale.set(0.7);
        inputexample.x= layout.LEFTBUFFER;
        inputexample.y= 120;
    SlideNeuron2.slideContainer.addChild(inputexample);

    var textNeuron2 = [
        [neuron_large_over,["Let's start with this image. "], [layout.LEFTBUFFER,80]],
        [["The two values that we found earlier "+'\n'+"become our inputs "], [layout.LEFTBUFFER,465]],
    ];

    SlideNeuron2.drawText(textNeuron2);
    SlideNeuron2.drawTextButtons();

//INTERACTIVE NEURON with WEIGHTS ONLY
export const SlideNeuron2b = new Slide();
    SlideNeuron2b.largenet=1;

    SlideNeuron2b.slideNet=net_neuron;
    SlideNeuron2b.slideNet.update();

    SlideNeuron2b.draw_init_large(SlideNeuron2b.slideNet);

    var neuron_large_actfncover=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_actfncover.png'));
        neuron_large_actfncover.isSprite=true;
        neuron_large_actfncover.anchor.set(0.5);
        neuron_large_actfncover.x=layout.NEURON_LARGE_X;
        neuron_large_actfncover.y=layout.NEURON_LARGE_Y;

    /*var biascover = new PIXI.Graphics();
        biascover.beginFill(0xFFFFFF);
        biascover.drawRect(layout.NEURON_LARGE_X-165,layout.NEURON_LARGE_Y,100,25)
*/
    var textNeuron2b = [
        [neuron_large_actfncover,["Each input is multiplied by a weight. "], [layout.LEFTBUFFER,100]],
        [["Next, we take the sum of all those values. "], [layout.LEFTBUFFER,150]],
        [["We also add in another number - called the"], [" bias  ", textstyles.ital], [layout.LEFTBUFFER,200]],
        [["Hover your mouse over the weights and click the buttons "+'\n'+ " to increase and decrease the weights. "], [layout.LEFTBUFFER-50,250]],
    ];

   // SlideNeuron2b.slideContainer.addChild(biascover);
    SlideNeuron2b.drawText(textNeuron2b);
    SlideNeuron2b.drawTextButtons();


export const SlideNeuron2b2 = new Slide();
    SlideNeuron2b2.largenet=1;

    SlideNeuron2b2.slideNet=net_neuron;
    SlideNeuron2b2.slideNet.update();

    SlideNeuron2b2.draw_init_large(SlideNeuron2b2.slideNet);

    var neuron_large_actfncover2=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_actfncover.png'));
    neuron_large_actfncover2.isSprite=true;
    neuron_large_actfncover2.anchor.set(0.5);
    neuron_large_actfncover2.x=layout.NEURON_LARGE_X;
    neuron_large_actfncover2.y=layout.NEURON_LARGE_Y;

    var textNeuron2b2 = [
        [neuron_large_actfncover2,["define"], [layout.LEFTBUFFER,200]],
      //  [["define bias + weights"],[layout.LEFTBUFFER-50,250]],
        [["To start, our weights and biases are random."],[layout.LEFTBUFFER,300]],


    ];

    SlideNeuron2b2.drawText(textNeuron2b2);
    SlideNeuron2b2.drawTextButtons();

//INTERACTIVE NEURON with ACTFN
export const SlideNeuron2c = new Slide();
    SlideNeuron2c.largenet=1;

    SlideNeuron2c.slideNet=net_neuron;
    SlideNeuron2c.slideNet.update();
    SlideNeuron2c.draw_init_large(SlideNeuron2c.slideNet);

    var sigmoid=new PIXI.Sprite(PIXI.Texture.from('images/sigmoid_temp.png'));
    sigmoid.isSprite=true;
    sigmoid.x=layout.LEFTBUFFER;
    sigmoid.y=layout.LEFTBUFFER;

    var textNeuron2c = [
        [ ["we plug that value from the last step into an"], [" activation function", textstyles.ital], [layout.LEFTBUFFER-50,70]],   
        [ sigmoid,["Right now, we're using the sigmoid function"], [50,150]],
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
    SlideNeuron2e.drawActFnButtons(SlideNeuron2e.slideNet);







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
    [["Because we have 2 classes,"+'\n'+ "we need two final neurons"], [layout.LEFTBUFFER+570,70]],
    [["these are called"], [" output neurons", textstyles.ital], [layout.LEFTBUFFER+570,150]],
    [["these neurons give us the final answer "], [layout.LEFTBUFFER+520,200]],
    [["in the beginning, weights and biases are all random"], [layout.LEFTBUFFER+520,250]],
];
SlideNet1.drawText(textNet1);
SlideNet1.drawTextButtons();
SlideNet1.drawButtons(SlideNet1);
SlideNet1.setVis(SlideNet1.slideContainer.getChildAt(7),false);
SlideNet1.slideContainer.getChildAt(7).getChildByName("actfnsbox").visible=true;
SlideNet1.slideContainer.getChildAt(7).getChildByName("sigmoid").visible=true;
SlideNet1.slideContainer.getChildAt(7).getChildByName("relu").visible=true;
//SlideNet1.drawActFnButtons(SlideNet1.slideNet);

export const SlideNet1b = new Slide();
    SlideNet1b.slideNet=net1;
    net1.update();
    console.log("layers"+net1.layers.length)
    SlideNet1b.draw_init(net1);    
    var textNet1b = [
        [["hidden layers"], [layout.LEFTBUFFER+570,70]],
       
    ];
    SlideNet1b.drawText(textNet1b);
    SlideNet1b.drawTextButtons();
    SlideNet1b.drawButtons(SlideNet1b.slideNet);
    SlideNet1b.setVis(SlideNet1b.slideContainer.getChildAt(7),false);
    
    SlideNet1b.slideContainer.getChildAt(7).getChildByName("actfnsbox").visible=true;
    SlideNet1b.slideContainer.getChildAt(7).getChildByName("sigmoid").visible=true;
    SlideNet1b.slideContainer.getChildAt(7).getChildByName("relu").visible=true;
    SlideNet1b.slideContainer.getChildAt(7).getChildByName("addlayer").visible=true;
    SlideNet1b.slideContainer.getChildAt(7).getChildByName("remlayer").visible=true;


export const SlideNet2 = new Slide();
    SlideNet2.slideNet=net1;
    net1.update();
    SlideNet2.draw_init(net1);

    var SlideNet2Graph = new Graph(fruits);
    SlideNet2.slideContainer.addChild(SlideNet2Graph.getGraph());
    SlideNet2.drawButtons(net1,SlideNet2Graph);
    SlideNet2.setVis(SlideNet2.slideContainer.getChildAt(7),false);
    SlideNet2.slideContainer.getChildAt(7).getChildByName("actfnsbox").visible=true;
    SlideNet2.slideContainer.getChildAt(7).getChildByName("sigmoid").visible=true;
    SlideNet2.slideContainer.getChildAt(7).getChildByName("relu").visible=true;
    SlideNet2.slideContainer.getChildAt(7).getChildByName("addlayer").visible=true;
    SlideNet2.slideContainer.getChildAt(7).getChildByName("remlayer").visible=true;

    var textNet2 = [
        [["Here's a graph of all our data"], [layout.LEFTBUFFER+570,70]],
        [["Because we have 2 inputs, we can plot our data points on a 2d graph"], [layout.LEFTBUFFER,70]],
        [["Even though we couldn't plot it there's no limit on how many inputs"], [layout.LEFTBUFFER,90]],


    ];
    SlideNet2.drawText(textNet2);
    SlideNet2.drawTextButtons();

export const SlideNet3 = new Slide();
    SlideNet3.slideNet=net1;
    net1.update();
    SlideNet3.draw_init(net1);

    var SlideNet2Graph = new Graph(fruits);
    SlideNet3.slideContainer.addChild(SlideNet2Graph.getGraph());
    SlideNet3.drawButtons(net1,SlideNet2Graph);
    SlideNet3.setVis(SlideNet3.slideContainer.getChildAt(7),false);
    SlideNet3.slideContainer.getChildAt(7).getChildByName("actfnsbox").visible=true;
    SlideNet3.slideContainer.getChildAt(7).getChildByName("sigmoid").visible=true;
    SlideNet3.slideContainer.getChildAt(7).getChildByName("relu").visible=true;

    var textNet3 = [
        [["the goal is to find a line that can separate the two classes"], [layout.LEFTBUFFER+570,70]],
    ];
    SlideNet3.drawText(textNet3);
    SlideNet3.drawTextButtons();


//SANDBOX
export const SlideSandbox = new Slide();
var net = new Net();
SlideSandbox.slideNet=net;


net.setNetData(fruits);
net.setLearnRate(0.3);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();
var g = new Graph(fruits);
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
