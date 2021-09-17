import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import { actFns } from "../Model/neuron.js";
import {fruits} from "../Model/data.js"
import {Graph} from "./Graph.js"
import {textstyles} from "./textstyles.js"
import { Button } from "./Button.js";
import {viewst} from "../Controller.js"


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// HOME
export const SlideHome = new Slide();

// INSTRUCTIONS
export const SlideInstruct1 = new Slide();
    var textInstruct1 = [    
        [ ["Here is the tool that I needed to learn about neural networks." + '\n' +
           "                                                          I hope it helps you! "], 
          [layout.LEFTBUFFER, layout.BOTTOMBUFFER-100]],
    ];    
    SlideInstruct1.drawText(textInstruct1);
    SlideInstruct1.drawTextButtons();

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

export const SlideInstruct2 = new Slide();
    var arrow1 =new PIXI.Sprite(PIXI.Texture.from('images/arrow1.png'));
    arrow1.isSprite=true;
    arrow1.scale.set(0.4);

    arrow1.x=layout.LEFTBUFFER + 800;
    arrow1.y=80;

    var textInstruct2 = [    
        arrow1,
        [ ["Here is the tool that I needed to learn about neural networks." + '\n' +
        "                                                          I hope it helps you! "], [layout.LEFTBUFFER, layout.BOTTOMBUFFER-100]],
        [ ["use these buttons to jump ahead to different sections"], [layout.LEFTBUFFER+300, layout.TOPBUFFER+100]],
        [ ["just want to play with a pre-built neural network? click here"], [layout.LEFTBUFFER+400, layout.TOPBUFFER+150]],

    ];    
    SlideInstruct2.drawText(textInstruct2);
    SlideInstruct2.drawTextButtons();

/****************     
 * 
 * 
 *    INTRO
 * 
 * **************/
export const SlideIntro1 = new Slide();

    var textIntro1= [
        [ ["As humans, we take our ability to recognize objects for granted. ",textstyles.large_bold], [layout.LEFTBUFFER+100, layout.TOPBUFFER+50] ],
        [ ["Neural networks are a type of machine learning based on the human brain. "],[layout.LEFTBUFFER+150, layout.TOPBUFFER+100] ],
        [ ["Some neural networks are trained to identify and classify data. "],[layout.LEFTBUFFER+150, layout.TOPBUFFER+150] ],
      //  [ ["This type of neural network is called a"], [" perceptron. ",textstyles.large_bold], [layout.LEFTBUFFER+200, layout.TOPBUFFER+250] ],
    ];
    SlideIntro1.drawText(textIntro1);
    SlideIntro1.drawTextButtons();

export const SlideIntro1a = new Slide();
/*    var percep_blank1 =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
    percep_blank1.isSprite=true;

    percep_blank1.x=layout.LEFTBUFFER + 250;
    percep_blank1.y=100;

    var textIntro1a= [
        [percep_blank1,  ["Here's a perceptron that has learned to classify"],
            [" strawberries ", textstyles.default_red],
            ["and"],
            [" blueberries", textstyles.default_blue],
            [".  "],
            [layout.LEFTBUFFER,100]]       
    ];

    SlideIntro1a.drawText(textIntro1a);
    SlideIntro1a.drawTextButtons();
*/

// INTRO - example percep - INTERACTIVE
export const SlideIntro1b = new Slide();
    var percep_blank =new PIXI.Sprite(PIXI.Texture.from('images/percep_blank.png'));
        percep_blank.isSprite=true;
        percep_blank.x=layout.LEFTBUFFER + 300;
        percep_blank.y=100;

    var textIntro1b= [percep_blank,
        [["Here's a neural network that has learned to classify"+'\n'],
        ["     strawberries ", textstyles.default_red],
        ["and                               "],
        [" blueberries", textstyles.default_blue],
        [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["Click on an image to feed it into the neural network. "], [layout.LEFTBUFFER, layout.TOPBUFFER+80] ],
    ];

    var textwid= 0

    var fruitx=layout.LEFTBUFFER
    var bluey=300;

    var fruitx=layout.LEFTBUFFER+50
    var strawy= layout.TOPBUFFER+100;



    var inx= percep_blank.x;
    var iny = percep_blank.y+142;

    var singleblue =new PIXI.Sprite(PIXI.Texture.from('images/singleblue.png'));
        singleblue.isSprite=true;
        singleblue.x=fruitx;
        singleblue.y=bluey;
        singleblue.interactive=true;
        singleblue.buttonMode=true;
        singleblue.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singlestraw.x=fruitx;
            singlestraw.y=strawy;

            await sleep(500);
           percep_blank.texture=PIXI.Texture.from('images/percep_blueb.png')
        });


    var singlestraw =new PIXI.Sprite(PIXI.Texture.from('images/singlestraw.png'));
        singlestraw.isSprite=true;
        singlestraw.x=fruitx;
        singlestraw.y=strawy;
        singlestraw.interactive=true;
        singlestraw.buttonMode=true;
        singlestraw.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=fruitx;
            singleblue.y=bluey;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/percep_strawb.png')
        });

    SlideIntro1b.inputContainer.addChild(singleblue,singlestraw);

    SlideIntro1b.drawText(textIntro1b);
    SlideIntro1b.drawTextButtons();

export const SlideIntro1c = new Slide();
    var textIntro1c= [
        [["So how does it work? ",textstyles.large_bold], [layout.LEFTBUFFER+200, layout.TOPBUFFER+50] ],
        [["There are two stages to implementing a neural network: "], [layout.LEFTBUFFER+200, layout.TOPBUFFER+50] ],
        [[" training and testing "], [layout.LEFTBUFFER+200, layout.TOPBUFFER+100] ],


       // [["First, we have to train our neural network."], [layout.LEFTBUFFER+200, layout.TOPBUFFER+100] ],
       // [["This is when the net learns to separate the data classes."], [layout.LEFTBUFFER+200, layout.TOPBUFFER+300] ],


    ];
    SlideIntro1c.drawText(textIntro1c);
    SlideIntro1c.drawTextButtons();

export const SlideIntro2 = new Slide();

    var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/examples_labels.png'));
        examples_labels.isSprite=true;
        examples_labels.scale.set(0.8);
        examples_labels.x=0;
        examples_labels.y=70;


    var textIntro2 = [
        [["In order to train our network, "+'\n'+"we need to give it some examples "+'\n'+"of data we want to classify."], [layout.LEFTBUFFER, layout.TOPBUFFER+50]],
        [["Using our big human brains,"+'\n'+" we label these examples"+'\n'+" with the right answers. " ], [layout.LEFTBUFFER, layout.TOPBUFFER+150]],
        [["The neural net uses these examples" +'\n'+ " to learn how to separate the data"],[layout.LEFTBUFFER,layout.TOPBUFFER+300]],
        examples_labels
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro2[0][0][0],textstyles.default).width;
  //  examples.x=layout.LEFTBUFFER+textwid +20;
    examples_labels.x=layout.LEFTBUFFER+textwid +80;

    SlideIntro2.drawText(textIntro2);
    SlideIntro2.drawTextButtons();

