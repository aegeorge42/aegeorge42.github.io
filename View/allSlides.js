import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import { actFns } from "../Model/neuron.js";
import {fruits, fruits_small, fruits_test,fruits_test3, fruits_circle} from "../Model/data.js"
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
        [ ["Here is that tool that I needed to learn about neural networks"], [layout.LEFTBUFFER, layout.TOPBUFFER]],
    ];    
    SlideInstruct.drawText(textInstruct);
    SlideInstruct.drawTextButtons();

    // visualize buffer area
    
        /*var rect = new PIXI.Graphics();
        rect.drawRect(layout.LEFTBUFFER,layout.TOPBUFFER,1100,470);
        SlideInstruct.slideContainer.addChild(rect);
        //rect.x=(window.innerWidth-1100)/2;
        //rect.y=60;
        SlideInstruct.slideContainer.addChild(rect);

   /* var rect2 = new PIXI.Sprite(PIXI.Texture.from('images/button_down.png'));
        rect2.anchor.set(0,1);
        rect2.x=layout.LEFTBUFFER;
        rect2.y=layout.BOTTOMBUFFER-100;
    SlideInstruct.slideContainer.addChild(rect2);
    */


/****************     
 * 
 * 
 *    INTRO
 * 
 * **************/
export const SlideIntro1 = new Slide();

    var textIntro1= [
        [ ["As humans, we take our ability to recognize"+ '\n'+"objects"],[" for granted", textstyles.large_bold], [layout.LEFTBUFFER+30, 70] ],
        [ ["Neural networks are a type of"],[ " machine learning " +'\n',textstyles.large_bold],["based on the human brain."],[layout.LEFTBUFFER, 120] ],
        //[ ["Neural networks are a type of"],[ "machine learning" +'\n',textstyles.large_bold],["based on the human brain."], [layout.LEFTBUFFER, 120] ],
       // [ "Using a neural network, a computer can learn to"], ["recognize",textstyles.large_bold], ["and"], ["classify",textstyles.large_bold], ["data." ], [layout.LEFTBUFFER, 120] ],
        [ ["This type of neural network is called a"], [" perceptron.",typewriter_large ], [layout.LEFTBUFFER,200] ],
    ];
    SlideIntro1.drawText(textIntro1);
    SlideIntro1.drawTextButtons();

export const SlideIntro1a = new Slide();
    var percep_blank1 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
    percep_blank1.isSprite=true;

    percep_blank1.x=layout.LEFTBUFFER + 250;
    percep_blank1.y=100;

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
        percep_blank.y=140;

    var textIntro1b= [
        [percep_blank, ["Click on an image to feed it into the perceptron. "], [layout.LEFTBUFFER, 100] ],
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro1b[0][1][0],textstyles.default).width;

    var bluex=layout.LEFTBUFFER+textwid;
    var strawx=bluex+150;
    var cherryx=strawx+150;
    var fruity=30;

    var inx= percep_blank.x;
    var iny = percep_blank.y+142;

    var singleblue =new PIXI.Sprite(PIXI.Texture.from('images/singleblue.png'));
        singleblue.isSprite=true;
        singleblue.x=bluex;
        singleblue.y=fruity;
        singleblue.interactive=true;
        singleblue.buttonMode=true;
        singleblue.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singlestraw.x=strawx;
            singlestraw.y=fruity;
            singlecherry.x=cherryx;
            singlecherry.y=fruity;

            await sleep(500);
           percep_blank.texture=PIXI.Texture.from('images/percep_blueberry.png')
        });


    var singlestraw =new PIXI.Sprite(PIXI.Texture.from('images/singlestraw.png'));
        singlestraw.isSprite=true;
        singlestraw.x=strawx;
        singlestraw.y=fruity;
        singlestraw.interactive=true;
        singlestraw.buttonMode=true;
        singlestraw.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=bluex;
            singleblue.y=fruity;
            singlecherry.x=cherryx;
            singlecherry.y=fruity;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/percep_straw.png')
        });

    var singlecherry =new PIXI.Sprite(PIXI.Texture.from('images/singleother.png'));
        singlecherry.isSprite=true;
        singlecherry.x=cherryx;
        singlecherry.y=fruity;
        singlecherry.interactive=true;
        singlecherry.buttonMode=true;
        singlecherry.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=bluex;
            singleblue.y=fruity;
            singlestraw.x=strawx;
            singlestraw.y=fruity;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/percep_unknown2.png')
        });

    SlideIntro1b.labelsContainer.addChild(singleblue,singlestraw,singlecherry);

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
        [["This is called supervised learning" ], [layout.LEFTBUFFER, 470]],

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
      //  [ ["Now we're ready to start building our neural network.",textstyles.large_bold], [layout.LEFTBUFFER+350,400]]
    ];

    textwid= PIXI.TextMetrics.measureText(textIntro3a[0][1][0],textstyles.default).width;


    SlideIntro3a.drawText(textIntro3a);
    SlideIntro3a.drawTextButtons();