export const SlideIntro3 = new Slide();
    var captcha=new PIXI.Sprite(PIXI.Texture.from('images/captcha.png'));
    captcha.isSprite=true;
        captcha.x=layout.LEFTBUFFER+200;
        captcha.y=120;
        captcha.scale.set(0.8);


    var textIntro3 = [
        [ captcha,["If you've ever had to solve a puzzle like this to get into a website..."], [layout.LEFTBUFFER,80]],
        [ ["...you were probably helping label data to train a neural network"], [layout.LEFTBUFFER +500, 380]]
    ];

    SlideIntro3.drawText(textIntro3);
    SlideIntro3.drawTextButtons();

export const SlideIntro4 = new Slide();

    var examples_qm=new PIXI.Sprite(PIXI.Texture.from('images/examples_qm.png'));
        examples_qm.isSprite=true;
        examples_qm.scale.set(0.8);

        examples_qm.x=layout.LEFTBUFFER+50;
        examples_qm.y=80;

    var textIntro4 = [
       // examples1,
        [ ["Once our net is finished learning, "+'\n'+ "we'll give it some unlabeled data"+'\n'+
        "to test if it works."],[layout.LEFTBUFFER,200]],
        examples_qm
    ];

    var textwid= PIXI.TextMetrics.measureText(textIntro4[0][0][0],textstyles.default).width;
   // var textwid=0;
    examples_qm.x=examples_qm.x+textwid;


    SlideIntro4.drawText(textIntro4);
    SlideIntro4.drawTextButtons();

export const SlideIntro3a = new Slide();
    var example_blue_no=new PIXI.Sprite(PIXI.Texture.from('images/example_blue_attrib.png'));
        example_blue_no.isSprite=true;
        example_blue_no.x= layout.LEFTBUFFER;
        example_blue_no.y= 50;//(window.innerHeight/2);

    var example_blue_char=new PIXI.Sprite(PIXI.Texture.from('images/example1_label.png'));
        example_blue_char.isSprite=true;
        example_blue_char.x= layout.LEFTBUFFER
        example_blue_char.y= 50;


    var textIntro3a = [example_blue_no,
        [ ["how do we take an image and put it in terms the computer understand?"], [layout.LEFTBUFFER+350,100]],
        [ ["Some neural networks can classify images using their pixels. "], [layout.LEFTBUFFER+350,150] ],
        [ ["for our neural network, we are going to assign some attributes"+'\n'+"that we think are important."], [layout.LEFTBUFFER+350,250]],
      //  example_blue_char,
       // [ ["roundness is a score from 0-1 "+'\n'+"of how round the object looks", textstyles.medium], [layout.LEFTBUFFER+340,400]],
        [ ["This step is called"],[" data preprocessing.",textstyles.ital], [layout.LEFTBUFFER+400,340 ]],
      //  [ ["Now we're ready to start building our neural network.",textstyles.large_bold], [layout.LEFTBUFFER+350,400]]
    ];

   // textwid= PIXI.TextMetrics.measureText(textIntro3a[0][1][0],textstyles.default).width;


    SlideIntro3a.drawText(textIntro3a);
    SlideIntro3a.drawTextButtons();