export const SlideIntro4a = new Slide();
    var SlideIntroGraph = new Graph(fruits_test3);
    SlideIntro4a.graphContainer.addChild(SlideIntroGraph.getGraph());
      var textIntro4a = [
        [["Here's a graph of all our data"], [layout.LEFTBUFFER+570,70]],
        [["Because we have 2 inputs, we can plot our data points on a 2d graph"], [layout.LEFTBUFFER,70]],
        [["(Even though we couldn't plot it there's no limit on how many inputs)"], [layout.LEFTBUFFER,90]],
        [["The neural network is going to try to find the line that separates the two classes"], [layout.LEFTBUFFER,90]],
    ];
     SlideIntro4a.drawText(textIntro4a);

    SlideIntro4a.drawTextButtons();


/****************     
 * 
 * 
 *    NEURON
 * 
 * **************/

export const SlideNeuronA = new Slide();

    var percep_blank2 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
        percep_blank2.isSprite=true;

        percep_blank2.x=layout.LEFTBUFFER + 150;
        percep_blank2.y=100;

    var percep_labels =new PIXI.Sprite(PIXI.Texture.from('images/percep_labels.png'));
        percep_labels.isSprite=true;

        percep_labels.x=layout.LEFTBUFFER + 150;
        percep_labels.y=100;

    var textNeuronA = [
        [percep_blank2,["A neural network is made up of "], ["neurons",textstyles.large_bold],[" connected by "], ["weights. ",textstyles.large_bold],[ layout.LEFTBUFFER, 100]],
        percep_labels,

    ];

    SlideNeuronA.drawText(textNeuronA);
    SlideNeuronA.drawTextButtons();

export const SlideNeuronA2 = new Slide();

    var percep_layers =new PIXI.Sprite(PIXI.Texture.from('images/percep_layers.png'));
        percep_layers.isSprite=true;

        percep_layers.x=layout.LEFTBUFFER + 150;
        percep_layers.y=100;

    var textNeuronA2 = [
        [percep_layers,["neurons are organized in layers"],[layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["we can have several hidden layers, but only one output layer"],[layout.LEFTBUFFER,layout.TOPBUFFER+100]]

    ];

    SlideNeuronA2.drawText(textNeuronA2);
    SlideNeuronA2.drawTextButtons();

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
        [["We also add in another number"+'\n'+" - called the"], [" bias  ", textstyles.ital], [layout.LEFTBUFFER,200]],
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

    var sigmoid=new PIXI.Sprite(PIXI.Texture.from('images/sigmoid_graph.png'));
    sigmoid.isSprite=true;
    sigmoid.x=layout.LEFTBUFFER;
    sigmoid.y=layout.TOPBUFFER+75;

    var textNeuron2c = [
        [ ["we plug that value from the last step into an"+'\n'], [" activation function", textstyles.ital],[" test"], [layout.LEFTBUFFER,layout.TOPBUFFER]],   
        [ sigmoid,["Right now, we're using the sigmoid function: "], [layout.LEFTBUFFER,layout.TOPBUFFER+50]],
        [ ["This squishes our output between 0 and 1"], [layout.LEFTBUFFER,layout.TOPBUFFER+400]],
    ];
    SlideNeuron2c.drawText(textNeuron2c);
    SlideNeuron2c.drawTextButtons();  

export const SlideNeuron2d = new Slide();
    SlideNeuron2d.largenet=1;

    SlideNeuron2d.slideNet=net_neuron;
    SlideNeuron2d.slideNet.update();
    SlideNeuron2d.draw_init_large(SlideNeuron2d.slideNet);

    var relu=new PIXI.Sprite(PIXI.Texture.from('images/relu_graph.png'));
    relu.isSprite=true;
    relu.x=layout.LEFTBUFFER;
    relu.y=layout.TOPBUFFER+75;

    var textNeuron2d = [
        [ ["Another activation function is called"+'\n'+"blah blah blah"],[" ReLU", textstyles.large_bold], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [ ["(which stands for",textstyles.medium],
          [" Re",textstyles.medium_bold],
          ["ctified",textstyles.medium],
          [" L",textstyles.medium_bold],
          ["inear",textstyles.medium],
          [" U",textstyles.medium_bold],
          ["nit)",textstyles.medium],
          [layout.LEFTBUFFER,layout.TOPBUFFER+50]],
          
        relu,
        [ ["this function returns 0 if the input is 0 or below, or returns the input if it's greater than 0."], [layout.LEFTBUFFER,200]],
    ];
    SlideNeuron2d.drawText(textNeuron2d);
    SlideNeuron2d.drawTextButtons();  

export const SlideNeuron2d2 = new Slide();
    SlideNeuron2d2.largenet=1;

    SlideNeuron2d2.slideNet=net_neuron;
    SlideNeuron2d2.slideNet.update();
    SlideNeuron2d2.draw_init_large(SlideNeuron2d2.slideNet);
    SlideNeuron2d2.drawActFnButtons();
    var textNeuron2d2 = [
        [ ["Use the buttons below to change the activation function"], [layout.LEFTBUFFER,layout.TOPBUFFER]],   
        [ ["why we need it"], [layout.LEFTBUFFER,layout.TOPBUFFER+200]],
    ];
    SlideNeuron2d2.drawText(textNeuron2d2);
    SlideNeuron2d2.drawTextButtons();  

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
    SlideNeuron2e.drawActFnButtons();
    

export const SlideNet1 = new Slide();
//SlideNet1.largenet=1;
var net1 = new Net();
SlideNet1.slideNet=net1;
net1.setNetData(fruits_small);
net1.setOutLayer();
net1.removeLayer();
net1.update();
SlideNet1.draw_init(net1);

var textNet1 = [
    [["Because we have 2 classes,"+'\n'+ "we need two final neurons in our output layer"], [layout.LEFTBUFFER+625,70]],
    [["when our image is a srawberry, we want THIS neuron to be 1 and THIS neuron to be 0"], [layout.LEFTBUFFER+625,90]],
    [["we'll call these our target values (draw target"], [layout.LEFTBUFFER+625,100]],
    [["because the target has to be between 0 and 1, we'll only use sigmoid for neurons in output layer"], [layout.LEFTBUFFER+625,120]],



 //   [["these are called"], [" output neurons", textstyles.ital], [layout.LEFTBUFFER+625,150]],
 //   [["these neurons give us the final answer "], [layout.LEFTBUFFER+625,200]],
 //   [["these neurons will always be the final layer, and will only use sigmoid act fn"], [layout.LEFTBUFFER+625,200]],
 //   [["(we'll talk about why later)"], [layout.LEFTBUFFER+625,200]],


];
SlideNet1.drawText(textNet1);
SlideNet1.drawTextButtons();
SlideNet1.drawActFnButtons(SlideNet1.slideNet);

export const SlideNet1b = new Slide();
    var net2 = new Net();

    SlideNet1b.slideNet=net2;

    net2.setNetData(net1.data);
    net2.setOutLayer();
    net2.update();
    SlideNet1b.draw_init(net2);    

    var textNet1b = [
        [["We can also add hidden layers to our nn."], [layout.LEFTBUFFER+625,70]],
    //    [["(These are called hidden layers.)"], [layout.LEFTBUFFER+625,90]],
     //   [["notice how the OUTPUT of one layer becomes the INPUT for the next layer"], [layout.LEFTBUFFER+625,90]],

    ];
    SlideNet1b.drawText(textNet1b);
    SlideNet1b.drawTextButtons();
    SlideNet1b.drawActFnButtons();

export const SlideNet1b2 = new Slide();
    var net3 = new Net();

    SlideNet1b2.slideNet=net3;
    net3.setNetData(net1.data);
    net3.setOutLayer();
    net3.update();

    SlideNet1b2.draw_init(net3);    
    SlideNet1b2.slideNet.getLayer(0).addNeuron();
    SlideNet1b2.slideNet.update();
    SlideNet1b2.draw_init(net3);    

    var textNet1b2 = [
        [["and add neurons to each hidden layer"], [layout.LEFTBUFFER+625,90]],
        [["notice how the OUTPUT of one layer becomes the INPUT for the next layer"], [layout.LEFTBUFFER+625,150]],

    ];
    SlideNet1b2.drawText(textNet1b2);
    SlideNet1b2.drawTextButtons();
    SlideNet1b2.drawActFnButtons();

    //SlideNet1b2.buttonContainer.getChildByName("buttonNeuronAddContainer").visible=true;

export const SlideNet1c = new Slide();
    SlideNet1c.slideNet=net3;
    SlideNet1c.draw_init(net3);    
    var textNet1c = [
        [["use these buttons to add layers"], [layout.LEFTBUFFER,70]],
        [["this process is called feedforward"], [layout.LEFTBUFFER+300,layout.TOPBUFFER+350]],

    ];
    SlideNet1c.drawText(textNet1c);
    SlideNet1c.drawTextButtons();
    SlideNet1c.drawActFnButtons();

    SlideNet1c.drawLayerButtons();
    SlideNet1c.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(0).visible=true;
    SlideNet1c.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(0).visible=true;


   // SlideNet1c.drawResetButton();

export const SlideNet1d = new Slide();
    var textNet1d = [
        [["now that we've built our network, we can begin training"], [layout.LEFTBUFFER,layout.TOPBUFFER]],
      //  [["basically, give training data, see how wrong our net is,"], [layout.LEFTBUFFER,layout.TOPBUFFER]],

    ];
    SlideNet1d.drawText(textNet1d);
    SlideNet1d.drawTextButtons();

export const SlideNet1e = new Slide();
    var textNet1e = [
        [ ["for each training data we give the net, we want to know how far it is from being correct"],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
        [ ["then, we can use this info to update our net to move closer to correct"],[layout.LEFTBUFFER,layout.TOPBUFFER] ],

        [ ["to do this, we use a cost formula (MSE img)"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
        [ ["essentially, for each output, subtract the answer we got from the net from the correct answer"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
        [ ["the goal of the nn is to make this value as SMALL as possible"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ]
    ];
   // var SlideNet1eGraph = new Graph(fruits_test3);
   // SlideNet1e.graphContainer.addChild(SlideNet1eGraph.getGraph());
    SlideNet1e.drawText(textNet1e);
    SlideNet1e.drawTextButtons();


export const SlideNet2 = new Slide();
    SlideNet2.slideNet=net1;
    net1.update();
    SlideNet2.draw_init(net1);

    var SlideNet2Graph = new Graph(net1.data);
    SlideNet2.slideContainer.addChild(SlideNet2Graph.getGraph());
    SlideNet2.drawActFnButtons();
    SlideNet2.drawLayerButtons();


    //SlideNet2.drawButtons(net1,SlideNet2Graph);
    //SlideNet2.setVis(SlideNet2.slideContainer.getChildAt(8),false);
  //  SlideNet2.slideContainer.getChildAt(8).getChildByName("addlayer").visible=true;
    //SlideNet2.slideContainer.getChildAt(8).getChildByName("remlayer").visible=true;

    var textNet2 = [
        [["p"], [layout.LEFTBUFFER+570,70]],
        [["pp"], [layout.LEFTBUFFER,70]],
        [["ppp"], [layout.LEFTBUFFER,90]],


    ];
    SlideNet2.drawText(textNet2);
    SlideNet2.drawTextButtons();

export const SlideNet3 = new Slide();
    SlideNet3.sandbox=true;
    SlideNet3.slideNet=net1;
    net1.setNetData(fruits_circle);

    net1.update();

    SlideNet3.drawStyleButtons();
    layout.NEURON_LEFTLIM=SlideNet3.buttonContainer.getChildByName("stylebox").x +450;
    SlideNet3.draw_init(net1);

    var SlideNet2Graph = new Graph(net1.data);
    SlideNet3.graphContainer.addChild(SlideNet2Graph.getGraph());
    //SlideNet3.drawButtons(net1,SlideNet2Graph);
    SlideNet3.setVis(SlideNet3.slideContainer.getChildAt(8),false);

    var textNet3 = [
        [["fffff"], [layout.LEFTBUFFER+570,70]],
    ];
    SlideNet3.drawText(textNet3);
    SlideNet3.drawTextButtons();
    SlideNet3.drawActFnButtons();
    SlideNet3.drawLayerButtons();
    SlideNet3.drawLearnButtons(SlideNet2Graph);
    SlideNet3.drawCost();
    SlideNet3.drawTarget();
   // SlideNet3.drawStyleButtons();
   layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_INIT;


//SANDBOX
export const SlideSandbox = new Slide();

var net = new Net();
SlideSandbox.slideNet=net;
/*

net.setNetData(fruits_circle);
net.setLearnRate(0.3);
net.getLayer(0).addNeuron();

net.setOutLayer();
net.update();
var g = new Graph(fruits_cir);
SlideSandbox.graphContainer.addChild(g.getGraph());
console.log(g.getGraph().y);
SlideSandbox.draw_init(net);
SlideSandbox.drawActFnButtons();
SlideSandbox.drawLayerButtons();

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