export const SlideIntro4a = new Slide();
    var SlideIntroGraph = new Graph(fruits);
    SlideIntro4a.labelsContainer.addChild(SlideIntroGraph.getGraph());
    SlideIntro4a.labelsContainer.getChildByName("axis").scale.set(1.2);

    SlideIntro4a.labelsContainer.getChildByName("axis").x=layout.LEFTBUFFER
    SlideIntro4a.labelsContainer.getChildByName("axis").y=layout.TOPBUFFER+60;

      var textIntro4a = [
        [["Here's a graph of all our data. ",textstyles.large_bold], [layout.LEFTBUFFER,layout.TOPBUFFER+10]],
        [["Because we have 2 inputs, we can plot our data points on a 2-D graph"], [layout.LEFTBUFFER+400,150]],
        [["The neural network is going to try to find the line that separates the two classes."], [layout.LEFTBUFFER+400,200]],
        [["If we have more than 2 inputs, the neural network will find the /plane/ that separates them."], [layout.LEFTBUFFER+400,200]],
        [["though we can't visualize it with a graph."], [layout.LEFTBUFFER+400,250]],

        [["Now we're ready to start building out neural net."], [layout.LEFTBUFFER+400,400]],

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

        percep_blank2.x=layout.LEFTBUFFER + 200;
        percep_blank2.y=110;

    var percep_labels =new PIXI.Sprite(PIXI.Texture.from('images/percep_labels.png'));
        percep_labels.isSprite=true;

        percep_labels.x=layout.LEFTBUFFER + 200;
        percep_labels.y=110;

    var textNeuronA = [
        [percep_blank2,["A neural network is made up of "], ["neurons",textstyles.large_bold],[" connected by "], ["weights. ",textstyles.large_bold],[ layout.LEFTBUFFER, layout.TOPBUFFER+10]],
        percep_labels,

    ];

    SlideNeuronA.drawText(textNeuronA);
    SlideNeuronA.drawTextButtons();

export const SlideNeuronA2 = new Slide();

    var percep_layers =new PIXI.Sprite(PIXI.Texture.from('images/percep_layers.png'));
        percep_layers.isSprite=true;

        percep_layers.x=layout.LEFTBUFFER + 200;
        percep_layers.y=110;

    var textNeuronA2 = [
        [percep_layers,["Neurons are organized in"], [" layers. ",textstyles.large_bold],[ layout.LEFTBUFFER+50, layout.TOPBUFFER+30]],
        [["processing occurs in the hidden layers"+'\n'+"while the output layer gives us"+'\n'+" the net's 'final answer'"],[layout.LEFTBUFFER+700,layout.TOPBUFFER+200]],


        [["we can have several hidden layers,"+'\n'+" but only one output layer. "],[layout.LEFTBUFFER+700,layout.TOPBUFFER+350]]
      //  [["we can also add neurons to our hidden layers, but "],[layout.LEFTBUFFER,layout.TOPBUFFER+100]]

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
        neuron_example1,
        [ ["Here's a neuron. ", textstyles.large_bold], [ layout.LEFTBUFFER, 120]],
        [ ["A neuron takes in some inputs... " ], [ layout.LEFTBUFFER, 200] ],
        [ ["(each input is a single number)", textstyles.medium ], [ layout.LEFTBUFFER+20, 250] ],
    ];

    var textwid= PIXI.TextMetrics.measureText(textNeuron1[2][0][0],textstyles.default).width;
    neuron_example1.x=neuron_example_x+textwid;
    neuron_example2.x=neuron_example_x+textwid;
    neuron_example3.x=neuron_example_x+textwid;
    neuron_example0.x=neuron_example_x+textwid;

    SlideNeuron1.drawText(textNeuron1);
    SlideNeuron1.drawTextButtons();

export const SlideNeuron1a = new Slide();
    var textNeuron1a = [
        neuron_example2,
        [ ["Here's a neuron. ", textstyles.large_bold], [ layout.LEFTBUFFER, 120]],
        [ ["A neuron takes in some inputs... " ], [ layout.LEFTBUFFER, 200] ],
        [ ["(each input is a single number)", textstyles.medium ], [ layout.LEFTBUFFER+20, 250] ],
        [ ["...some math happens... " ], [ layout.LEFTBUFFER+500, 450]],
    ];

    SlideNeuron1a.drawText(textNeuron1a);
    SlideNeuron1a.drawTextButtons();

export const SlideNeuron1b = new Slide();
var textNeuron1b = [
    [ ["Here's a neuron. ", textstyles.large_bold], [ layout.LEFTBUFFER, 120]],
        [ ["A neuron takes in some inputs... " ], [ layout.LEFTBUFFER, 200] ],
        [ ["(each input is a single number)", textstyles.medium ], [ layout.LEFTBUFFER+20, 250] ],
        [ ["...some math happens... " ], [ layout.LEFTBUFFER+500, 450]],
        [ neuron_example3,["...and spits out a single output. " ], [ layout.LEFTBUFFER+760, 350]],
];
    SlideNeuron1b.drawText(textNeuron1b);
    SlideNeuron1b.drawTextButtons();

export const SlideNeuron1c = new Slide();




//INTERACTIVE NEURON
export const SlideNeuron2 = new Slide();
    SlideNeuron2.largenet=1;
    var net_neuron = new Net();
    net_neuron.removeLayer();
    SlideNeuron2.slideNet=net_neuron;

    const train_input2 = {
        input: [2,10],
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
    SlideNeuron2.slideNet.getLayer(0).getNeuron(0).bias=0.21;

    var neuron_large_over=new PIXI.Sprite(PIXI.Texture.from('images/neuron_large_over.png'));
        neuron_large_over.isSprite=true;
        neuron_large_over.anchor.set(0.5);
        neuron_large_over.x=layout.NEURON_LARGE_X;
        neuron_large_over.y=layout.NEURON_LARGE_Y;

    var inputexample=new PIXI.Sprite(PIXI.Texture.from('images/example_blue_attrib.png'));
        inputexample.isSprite=true;
        inputexample.scale.set(0.7);
        inputexample.x= layout.LEFTBUFFER+50;
        inputexample.y= 120;
    SlideNeuron2.slideContainer.addChild(inputexample);

    var textNeuron2 = [
        [neuron_large_over,["We give our network one piece of data at a time."], [layout.LEFTBUFFER,80]],
        [["The two values that we determined earlier"+'\n'+" become our inputs. "], [layout.LEFTBUFFER,465]],
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

    var orange = new PIXI.TextStyle({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontSize: 16,
        fill:0xFF5733

    });

    var blue = new PIXI.TextStyle({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontSize: 16,
        fill:0x344EE8
    });
    var textNeuron2b = [
        [neuron_large_actfncover,["Each input is multiplied by a weight. "], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["Next, we take the sum of all those values. "], [layout.LEFTBUFFER,layout.TOPBUFFER+50]],
        [["We also add in another number"+'\n'+" - called the"], [" bias  ", textstyles.large_bold], [layout.LEFTBUFFER,layout.TOPBUFFER+100]],
        [["Hover your mouse over the weights." +'\n'+" Click to increase and decrease their values.",textstyles.instruct], [layout.LEFTBUFFER,layout.TOPBUFFER+200]],
        [["orange ",orange], ["weights are negative;",textstyles.medium],
             [" blue ",blue], ["weights are positive",textstyles.medium], [layout.LEFTBUFFER+20,layout.TOPBUFFER+280]],

    
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
        neuron_large_actfncover2,
        [["Weights",textstyles.large_bold], [" tell us the importance of each input."], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["The"],[" bias ", textstyles.large_bold], ["changes the sensitivity of the neuron."], [layout.LEFTBUFFER,layout.TOPBUFFER+70]],

        [["To begin, our weights are random, "+ '\n' + "while our biases start at 0."],[layout.LEFTBUFFER,300]],
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
    sigmoid.y=layout.TOPBUFFER+110;

    var textNeuron2c = [
        [ ["Next, we plug that value from the last step into an"+'\n'], ["     activation function", textstyles.large_bold], [layout.LEFTBUFFER,layout.TOPBUFFER]],   
        [ sigmoid,["Right now, we're using the sigmoid function: "], [layout.LEFTBUFFER,layout.TOPBUFFER+80]],
        [ ["This squishes our output between 0 and 1. "], [layout.LEFTBUFFER,layout.TOPBUFFER+390]],
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
    relu.y=layout.TOPBUFFER+100;

    var textNeuron2d = [
       [ ["Another activation function is called a"+'\n'],[layout.LEFTBUFFER,layout.TOPBUFFER]],
        [ [" Re",textstyles.large_bold],
          ["ctified"],
          [" L",textstyles.large_bold],
          ["inear"],
          [" U",textstyles.large_bold],
          ["nit                     "],
          [layout.LEFTBUFFER,layout.TOPBUFFER+29]],
          [ ["Or"], [" ReLU ", textstyles.large_bold], ["for short"], [layout.LEFTBUFFER,layout.TOPBUFFER+80]],

        relu,
       // [ ["this function returns 0 if the input is 0 or below, or returns the input if it's greater than 0."], [layout.LEFTBUFFER,200]],
    
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
        [ ["why we need it"], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [ ["Use these buttons "+'\n'+"to change the activation function"], [layout.LEFTBUFFER,layout.TOPBUFFER+250]],   
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
        [["The value we get after applying the activation function"+'\n'+"     is the neuron's final output - "+'\n'],[layout.LEFTBUFFER-10,layout.TOPBUFFER]],

        [["                   also called its"], [" activation.                 ", textstyles.large_bold],[layout.LEFTBUFFER-10,layout.TOPBUFFER+60]],
        [["We can show a neuron's activation through its color - " + '\n'+
            " more active neurons are a brighter yellow.", textstyles.instruct], [layout.LEFTBUFFER-10,layout.TOPBUFFER+150]],
        [["Hover your mouse over the neuron" +'\n'+"to view the underlying math.",textstyles.instruct], [layout.LEFTBUFFER,layout.TOPBUFFER+240]],
        ];
    SlideNeuron2e.drawText(textNeuron2e);
    SlideNeuron2e.drawTextButtons();
    SlideNeuron2e.drawActFnButtons();
    

export const SlideNet1 = new Slide();
SlideNet1.leftnet=true;
layout.NEURON_LEFTLIM=350;
layout.NEURON_UPPERLIM=175;


var net1 = new Net();
SlideNet1.slideNet=net1;
net1.setNetData(fruits);
net1.setOutLayer();
net1.removeLayer();
net1.update();
SlideNet1.draw_init(net1);
//console.log(SlideNet1.slideContainer)

var textNet1 = [
    [["Because we have 2 classes,"+'\n'+ "we need two final neurons in our output layer. "], [layout.LEFTBUFFER,layout.TOPBUFFER]],
    [["when our image is a srawberry, we want " +'\n' +"THIS neuron to be 1 and "+'\n'+ "THIS neuron to be 0"], [layout.LEFTBUFFER+500,150]],
    [["Click the image to view another example.",textstyles.instruct], [layout.LEFTBUFFER+625,250]],

    // USE THESE NEXT SLIDE!!!!!
  //  [["because the target has to be between 0 and 1,"+'\n'+" we'll only use sigmoid for neurons in output layer"], [layout.LEFTBUFFER+625,250]],
  //  [["This process of going from input -> output is called forward propogation"], [layout.LEFTBUFFER+425,350]],
];
SlideNet1.drawText(textNet1);
SlideNet1.drawTextButtons();
SlideNet1.drawActFnButtons(SlideNet1.slideNet);
SlideNet1.slideContainer.getChildAt(5).visible=false; //costlabel

export const SlideNet1b = new Slide();
    SlideNet1b.leftnet=true;
    var net2 = new Net();

    SlideNet1b.slideNet=net2;
    net2.setNetData(net1.data);
    net2.setOutLayer();
    net2.update();
    SlideNet1b.draw_init(net2);    

    var textNet1b = [
        [["We can also add hidden layers to our nn."], [layout.LEFTBUFFER+625,70]],
    ];
    SlideNet1b.drawText(textNet1b);
    SlideNet1b.drawTextButtons();
    SlideNet1b.drawActFnButtons();
    SlideNet1b.slideContainer.getChildAt(5).visible=false; //costlabel


export const SlideNet1b2 = new Slide();
    SlideNet1b2.leftnet=1;


    var net3 = new Net();

    net3.setNetData(net1.data);
    net3.setOutLayer();

    var w000= net2.getLayer(0).getNeuron(0).getWeight(0);
    var w001= net2.getLayer(0).getNeuron(0).getWeight(1);
    var w100= net2.getLayer(1).getNeuron(0).getWeight(0);
    var w110= net2.getLayer(1).getNeuron(1).getWeight(0);

    var b00 =net2.getLayer(0).getNeuron(0).bias;
    var b10 =net2.getLayer(1).getNeuron(0).bias;
    var b11 =net2.getLayer(1).getNeuron(1).bias;

    net3.getLayer(0).getNeuron(0).setWeight(0,w000);
    net3.getLayer(0).getNeuron(0).setWeight(1,w001);
    net3.getLayer(1).getNeuron(0).setWeight(0,w100);
    net3.getLayer(1).getNeuron(1).setWeight(0,w110);

    net3.getLayer(0).getNeuron(0).setBias(b00);
    net3.getLayer(1).getNeuron(0).setBias(b10);
    net3.getLayer(1).getNeuron(1).setBias(b11);

    net3.update();

    SlideNet1b2.slideNet=net3;
    SlideNet1b2.draw_init(net3);    
    SlideNet1b2.slideNet.getLayer(0).addNeuron();
    SlideNet1b2.slideNet.update();
    SlideNet1b2.draw_init(net3);    

    var textNet1b2 = [
        [["and add neurons to each hidden layer"], [layout.LEFTBUFFER+625,90]],
        [["notice how the OUTPUT of one layer becomes the INPUT for the next layer"], [layout.LEFTBUFFER+625,150]],
        [["when we talk about the output of the whole net, we are talking about the outputs," 
        +"or activation, of the neurons in the output layer "], [layout.LEFTBUFFER+625,250]],

    ];
    SlideNet1b2.drawText(textNet1b2);
    SlideNet1b2.drawTextButtons();
    SlideNet1b2.drawActFnButtons();
    SlideNet1b2.slideContainer.getChildAt(5).visible=false; //costlabel


    //SlideNet1b2.buttonContainer.getChildByName("buttonNeuronAddContainer").visible=true;

export const SlideNet1c = new Slide();
    layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_INIT;
    layout.NEURON_UPPERLIM=layout.NEURON_UPPERLIM_INIT;


    SlideNet1c.slideNet=net3;
    SlideNet1c.draw_init(net3);    
    var textNet1c = [
        [["use these buttons to add layers"], [layout.LEFTBUFFER,70]],
       // [["this process is called forward propogation"], [layout.LEFTBUFFER+300,layout.TOPBUFFER+350]],

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
        [["Now that we've built our network, we can begin training it."], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["(this is what we mean when we say a neural network is 'learning'"], [layout.LEFTBUFFER,layout.TOPBUFFER+100]],
        [["In order to 'learn', the network uses an algorithm called"], [" backpropogation",textstyles.large_bold], [layout.LEFTBUFFER,layout.TOPBUFFER+200]],


    ];
    SlideNet1d.drawText(textNet1d);
    SlideNet1d.drawTextButtons();

export const SlideNet1d2 = new Slide();
    var textNet1d2 = [
        [["Backpropogation has 3 steps:"], [layout.LEFTBUFFER,layout.TOPBUFFER]],
        [["1. Forward propogation               " +'\n', textstyles.large_bold],
         [     "like we did before - give the net an input and calculate the output"], [layout.LEFTBUFFER,layout.TOPBUFFER+100]],
        [["2. Error calculation               " +'\n', textstyles.large_bold],
         [     "how far off were my actual output values from my target values"], [layout.LEFTBUFFER,layout.TOPBUFFER+200]],
         [["3. Update the Net              " +'\n', textstyles.large_bold],
         [     "adjust the weights and biases of the neural network to get closer to those target values"], [layout.LEFTBUFFER,layout.TOPBUFFER+300]],
     //    [ ["since we've already gone thru step 1, we can move on to..."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],


    ];
    SlideNet1d2.drawText(textNet1d2);
    SlideNet1d2.drawTextButtons();

export const SlideNet1d3 = new Slide();

var seformula=new PIXI.Sprite(PIXI.Texture.from('images/seformula.png'));
seformula.isSprite=true;
seformula.x=layout.LEFTBUFFER;
seformula.y=layout.TOPBUFFER+150;

var costgraph=new PIXI.Sprite(PIXI.Texture.from('images/costgraph.png'));
costgraph.isSprite=true;
costgraph.x=layout.LEFTBUFFER+500;
costgraph.y=layout.TOPBUFFER+75;

var small_ital = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontWeight: 400,
    fontSize: 18,
    fontStyle: 'italic'
});

var textNet1d3 = [
    

    [ [" Step 2: Error calculation",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
    [ ["For each piece of data we give the net, we want to know"+'\n'+ "how far off the output is from being correct."],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],

    [ seformula,["To do this, we use a"],[" cost formula: ",textstyles.ital],[layout.LEFTBUFFER,layout.TOPBUFFER+120] ],
    [ ["For each neuron in the output layer,"+'\n'+" subtract the target value from the actual output value", small_ital], [layout.LEFTBUFFER,layout.TOPBUFFER+350]],
  //  [ [" Our cost formula is a function that takes in the output and target values and returns the cost. "],[layout.LEFTBUFFER,layout.TOPBUFFER+350] ],
    //[ costgraph,["when we graph this formula, we can see that our output is minimized when actual and target are the same value"],[layout.LEFTBUFFER,layout.TOPBUFFER+200] ]


];
SlideNet1d3.drawText(textNet1d3);
SlideNet1d3.drawTextButtons();

export const SlideNet1d4 = new Slide();
    var seformula2=new PIXI.Sprite(PIXI.Texture.from('images/seformula.png'));
    seformula2.scale.set(0.6)
    seformula2.isSprite=true;
    seformula2.x=layout.LEFTBUFFER;//layout.NEURON_LEFTLIM+180;
    seformula2.y=layout.TOPBUFFER-25;

    var costgraph=new PIXI.Sprite(PIXI.Texture.from('images/costgraph.png'));
    costgraph.isSprite=true;
    costgraph.x=layout.LEFTBUFFER;
    costgraph.y=layout.TOPBUFFER+100;

    var textNet1d4 = [
        seformula2,
        [ ["The ultimate goal of the neural network"+'\n'+ " is to make the cost as small as possible.  ",textstyles.large_bold], [layout.LEFTBUFFER+450,layout.TOPBUFFER+100]],

        [ costgraph,["When we graph this formula, we can see that our output is minimized "+'\n'+" when our output and target values are the same. "],[layout.LEFTBUFFER +450,layout.TOPBUFFER+200] ]

    ];
SlideNet1d4.drawText(textNet1d4);

export const SlideNet1e = new Slide();
    SlideNet1e.leftnet=true;
    layout.NEURON_LEFTLIM=350;
    layout.NEURON_UPPERLIM=170;

    var nete = new Net();
    SlideNet1e.slideNet=nete;
    nete.setNetData(net1.data);
    nete.setOutLayer();
    nete.update();
    nete.removeLayer();
    nete.update();
    SlideNet1e.draw_init(nete)

    SlideNet1e.drawStyleButtons();
    SlideNet1e.drawRateButtons();

    SlideNet1e.costSteps=true;
    SlideNet1e.drawCost_steps();

    SlideNet1e.buttonContainer.visible=false;
    

    var textNet1e = [
        [ [" Here's how the cost is calculated for one example."],[layout.LEFTBUFFER,layout.TOPBUFFER+20] ],
        [ [" Reminder: click weights to change,"+'\n'+ " click image to see new example",textstyles.instruct],[layout.LEFTBUFFER,layout.TOPBUFFER+350] ],
        [ [" Notice how                      "+'\n'],[" changing the"],[" weights ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.TOPBUFFER+100] ],
        [ [" changes the"],[" output     ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.TOPBUFFER+162] ],
        [ [" which changes the"],[" cost ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.TOPBUFFER+200] ],


       /*[ ["Notice how changing the weights " +'\n'+"of the neural network "+
            '\n'+"changes the output" +'\n'+"which changes the cost."],[layout.NEURON_LEFTLIM+470,layout.TOPBUFFER+100] ],
        */
    ];
   
    SlideNet1e.drawText(textNet1e);
    SlideNet1e.drawTextButtons();

export const SlideBack1 = new Slide();

    /*var costformula1=new PIXI.Sprite(PIXI.Texture.from('images/seformula.png'));
        costformula1.isSprite=true;
        costformula1.scale.set(0.7)
        costformula1.x=layout.LEFTBUFFER;
        costformula1.y=layout.TOPBUFFER+20;*/

    var outputformula=new PIXI.Sprite(PIXI.Texture.from('images/outputformula.png'));
        outputformula.isSprite=true;
        outputformula.scale.set(0.8)
        outputformula.x=layout.LEFTBUFFER;
        outputformula.y=layout.TOPBUFFER+90;

    var textBack1 = [
       // costformula1,
        outputformula,
        [ ["The output is dependant on the weights and biases of the network.",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],

      //  [ [" Our cost formula is a function that takes in the output and target values and returns the cost. "],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
        [ ["We can also think of our neural network itself as a function - "+'\n'+" one that takes in all the weights and biases and returns an output."],[layout.LEFTBUFFER,layout.TOPBUFFER +50] ],
      //  [ [" output = f( [weights and biases] ) "],[layout.LEFTBUFFER,layout.TOPBUFFER+200] ],

   
    ];
    SlideBack1.drawText(textBack1);

export const SlideBack2 = new Slide();

    var outputformula1=new PIXI.Sprite(PIXI.Texture.from('images/outputformula.png'));
        outputformula1.isSprite=true;
        outputformula1.scale.set(0.8)
        outputformula1.x=layout.LEFTBUFFER;
        outputformula1.y=layout.TOPBUFFER+90;    

    var targetfunction=new PIXI.Sprite(PIXI.Texture.from('images/targetfunction.png'));
        targetfunction.isSprite=true;
        targetfunction.scale.set(0.8)
        targetfunction.x=layout.LEFTBUFFER;
        targetfunction.y=layout.TOPBUFFER+320;

    var costgraph_new=new PIXI.Sprite(PIXI.Texture.from('images/costgraph_new.png'));
        costgraph_new.isSprite=true;
        costgraph_new.x=layout.LEFTBUFFER;
        costgraph_new.y=layout.TOPBUFFER+100;

    var textBack2 = [
        outputformula1,
        targetfunction,
      //  costgraph_new,
      [ ["The output is dependant on the weights and biases of the network.",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],

        [ ["We can also think of our neural network itself as a function - "+'\n'+" one that takes in all the weights and biases and returns an output."],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
        [ ["There also exists a perfect combination of weights and biases" +'\n'+" that will give us our target values. "],[layout.LEFTBUFFER,layout.TOPBUFFER+280] ],
        //  [ [" What we want to do is find these ideal weights and biases "],[layout.LEFTBUFFER,layout.TOPBUFFER+150] ],
        //  [ [" so, we can rewrite our cost function like this: "],[layout.LEFTBUFFER,layout.TOPBUFFER+200] ],
        //  [ [" if our actual w and b = ideal w and b, our cost will be minimized "],[layout.LEFTBUFFER,layout.TOPBUFFER+250] ],

     //   [ [" this tells us that there exists a combination of w and b that will give us a cost of 0 ",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
      //  [ [" So, we know -the cost, - the actual w and b"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
       // [ [ " what we want to find i"]]
    ];
    SlideBack2.drawText(textBack2);

export const SlideBack3 = new Slide();
var costgraph_new=new PIXI.Sprite(PIXI.Texture.from('images/costgraph_new.png'));
costgraph_new.isSprite=true;
costgraph_new.x=layout.LEFTBUFFER;
costgraph_new.y=layout.TOPBUFFER+80;


    var textBack3 = [
        costgraph_new,
        [ ["Now we can rewrite our cost function using these terms.",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+20] ],
           /*   [ ["We know the cost and current weights and biases." + '\n'
            + " but we don't know the ideal weights and biases"],[layout.LEFTBUFFER+500,layout.TOPBUFFER+100] ],*/
        [ ["To minimize our cost, we want to adjust our actual weights and biases" +'\n'+" to be equal to the ideal weights and biases."],[layout.LEFTBUFFER+470,layout.TOPBUFFER+100] ],
        [ ["Some values will have to be decreased, others will have to be increased",textstyles.medium],[layout.LEFTBUFFER+470,layout.TOPBUFFER+170] ],

        [ ["However, we don't know what the ideal values are."],[layout.LEFTBUFFER+500,layout.TOPBUFFER+250] ],
        [ ["The net will have to use another algorithm to determine"] ,[" how  ",textstyles.ital],[layout.LEFTBUFFER+500,layout.TOPBUFFER+350] ],
        [ ["to update the weights and biases."],[layout.LEFTBUFFER+500,layout.TOPBUFFER+380] ],

    //    [ ["This tells us that our cost is dependant on the current weights and biases as well as the ideal weights and biases."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
    //    [ ["how do we find out ideal w and b?"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],

    ];
    SlideBack3.drawText(textBack3);

export const SlideNet1f = new Slide();

    var textNet1f = [
       // costgraph_point,
      //  mountain,
        [ [" Step 3: Update ",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
        [ [" To determine how to update the weights and biases, the neural network uses an algorithm called"],[layout.LEFTBUFFER,layout.TOPBUFFER+60]],
        [ [" gradient descent. ", new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontWeight: 600,
            fontSize: 35
          })],[layout.LEFTBUFFER,layout.TOPBUFFER+120]],

    /* [ [" Step 3: Update ",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
      [ [" The neural network can decrease the cost by changing the weights and biases of the neurons"],[layout.LEFTBUFFER,layout.TOPBUFFER+60] ],
      [ [" It figures out"], [" how ",textstyles.ital], ["to update these values through another algorithm called"],[layout.LEFTBUFFER,layout.TOPBUFFER+100] ],
      [ ["                         gradient descent", textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+135] ],
      /*[ ["There are 2 main types of gradient descent: ", textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+200] ],
      [ ["Stochastic gradient descent", textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+250] ],
      [ ["'Vanilla' gradient descent", textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER+300] ],
      */
  
    ];
  SlideNet1f.drawText(textNet1f);


export const SlideBackA = new Slide();
    /*var gd1=new PIXI.Sprite(PIXI.Texture.from('images/gd1.png'));
    gd1.isSprite=true;
    gd1.x=layout.LEFTBUFFER;
    gd1.y=200;*/

    var mountainx=layout.LEFTBUFFER-30;
    var mountainy=layout.TOPBUFFER+50;
    var mountainscale=0.9;

    var costgraph_point=new PIXI.Sprite(PIXI.Texture.from('images/costgraph_point1.png'));
    costgraph_point.isSprite=true;
    costgraph_point.x=mountainx;
    costgraph_point.y=mountainy;
    costgraph_point.scale.set(mountainscale);

    var textBackA = [
        costgraph_point,
        [ [" Step 3: Update - Gradient Descent",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
        [ [" We can plot our current cost as a point on our cost function."],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],

    
        //mountain
        /*
        gd1,
        [ [" Step 3: Update - Gradient Descent",textstyles.large_bold],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
        [ [" Imagine our current cost as a ball resting on the cost function"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
        [ [" In order to find the minimum of the cost function, we can roll the ball down the hill." ], [layout.LEFTBUFFER+100,layout.TOPBUFFER+150]],
    */
    ];

    SlideBackA.drawText(textBackA);

export const SlideNet2 = new Slide();
/*
    SlideNet2.slideNet=net1;
    net1.update();
    SlideNet2.draw_init(net1);

  //  var SlideNet2Graph = new Graph(net1.data);
  //  SlideNet2.graphContainer.addChild(SlideNet2Graph.getGraph());
    SlideNet2.drawActFnButtons();
    SlideNet2.drawLayerButtons();
   // SlideNet2.drawCost();


    //SlideNet2.drawButtons(net1,SlideNet2Graph);
    //SlideNet2.setVis(SlideNet2.slideContainer.getChildAt(8),false);
  //  SlideNet2.slideContainer.getChildAt(8).getChildByName("addlayer").visible=true;
    //SlideNet2.slideContainer.getChildAt(8).getChildByName("remlayer").visible=true;
*/
    var mountain=new PIXI.Sprite(PIXI.Texture.from('images/mountain0.png'));
        mountain.isSprite=true;
        mountain.x=mountainx;
        mountain.y=mountainy;
        mountain.scale.set(mountainscale)

    var textNet2 = [
        mountain,
        [ [" Imagine the cost function as a valley between two mountains," +'\n'+"and you're standing on that point."],[layout.LEFTBUFFER+580,layout.TOPBUFFER+50] ],
        [ [" You want to get to the bottom of the valley," +'\n'+"but it's too foggy to see."],[layout.LEFTBUFFER+580,layout.TOPBUFFER+130] ],
        [ [" How do you know which way to walk to get to the bottom?"],[layout.LEFTBUFFER+580,layout.TOPBUFFER+250] ],

    /*    [["In stochastic gradient descent, we feed in one piece of data, calculate the error, then update the net"], [layout.LEFTBUFFER,70]],
        [["In vanilla gradient descent, we feed in one piece of data and calculate the error, then continue to to this for each piece of data."+'\n'+
        " We take the average cost across all examples and update baesd on that"], [layout.LEFTBUFFER,270]],
*/
    ];
    SlideNet2.drawText(textNet2);
    SlideNet2.drawTextButtons();

export const SlideBackB = new Slide();

    var mountain1=new PIXI.Sprite(PIXI.Texture.from('images/mountain1.png'));
        mountain1.isSprite=true;
        mountain1.x=mountainx;
        mountain1.y=mountainy;
        mountain1.scale.set(mountainscale);

    var textBackB = [
        mountain1,
        [ [" By feeling the slope of the mountain at the point where you stand," +'\n'+"you can determine which way to walk to go downhill."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
    /*    [ [" Using calculus, we can find out how much each weight contributes to the overall cost"],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
        */
    ];

    SlideBackB.drawText(textBackB);

export const SlideBackC = new Slide();

    var mountain2=new PIXI.Sprite(PIXI.Texture.from('images/mountain2.png'));
        mountain2.isSprite=true;
        mountain2.x=mountainx;
        mountain2.y=mountainy;
        mountain2.scale.set(mountainscale);

    var textBackC = [
        mountain2,
    ];
    SlideBackC.drawText(textBackC);

export const SlideBackD = new Slide();
var mountain3=new PIXI.Sprite(PIXI.Texture.from('images/mountain3.png'));
        mountain3.isSprite=true;
        mountain3.x=mountainx;
        mountain3.y=mountainy;
        mountain3.scale.set(mountainscale);
    var textBackD = [
        mountain3,
        [ ["...until our slope is 0 and we're at the bottom."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],

    ];
    SlideBackD.drawText(textBackD);

export const SlideBackE = new Slide();
    var textBackE = [
       [ [" Gradient descent is just finding way to get to the minimum of our cost function."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
       [ [" Using calculus, we can find out exactly how much each weight and bias affects our cost at a certain point."],[layout.LEFTBUFFER,layout.TOPBUFFER+50] ],
       [ [" as well as if we should increase or decrease that specific weight to move our location on the cost function downhill"],[layout.LEFTBUFFER,layout.TOPBUFFER+100] ],
       [ ["formula: new weight = current weight * a(-deltaC)"],[layout.LEFTBUFFER,layout.TOPBUFFER+100] ],
       [ ["formula: w = w * a(-deltaC)"],[layout.LEFTBUFFER,layout.TOPBUFFER+100] ],


    ];
    SlideBackE.drawText(textBackE);

export const SlideBackF = new Slide();

    var gotocalc=new Button("gotocalc",PIXI.Texture.from('images/buttons/calculus.png'), 200,200,true);
    gotocalc.on('click', function(e){
        if (viewst.currentSlide!=35){

            viewst.currentSlide=35;
            viewst.drawSlide();
        }
    });
    SlideBackF.buttonContainer.addChild(gotocalc);


    var textBackF = [
        [ [" ....."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],
    ];
       
    SlideBackF.drawText(textBackF);









/*********     CALCULUS    *********** */   
layout.NEURON_X_DIF = 175;
layout.NEURON_Y_DIF = 175;
layout.NEURON_UPPERLIM = 175;
layout.NEURON_LEFTLIM = Math.max((window.innerWidth-1100)/2,15) +150;




export const SlideBackCalc0 = new Slide();

    var netBack0 = new Net();
    SlideBackCalc0.slideNet=netBack0;
    netBack0.setNetData(fruits);
    netBack0.setOutLayer();
    netBack0.getLayer(0).addNeuron();
    netBack0.update();

    SlideBackCalc0.backprop=true;
    SlideBackCalc0.backprop_labels=true;

    SlideBackCalc0.draw_init(netBack0);

    SlideBackCalc0.slideContainer.getChildAt(1).getChildByName("targetLabel0").visible=false;
    SlideBackCalc0.slideContainer.getChildAt(1).getChildByName("targetLabel1").visible=false;

    var a = new PIXI.TextStyle({
        fontFamily: 'Helvetica',
        fontWeight: 600,
        fontSize: 28,
        fill: 0x8900C4   
    });

    var z = new PIXI.TextStyle({
        fontFamily: 'Helvetica',
        fontWeight: 600,
        fontSize: 28,
        fill: 0x007015 
    });

    var backpropx= layout.LEFTBUFFER + layout.NEURON_LEFTLIM+layout.NEURON_X_DIF +50;
    var textBackCalc0 = [
        [ ["First, we need to label each component of our net."],[backpropx,layout.TOPBUFFER] ],
        [ ["The output, or activation, of each neuron"+'\n'+ "is notated as"], [" a", a],[backpropx,layout.TOPBUFFER+50] ],
        [ ["However, we also need the value of the neuron" +'\n'+"prior to applying the activation function"], [backpropx,layout.TOPBUFFER+125] ],
        [ ["This value is "],[" z       ",z], [backpropx+200,layout.TOPBUFFER+180] ],

    ];    
    SlideBackCalc0.drawText(textBackCalc0);
    
export const SlideBackCalc1 = new Slide();
   
    SlideBackCalc1.slideNet=netBack0;

    SlideBackCalc1.backprop=true;
    SlideBackCalc1.backprop_labels=true;
    SlideBackCalc1.draw_init(netBack0);

    SlideBackCalc1.costSteps=true;
    SlideBackCalc1.drawCost_steps();


    var backpropx_cost= layout.LEFTBUFFER + layout.NEURON_LEFTLIM+layout.NEURON_X_DIF +200;

    var textBackCalc1 = [
        [ ["We'll also need:"],[backpropx_cost,layout.TOPBUFFER] ],
        [ ["target value"],[backpropx_cost,layout.TOPBUFFER+50] ],

    ];    
    SlideBackCalc1.drawText(textBackCalc1);

export const SlideBackCalc2 = new Slide();

    SlideBackCalc2.slideNet=netBack0;
    SlideBackCalc2.backprop=true;
    SlideBackCalc2.backprop_labels=true;

    var i=1;
    var j=0;
    var k=0;
    var startx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF);
    var startyf = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
    var endx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
    var endy =  layout.NEURON_UPPERLIM + (k*layout.NEURON_Y_DIF);
    var hiliteWeight = 15;
    var hiliteColor = 0xb3e7ff

    var hilite = new PIXI.Graphics();
        hilite.lineStyle(hiliteWeight, hiliteColor);
        hilite.drawPolygon(startx, startyf, endx, endy);
    SlideBackCalc2.weightsContainer.addChild(hilite)

    SlideBackCalc2.draw_init(netBack0);
    SlideBackCalc2.costSteps=true;
    SlideBackCalc2.drawCost_steps();

    var arrow1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrow1.png'));
        arrow1.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +100;
        arrow1.y=layout.NEURON_UPPERLIM-160;
    SlideBackCalc2.labelsContainer.addChild(arrow1);

    var textBackCalc2 = [
        [ ["what I want to know is how much does W5"+'\n'+ " influence the cost"],[backpropx_cost,layout.TOPBUFFER] ],
        [ ["This value is the part der cost wrt w5 "],[backpropx_cost,layout.TOPBUFFER+70] ],
        [ ["write it as dcdw "],[backpropx_cost,layout.TOPBUFFER+100] ],

        [ ["Since w5 doesnt /directly/ affect cost, we need to break down this formula"],[backpropx_cost,layout.TOPBUFFER+150] ],
    ];    
    SlideBackCalc2.drawText(textBackCalc2);

export const SlideBackCalc3 = new Slide();
    SlideBackCalc3.slideNet=netBack0;
    SlideBackCalc3.backprop=true;
    SlideBackCalc3.backprop_labels=true;

    var hilite3 = new PIXI.Graphics();
        hilite3.lineStyle(hiliteWeight, hiliteColor);
        hilite3.drawPolygon(startx, startyf, endx, endy);
    SlideBackCalc3.weightsContainer.addChild(hilite3);
    SlideBackCalc3.draw_init(netBack0);

    SlideBackCalc3.costSteps=true;
    SlideBackCalc3.drawCost_steps();

    var arrows= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows.png'));
        arrows.isSprite=true;
        arrows.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +100;
        arrows.y=layout.NEURON_UPPERLIM-160;
    SlideBackCalc3.labelsContainer.addChild(arrows);

    var dcdwform= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcdwform.png'));
        dcdwform.isSprite=true;
        dcdwform.scale.set(0.7)
        dcdwform.x=backpropx_cost-50;
        dcdwform.y=350;


        // doing this messes up weight + box
        /*
        SlideBackCalc3.inputContainer.scale.set(0.8)
        SlideBackCalc3.labelsContainer.scale.set(0.8)
        SlideBackCalc3.neuronContainer.scale.set(0.8)
        SlideBackCalc3.weightsContainer.scale.set(0.8)
        */

    var textBackCalc3 = [
      //  arrows,
        dcdwform,
        [ ["we can break dcdw into:"],[backpropx_cost,layout.TOPBUFFER] ],
        [ ["1. how much does w5 affect z3"],[backpropx_cost,layout.TOPBUFFER+50] ],
        [ ["2. how much does z3 affect a3"],[backpropx_cost,layout.TOPBUFFER+100] ],
        [ ["3. how much does a3 affect cost"],[backpropx_cost,layout.TOPBUFFER+150] ],
        [ ["final formua"],[backpropx_cost,layout.TOPBUFFER+150] ],

        // NOTE TO SELF: WALK THRU EACH ONE SEPARATELY
    
    ];    
    SlideBackCalc3.drawText(textBackCalc3);

export const SlideBackCalc4 = new Slide();
    SlideBackCalc4.slideNet=netBack0;
    SlideBackCalc4.backprop=true;
    SlideBackCalc4.backprop_labels=true;

    var hilite4 = new PIXI.Graphics();
        hilite4.lineStyle(hiliteWeight, hiliteColor);
        hilite4.drawPolygon(startx, startyf, endx, endy);
    SlideBackCalc4.weightsContainer.addChild(hilite4);
    SlideBackCalc4.draw_init(netBack0);
    SlideBackCalc4.costSteps=true;
    SlideBackCalc4.drawCost_steps();

    var z3form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/z3form.png'));
        z3form.isSprite=true;
        z3form.scale.set(0.7)
        z3form.x=backpropx_cost;
        z3form.y=100;

    var dz3dwform= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dz3dwform.png'));
        dz3dwform.isSprite=true;
        dz3dwform.scale.set(0.7)
        dz3dwform.x=backpropx_cost;
        dz3dwform.y=200;

    var dzdwarrow= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dzdwarrow.png'));
        dzdwarrow.isSprite=true;
        dzdwarrow.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +100;
        dzdwarrow.y=layout.NEURON_UPPERLIM-160;

    var textBackCalc4 = [
        z3form, dz3dwform,dzdwarrow,
        [ ["DZDw"],[backpropx_cost,layout.TOPBUFFER] ],
    ];
    SlideBackCalc4.drawText(textBackCalc4);

export const SlideBackCalc5 = new Slide();
    SlideBackCalc5.slideNet=netBack0;
    SlideBackCalc5.backprop=true;
    SlideBackCalc5.backprop_labels=true;

    var hilite5 = new PIXI.Graphics();
        hilite5.lineStyle(hiliteWeight, hiliteColor);
        hilite5.drawPolygon(startx, startyf, endx, endy);
    SlideBackCalc5.weightsContainer.addChild(hilite5);
    SlideBackCalc5.draw_init(netBack0);
    SlideBackCalc5.costSteps=true;
    SlideBackCalc5.drawCost_steps();

    var a3form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/a3form.png'));
        a3form.isSprite=true;
        a3form.scale.set(0.7)
        a3form.x=backpropx_cost;
        a3form.y=100;

    var dadzform= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dadzform.png'));
        dadzform.isSprite=true;
        dadzform.scale.set(0.7)
        dadzform.x=backpropx_cost;
        dadzform.y=200;

    var dadzarrow= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dadzarrow.png'));
        dadzarrow.isSprite=true;
        dadzarrow.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +100;
        dadzarrow.y=layout.NEURON_UPPERLIM-160;

    var textBackCalc5 = [
        dadzform,dadzarrow,a3form,
        [ ["DADZ"],[backpropx_cost,layout.TOPBUFFER] ],
    ];
    SlideBackCalc5.drawText(textBackCalc5);

export const SlideBackCalc6 = new Slide();
    SlideBackCalc6.slideNet=netBack0;
    SlideBackCalc6.backprop=true;
    SlideBackCalc6.backprop_labels=true;

    var hilite6 = new PIXI.Graphics();
        hilite6.lineStyle(hiliteWeight, hiliteColor);
        hilite6.drawPolygon(startx, startyf, endx, endy);
    SlideBackCalc6.weightsContainer.addChild(hilite6);
    SlideBackCalc6.draw_init(netBack0);
    SlideBackCalc6.costSteps=true;
    SlideBackCalc6.drawCost_steps();


    var dcdaform= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcdaform.png'));
        dcdaform.isSprite=true;
        dcdaform.scale.set(0.7)
        dcdaform.x=backpropx_cost;
        dcdaform.y=200;

    var dcdaarrow= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcdaarrow.png'));
        dcdaarrow.isSprite=true;
        dcdaarrow.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +100;
        dcdaarrow.y=layout.NEURON_UPPERLIM-160;

    var ctotform= new PIXI.Sprite(PIXI.Texture.from('images/backprop/ctotform.png'));
    ctotform.isSprite=true;
    ctotform.scale.set(0.7)
    ctotform.x=backpropx_cost;
    ctotform.y=100;

    var textBackCalc6 = [
        dcdaform,dcdaarrow,ctotform,
        [ ["DCDA"],[backpropx_cost,layout.TOPBUFFER] ],
    ];
    SlideBackCalc6.drawText(textBackCalc6);
    
























































export const SlideSandbox = new Slide();
    var netSand=new Net();
    SlideSandbox.sandbox=true;
    SlideSandbox.slideNet=netSand;
    netSand.setNetData(fruits);
    netSand.setOutLayer();
    netSand.update();

    netSand.getLayer(0).addNeuron();
    netSand.getLayer(0).addNeuron();

    netSand.update();

    SlideSandbox.drawStyleButtons();
    layout.NEURON_LEFTLIM=460;
    layout.NEURON_UPPERLIM=230;
    layout.NEURON_X_DIF=150;
    layout.NEURON_Y_DIF=125;

    SlideSandbox.slideNet.setNetActFn(actFns.RELU);
    SlideSandbox.slideNet.update();

    SlideSandbox.draw_init(netSand);

    var SlideNet2Graph = new Graph(netSand.data);
    SlideSandbox.graphContainer.addChild(SlideNet2Graph.getGraph());
    SlideSandbox.setVis(SlideSandbox.slideContainer.getChildAt(8),false);

    SlideSandbox.drawActFnButtons();
    SlideSandbox.drawLayerButtons();
    SlideSandbox.drawLearnButtons(SlideNet2Graph);
    SlideSandbox.drawRateButtons();

    SlideSandbox.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(0).visible=true;
    SlideSandbox.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(0).visible=true;

    SlideSandbox.drawCost();
    SlideSandbox.drawDataButtons(SlideNet2Graph);


