import { Slide } from "./Slide.js"
import { layout } from "./layout.js";
import { Net } from "../Model/net.js"
import { actFns } from "../Model/neuron.js";
import {fruits, fruits_single} from "../Model/data.js"
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
          [layout.CX-400, layout.CY+100]],
    ];    
    SlideInstruct1.drawText(textInstruct1);

export const SlideInstruct2 = new Slide();
    var arrow1 =new PIXI.Sprite(PIXI.Texture.from('images/arrows/arrow1.png'));
    arrow1.isSprite=true;
    arrow1.scale.set(0.5);

    arrow1.x = window.innerWidth-350;
    arrow1.y = 80;
    SlideInstruct2.arrowContainer.addChild(arrow1)

    SlideInstruct2.SlideInstructLayers=true;
    var textInstruct2 = [    
        [ ["Here is the tool that I needed to learn about neural networks." + '\n' +
        "                                                          I hope it helps you! "], [layout.CX-400, layout.CY+100]],
        [ ["use these buttons to jump ahead to different sections"], [layout.CX-250, 150]],
        [ ["just want to play with a pre-built neural network? click SANDBOX"], [layout.CX-150, 200]],

    ];    
    SlideInstruct2.drawText(textInstruct2);





/****************     
 * 
 *    INTRO
 * 
 * **************/
export const SlideIntro1 = new Slide();

    var sorter =new PIXI.Sprite(PIXI.Texture.from('images/intro/sorter.png'));
        sorter.isSprite=true;
        sorter.anchor.set(0.5)
        sorter.x=layout.CX;
        sorter.y=layout.CY+100;

    var textIntro1= [
        sorter,
        [ ["As humans, we take our ability to recognize objects for granted. ",textstyles.large_bold], [layout.CX-400, layout.CY-170] ],
        [ ["Neural networks are a type of machine learning based on the human brain. "],[layout.CX-350, layout.CY-100] ],
        [ ["Some neural networks are trained to identify and classify data. "],[layout.CX-350, layout.CY-50] ],
    ];
    SlideIntro1.drawText(textIntro1);


export const SlideIntro2 = new Slide();

    var examples_labels=new PIXI.Sprite(PIXI.Texture.from('images/intro/examples_labels.png'));
        examples_labels.isSprite=true;
        examples_labels.scale.set(0.75);
        examples_labels.anchor.set(0.5);
        examples_labels.x=layout.CX+200;
        examples_labels.y=layout.CY;

    var textIntro2 = [
        [["In order to train our network, "+'\n'+"we need to give it some examples "+'\n'+"of data we want to classify."], [layout.CX-450, layout.CY-150]],
        [["Using our big human brains,"+'\n'+" we label these examples"+'\n'+" with the right answers. " ], [layout.CX-425, layout.CY-30]],
        [["The neural network uses these examples" +'\n'+ " to learn how to separate the data."],[layout.CX-480,layout.CY+100]],
        examples_labels
    ];

    SlideIntro2.drawText(textIntro2);

// TODO - MAKE LABELS SMALLER
export const SlideIntro3 = new Slide();
    var captcha=new PIXI.Sprite(PIXI.Texture.from('images/intro/captcha.png'));
        captcha.isSprite=true;
        captcha.scale.set(0.8);
        captcha.anchor.set(0.5)
        captcha.x=layout.CX-150;
        captcha.y=layout.CY+40;

    var textIntro3 = [
        [ captcha,["If you've ever had to solve a puzzle like this to get into a website..."], [layout.CX-400,layout.CY-190]],
        [ ["...you were probably helping label data" +'\n'+" to train a neural network."], [layout.CX, layout.CY+130]]
    ];

    SlideIntro3.drawText(textIntro3);
    SlideIntro3.drawTextButtons();

    export const SlideIntro1b = new Slide();
    var percep_blank =new PIXI.Sprite(PIXI.Texture.from('images/intro/percep_blank1.png'));
        percep_blank.isSprite=true;
        percep_blank.x=layout.CX-120;
        percep_blank.y=layout.CY-150;

    var textIntro1b= [percep_blank,
        [ ["Once our net is finished training, it will be able to sort"], [" unlabeled ", textstyles.ital ], ["data."],[layout.CX-450,layout.CY-185]],
        [["Here's a neural network that has learned to classify"+'\n'],
        ["     strawberries ", textstyles.default_red],
        ["and                               "],
        [" blueberries", textstyles.default_blue],
        [layout.CX-450,layout.CY-130]],
        [["Click on an image to feed it into the net.",textstyles.medium], [layout.CX-450, layout.CY-20] ],
    ];


    var strawx= layout.CX-320;
    var strawy= layout.CY;

    var bluex= layout.CX-460;
    var bluey=layout.CY;




    var inx= percep_blank.x+3;
    var iny = percep_blank.y+110;

    var singleblue =new PIXI.Sprite(PIXI.Texture.from('images/intro/singleblue.png'));
        singleblue.isSprite=true;
        singleblue.x=bluex;
        singleblue.y=bluey;
        singleblue.interactive=true;
        singleblue.buttonMode=true;
        singleblue.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singlestraw.x=strawx;
            singlestraw.y=strawy;

            await sleep(500);
           percep_blank.texture=PIXI.Texture.from('images/intro/percep_blue1.png')
        });


    var singlestraw =new PIXI.Sprite(PIXI.Texture.from('images/intro/singlestraw.png'));
        singlestraw.isSprite=true;
        singlestraw.x=strawx;
        singlestraw.y=strawy;
        singlestraw.interactive=true;
        singlestraw.buttonMode=true;
        singlestraw.on('click', async function(e){
            this.x=inx;
            this.y=iny;

            singleblue.x=bluex;
            singleblue.y=bluey;

            await sleep(500);
            percep_blank.texture=PIXI.Texture.from('images/intro/percep_straw1.png')
        });


    SlideIntro1b.drawText(textIntro1b);
    SlideIntro1b.textContainer.addChild(singleblue,singlestraw);

export const SlideIntro3a = new Slide();
    var example_blue=new PIXI.Sprite(PIXI.Texture.from('images/intro/input_example.png'));
        example_blue.isSprite=true;
        example_blue.scale.set(0.9);
        example_blue.anchor.set(0.5);


        example_blue.x= layout.CX+200;
        example_blue.y= layout.CY;

    var textIntro3a = [example_blue,
        [ ["First, how do we take an image" +'\n'+"and put it in terms a computer will understand?"], [layout.CX-370,layout.CY-175]],
        [ ["(That is, numbers)", textstyles.medium], [layout.CX-200,layout.CY-100]],

        [ ["Some neural networks"+'\n'+ "can identify images using their pixels. "], [layout.CX-300,layout.CY] ],
        [ ["For our neural network, we are going to assign " +'\n'+"some attributes that we think are important."], [layout.CX-380,layout.CY+100]],
    ];

    SlideIntro3a.drawText(textIntro3a);

export const SlideIntro4a = new Slide();
    var SlideIntroGraph = new Graph(fruits);
    SlideIntro4a.labelsContainer.addChild(SlideIntroGraph.getGraph());
    SlideIntro4a.labelsContainer.getChildByName("axis").scale.set(1.2);

    SlideIntro4a.labelsContainer.getChildByName("axis").x=layout.CX-400;
    SlideIntro4a.labelsContainer.getChildByName("axis").y=layout.CY-130;

      var textIntro4a = [
        [["Here's a graph of all our data. ",textstyles.large_bold], [layout.CX-400,layout.CY-190]],
      
        [["Because we have 2 inputs,"+'\n'+ "we can plot our data points on a 2-D graph."], [layout.CX,layout.CY-130]],
        [["The neural network is going to try to find the line" +'\n'+"that best separates the two classes."], [layout.CX,layout.CY-55]],
        [["If we have more than 2 inputs, the neural network " +'\n'+"will find the"], [" hyperplane                 ",textstyles.ital], 
            [" that separates them."], [layout.CX,layout.CY+20]],
        [["(though we can't visualize it with a graph.)", textstyles.medium], [layout.CX,layout.CY+90]],

        [["Now we can build our neural network.", textstyles.large_bold], [layout.CX,layout.CY+160]],

    ];
    SlideIntro4a.drawText(textIntro4a);


/****************     
 * 
 * 
 *    NEURON
 * 
 * **************/

export const SlideNeuronA = new Slide();

    var percep_blank2 =new PIXI.Sprite(PIXI.Texture.from('images/intro/percep_blank1.png'));
        percep_blank2.isSprite=true;

        percep_blank2.x=layout.LEFTBUFFER + 200;
        percep_blank2.y=110;

    var percep_labels =new PIXI.Sprite(PIXI.Texture.from('images/intro/percep_labels.png'));
        percep_labels.isSprite=true;

        percep_labels.x=percep_blank2.x;
        percep_labels.y=percep_blank2.y;

    var textNeuronA = [
        [["A neural network is made up of "], ["neurons",textstyles.large_bold],[" connected by "], ["weights. ",textstyles.large_bold],[ layout.LEFTBUFFER, layout.TOPBUFFER+10]],
        percep_blank2, percep_labels,

    ];

    SlideNeuronA.drawText(textNeuronA);
    SlideNeuronA.drawTextButtons();

export const SlideNeuronA2 = new Slide();

    var percep_layers =new PIXI.Sprite(PIXI.Texture.from('images/intro/percep_layers.png'));
        percep_layers.isSprite=true;

        percep_layers.x=layout.LEFTBUFFER + 200;
        percep_layers.y=110;

    var textNeuronA2 = [
        [percep_layers,["Neurons are organized in"], [" layers. ",textstyles.large_bold],[ layout.LEFTBUFFER+50, layout.TOPBUFFER+30]],
        [["Calculations happen in the hidden and output layers'"],[layout.LEFTBUFFER+700,layout.TOPBUFFER+100]],

        [["Though the output layer also gives us"+'\n'+" the net's 'final answer'"],[layout.LEFTBUFFER+700,layout.TOPBUFFER+200]],


        [["We can have several hidden layers,"+'\n'+" but only one output layer. "],[layout.LEFTBUFFER+700,layout.TOPBUFFER+350]]
      //  [["we can also add neurons to our hidden layers, but "],[layout.LEFTBUFFER,layout.TOPBUFFER+100]]

    ];

    SlideNeuronA2.drawText(textNeuronA2);
    SlideNeuronA2.drawTextButtons();


export const SlideNeuron1b = new Slide();
    var neuron_example3=new PIXI.Sprite(PIXI.Texture.from('images/intro/neuron_example3.png'));
        neuron_example3.scale.set(0.65);
        neuron_example3.anchor.set(0.5);

        neuron_example3.isSprite=true;
        neuron_example3.x=layout.CX+80;
        neuron_example3.y=layout.CY;

    var textNeuron1b = [
        neuron_example3,
        [ ["Here's a neuron. ", textstyles.large_bold], [ layout.CX-470, layout.CY-180]],
            [ ["A neuron takes in some inputs... " ], [ layout.CX-470, layout.CY-120] ],
            [ ["(each input is a single number)", textstyles.medium ], [ layout.CX-450, layout.CY-70] ],
            [ ["...some math happens... " ], [ neuron_example3.x-125, neuron_example3.y+150]],
            [ neuron_example3,["...and spits out a single output. " ], [ neuron_example3.x+110, layout.CY+60]],
    ];
    SlideNeuron1b.drawText(textNeuron1b);

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

    var neuron_large_over=new PIXI.Sprite(PIXI.Texture.from('images/net/neuronOver_large.png'));
        neuron_large_over.isSprite=true;
        neuron_large_over.anchor.set(0.5);
        neuron_large_over.x=layout.CX+320;
        neuron_large_over.y=layout.CY;

    var inputexample=new PIXI.Sprite(PIXI.Texture.from('images/intro/input_example.png'));
        inputexample.isSprite=true;
        inputexample.scale.set(0.7);
        inputexample.x= layout.CX-380;
        inputexample.y= layout.CY-170;
    //SlideNeuron2.slideContainer.addChild(inputexample);

    var textNeuron2 = [
        neuron_large_over,
        inputexample,
        [["We give our net one piece of data at a time."], [layout.CX-450,layout.CY-200]],
        [["The two values that we determined earlier"+'\n'+" become our "], ["inputs. ", textstyles.large_bold], [layout.CX-450,layout.CY+160]],
    ];

    SlideNeuron2.drawText(textNeuron2);
    SlideNeuron2.drawTextButtons();

//INTERACTIVE NEURON with WEIGHTS ONLY
export const SlideNeuron2b = new Slide();
    SlideNeuron2b.largenet=1;
    SlideNeuron2b.slideNet=net_neuron;
    SlideNeuron2b.slideNet.update();
    SlideNeuron2b.draw_init_large(SlideNeuron2b.slideNet);

    var neuron_large_actfncover=new PIXI.Sprite(PIXI.Texture.from('images/net/neuron_large_actfncover.png'));
        neuron_large_actfncover.isSprite=true;
        neuron_large_actfncover.anchor.set(0.5);
        neuron_large_actfncover.x=layout.CX+320;
        neuron_large_actfncover.y=layout.CY;

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

    var med = new PIXI.TextStyle({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontSize: 16,
    });

    var textNeuron2b = [
        [neuron_large_actfncover,["Each input is multiplied by a"],[" weight. ",textstyles.large_bold], [layout.CX-450,layout.CY-200]],
        [["Next, we take the sum of all those values. "], [layout.CX-450,layout.CY-145]],
       [["Finally, we add in another number"+'\n'+" - called the"], [" bias.  ", textstyles.large_bold], [layout.CX-450,layout.CY-95]],
        [["Hover your mouse over the weights." +'\n'+" Click to increase and decrease their values.",textstyles.instruct], [layout.CX-450,layout.CY-20]],
        [["orange ",orange], ["weights are negative"+'\n',med],
            [" blue ",blue], ["weights are positive",med], [layout.CX-350,layout.CY+50]],
        [["When we first create our net,"+'\n'+ "our weights are random numbers" +'\n' +"and our biases are 0."],[layout.CX-450,layout.CY+140]],


    
    ];

   // SlideNeuron2b.slideContainer.addChild(biascover);
    SlideNeuron2b.drawText(textNeuron2b);
    SlideNeuron2b.drawTextButtons();

//INTERACTIVE NEURON with ACTFN
export const SlideNeuron2c = new Slide();
    SlideNeuron2c.largenet=1;

    SlideNeuron2c.slideNet=net_neuron;
    SlideNeuron2c.slideNet.update();
    SlideNeuron2c.draw_init_large(SlideNeuron2c.slideNet);

    var sigmoid=new PIXI.Sprite(PIXI.Texture.from('images/intro/sigmoid_graph.png'));
    sigmoid.isSprite=true;
    sigmoid.scale.set(0.9)
    sigmoid.x=layout.CX-480;
    sigmoid.y=layout.CY-90;

    var textNeuron2c = [sigmoid,
        [ ["Next, we plug that last value into an "+'\n'], ["     activation function", textstyles.large_bold], [layout.CX-470,layout.CY-200]],   
        [ ["Right now, we're using the sigmoid function: "], [layout.CX-470,layout.CY-120]],
        [ ["This squishes our output between 0 and 1. "], [layout.CX-470,layout.CY+170]],
    ];
    SlideNeuron2c.drawText(textNeuron2c);
    SlideNeuron2c.drawTextButtons();  

export const SlideNeuron2d = new Slide();
    SlideNeuron2d.largenet=1;

    SlideNeuron2d.slideNet=net_neuron;
    SlideNeuron2d.slideNet.update();
    SlideNeuron2d.draw_init_large(SlideNeuron2d.slideNet);

    var relu=new PIXI.Sprite(PIXI.Texture.from('images/intro/relu_graph.png'));
    relu.isSprite=true;
    relu.scale.set(0.9)
    relu.x=layout.CX-480;
    relu.y=layout.CY-90;

    var textNeuron2d = [
       [ ["Another activation function is called a"+'\n'],[layout.CX-470,layout.CY-200]],
        [ [" Re",textstyles.large_bold],
          ["ctified"],
          [" L",textstyles.large_bold],
          ["inear"],
          [" U",textstyles.large_bold],
          ["nit                     "],
          [layout.CX-470,layout.CY-170]],
          [ ["Or"], [" ReLU ", textstyles.large_bold], ["for short"], [layout.CX-470,layout.CY-120]],

        relu,
       // [ ["this function returns 0 if the input is 0 or below, or returns the input if it's greater than 0."], [layout.LEFTBUFFER,200]],
    
    ];
    SlideNeuron2d.drawText(textNeuron2d);

export const SlideNeuron2d2 = new Slide();
    SlideNeuron2d2.largenet=1;

    SlideNeuron2d2.slideNet=net_neuron;
    SlideNeuron2d2.slideNet.update();
    SlideNeuron2d2.draw_init_large(SlideNeuron2d2.slideNet);
    SlideNeuron2d2.largefn=true;
    SlideNeuron2d2.drawActFnButtons();

    var textNeuron2d2 = [
        [ ["The activation function is important because"+'\n'+ "it makes the network"],[" non-linear.  ",textstyles.ital], [layout.CX-470,layout.CY-200]],
        [ ["This allows us to classify data" +'\n'+"that we can't separate with a straight line"], [layout.CX-470,layout.CY-120]],   

        [ ["Use these buttons to change"+'\n'+ "the activation function.",textstyles.instruct], [layout.CX-420,layout.CY-20]],   
    ];
    SlideNeuron2d2.drawText(textNeuron2d2);

    //INTERACTIVE NEURON with ACTFN - COVER
export const SlideNeuron2e = new Slide();
    SlideNeuron2e.largenet=1;

    SlideNeuron2e.slideNet=net_neuron;
    SlideNeuron2e.slideNet.update();
    SlideNeuron2e.draw_init_large(SlideNeuron2c.slideNet);

    SlideNeuron2e.neuronContainer.getChildAt(1).getChildAt(0).visible=true;

    var textNeuron2e = [
        [["The value we get" +'\n'+"after applying the activation function"+'\n'+"is the neuron's final output - "+'\n'],[layout.CX-470,layout.CY-200]],
//
       [["         also called its"], [" activation.  ", textstyles.large_bold],[layout.CX-470,layout.CY-120]],
        [["We can show a neuron's activation "+'\n'
        +"through its color - more active neurons" +'\n'+ "are a brighter yellow.", textstyles.instruct], [layout.CX-470,layout.CY]],
        [["Hover your mouse over the neuron" +'\n'+"to view the math.",textstyles.instruct], [layout.CX-470,layout.CY+100]],
        ];
    SlideNeuron2e.drawText(textNeuron2e);
    SlideNeuron2e.drawTextButtons();
    SlideNeuron2e.drawActFnButtons();
    

export const SlideNet1 = new Slide();
SlideNet1.leftnet=true;
//layout.NEURON_LEFTLIM=350;
//layout.NEURON_UPPERLIM=175;


var net1 = new Net();
SlideNet1.slideNet=net1;
net1.setNetData(fruits);
net1.setOutLayer();
net1.removeLayer();
net1.update();
SlideNet1.draw_init(net1);
//console.log(SlideNet1.slideContainer)

var textNet1 = [
    [["Because we have 2 classes,"+'\n'+ "we need two final neurons in our output layer. ", textstyles.large_bold], [layout.CX-470,layout.CY-170]],
    //[["Each output neuron corresponds to a different class."], [layout.LEFTBUFFER+500,170]],

    [["When our image is a"], [" blueberry", textstyles.default_blue], [", we want: "], [layout.CX,layout.CY-80]],
    [["This neuron to equal"], [" 0",textstyles.large_bold], [layout.CX+40,layout.CY-10]],
    [["This neuron to equal"], [" 1",textstyles.large_bold], [layout.CX+40,layout.CY+40]],
    [[" These are our"], [" target ", textstyles.large_bold], ["values."], [layout.CX+20,layout.CY+100]],
    [["Click the image to view another example.",textstyles.instruct], [layout.CX,layout.CY+150]],

    // USE THESE NEXT SLIDE!!!!!
  //  [["because the target has to be between 0 and 1,"+'\n'+" we'll only use sigmoid for neurons in output layer"], [layout.LEFTBUFFER+625,250]],
  //  [["This process of going from input -> output is called forward propogation"], [layout.LEFTBUFFER+425,350]],
];
SlideNet1.drawText(textNet1);
SlideNet1.drawTextButtons();
SlideNet1.drawActFnButtons(SlideNet1.slideNet);

export const SlideNet1b = new Slide();
    SlideNet1b.leftnet=true;
    var net2 = new Net();

    SlideNet1b.slideNet=net2;
    net2.setNetData(net1.data);
    net2.setOutLayer();
    net2.update();
    SlideNet1b.draw_init(net2);    

    var textNet1b = [
        [["We can add hidden layers to our neural network..."], [layout.CX+25,layout.CY-170]],
    ];
    SlideNet1b.drawText(textNet1b);
    SlideNet1b.drawTextButtons();
    SlideNet1b.drawActFnButtons();
    


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
        [["We can add hidden layers to our neural network..."], [layout.CX+25,layout.CY-170]],
        [["...and add neurons to each hidden layer."], [layout.CX+100,layout.CY-120]],
        [["Notice how the"], [" output ",textstyles.large_bold], ["of one layer "], [layout.CX+120,layout.CY-50]],
        [["becomes the"], [" input ",textstyles.large_bold], ["of the next "], [layout.CX+130,layout.CY]],
        [["This process of going from input    output"+'\n'+ "is called forward propogation"], [layout.CX+100,layout.CY+120]],

    ];
    SlideNet1b2.drawText(textNet1b2);
    SlideNet1b2.drawTextButtons();
    SlideNet1b2.drawActFnButtons();

export const SlideNet1c = new Slide();
//    layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_INIT;
//    layout.NEURON_UPPERLIM=layout.NEURON_UPPERLIM_INIT;

    SlideNet1c.slideNet=net3;
    SlideNet1c.draw_init(net3);    
    var textNet1c = [
        [["Use these buttons to add layers.", textstyles.instruct], [layout.CX-420,layout.CY-210]],
        [["Use these buttons" +'\n'+"to add neurons.", textstyles.instruct], [layout.CX-410,layout.CY-150]],


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
        [["Now that we've built our network, we can begin training it."], [layout.CX-250,layout.CY-120]],
        [["This is the stage where the neural network learns how to separate the data."], [layout.CX-350,layout.CY-70]],
        [["In order to learn, the network uses an algorithm called"], [" backpropogation.",textstyles.large_bold], [layout.CX-320,layout.CY-20]],

    ];
    SlideNet1d.drawText(textNet1d);
    SlideNet1d.drawTextButtons();

export const SlideNet1d2 = new Slide();
    var textNet1d2 = [
        [["Backpropogation has 3 steps:"], [layout.CX-450,layout.CY-200]],
        [["1. Forward propogation                                           " +'\n', textstyles.large_bold],
         [     "like we did before - give the net an input and calculate the output.  "], [layout.CX-380,layout.CY-120]],
        [["2. Error calculation                                                  " +'\n', textstyles.large_bold],
         [     "how far off were my actual output values from my target values?"], [layout.CX-380,layout.CY-20]],
         [["3. Update                                                                                               " +'\n', textstyles.large_bold],
         [     "adjust the weights and biases of the neural network to get closer to those target values. "], [layout.CX-380,layout.CY+80]],
     //    [ ["since we've already gone thru step 1, we can move on to..."],[layout.LEFTBUFFER,layout.TOPBUFFER] ],


    ];
    SlideNet1d2.drawText(textNet1d2);
    SlideNet1d2.drawTextButtons();









export const SlideError1 = new Slide();
    var costform = new PIXI.Sprite(PIXI.Texture.from('images/cost/costformwb.png'));
        costform.scale.set(0.8)
        costform.anchor.set(0.5)

        costform.isSprite=true;
        costform.x=layout.CX;
        costform.y=layout.CY-40;

        var ital_sm= new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontWeight: 400,
            fontSize: 18,
            fontStyle: 'italic'
        
          });

    var textError1 = [
        costform,
        [["We want to know how how far off the output of our net is from our target values."], [layout.CX-450,layout.CY-200]],
        [["To do this, we use a"],[" cost function.",textstyles.large_bold], [layout.CX-350,layout.CY-150]],

        [[" n = number of data points"+'\n'+" x = for each output neuron ",ital_sm], [layout.CX -300,layout.CY+40]],
        [["The activation of the output neurons depends on the current weights and biases of the network."], [layout.CX-450,layout.CY+120]],
        [["So, we can think of our cost function as a function of the weights and biases of the network. "], [layout.CX-450,layout.CY+170]],
    ];
    SlideError1.drawText(textError1);


export const SlideError3 = new Slide();
    var costgraph = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph.png'));
    costgraph.anchor.set(0.5)
    costgraph.isSprite=true;

    var costgraphx= layout.CX-230;
    var costgraphy= layout.CY+50;

    costgraph.x=costgraphx;
    costgraph.y=costgraphy;

    var textError3 = [
        costgraph,
        [["Let's look at a single weight."], [layout.CX-450,layout.CY-200]],
        [["Its relationship to the cost may look something like this."], [layout.CX-450,layout.CY-150]],
        [["We want to find the value of w "+'\n'+"that will make the cost the smallest.",textstyles.large_bold], [layout.CX+40,layout.CY-80]],
        [["While this may look like an easy task,"+'\n'+"the neural network will have multiple weights and biases," 
            +'\n'+"and therefore more than one variable affecting the cost", textstyles.medium], [layout.CX+40,layout.CY]],
        [["(We just quickly run out of dimensions to visualize it in.)", textstyles.medium], [layout.CX+40,layout.CY+90]],
    ];
    SlideError3.drawText(textError3);

export const SlideError4 = new Slide();
    var costgraph_point = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph_point.png'));
    costgraph_point.anchor.set(0.5)
    costgraph_point.isSprite=true;
    costgraph_point.x=costgraphx;
    costgraph_point.y=costgraphy;

    var nablaC = new PIXI.Sprite(PIXI.Texture.from('images/cost/nablaC.png'));
    nablaC.anchor.set(0.5)
    nablaC.scale.set(0.8)

    nablaC.isSprite=true;
    nablaC.x=layout.CX+70+185;
    nablaC.y=layout.CY+70+13;

    var textError4 = [
        costgraph_point,
        [["The neural network adjusts its weights and biases to minimize the cost using an algorithm called"+'\n'],["          gradient descent.", textstyles.large_bold], [layout.CX-450,layout.CY-180]],
        [["First, we find the current weight and cost."], [layout.CX+40,layout.CY-80]],
    //    [["Remember that the cost is averaged across all our data points", textstyles.medium], [layout.CX,layout.CY]],
        [["Next, we find the slope, or"], [" gradient "+'\n',textstyles.large_bold], ["of the graph at this point."], [layout.CX+40,layout.CY-20]],
        [["This is written as            "], [layout.CX+70,layout.CY+70]],
        nablaC,


    ];
    SlideError4.drawText(textError4);

export const SlideError5 = new Slide();
    var costgraph_slope = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph_slope1.png'));
        costgraph_slope.anchor.set(0.5)
        costgraph_slope.isSprite=true;
        costgraph_slope.x=costgraphx;
        costgraph_slope.y=costgraphy;


        var minnablaC = new PIXI.Sprite(PIXI.Texture.from('images/cost/minnablaC.png'));
            minnablaC.anchor.set(0.5)
            minnablaC.scale.set(0.8)

            minnablaC.isSprite=true;
            minnablaC.x=layout.CX+445;
            minnablaC.y=layout.CY-210+13;

        var minnablaC2 = new PIXI.Sprite(PIXI.Texture.from('images/cost/minnablaC.png'));
            minnablaC2.anchor.set(0.5)
            minnablaC2.scale.set(0.8)

            minnablaC2.isSprite=true;
            minnablaC2.x=layout.CX+40+165;
            minnablaC2.y=layout.CY-115+13;

        var lr = new PIXI.Sprite(PIXI.Texture.from('images/cost/lr.png'));
            lr.anchor.set(0.5)
            lr.scale.set(0.8)

            lr.isSprite=true;
            lr.x=layout.CX+195+165;
            lr.y=layout.CY-68+13

        var wnewform = new PIXI.Sprite(PIXI.Texture.from('images/cost/wnewform.png'));
            wnewform.anchor.set(0.5)
            wnewform.scale.set(0.7)

            wnewform.isSprite=true;
            wnewform.x=layout.CX+220;
            wnewform.y=layout.CY+160;

    var textError5 = [
        costgraph_slope,

        [["We want to move in the downhill direction, so              "], [layout.CX,layout.CY-210]],
        minnablaC,

        [["We find the magnitude of change           "
            +'\n\n'+ "by multiplying"+'\n\n'+ "by a value called the learning rate"], [layout.CX+40,layout.CY-160]],
        minnablaC2,
        [["This is a number we set beforehand -" +'\n'+"usually between 0 and 1.",textstyles.medium], [layout.CX+80,layout.CY-15]],
        lr,
        [["The final formula for updating our weight is:"], [layout.CX+40,layout.CY+65]],
        wnewform

    ];
    SlideError5.drawText(textError5);

export const SlideError6 = new Slide();
    var costgraph_slope2 = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph_slope2.png'));
        costgraph_slope2.anchor.set(0.5)
        costgraph_slope2.isSprite=true;
        costgraph_slope2.x=costgraphx;
        costgraph_slope2.y=costgraphy;
    var textError6 = [
        costgraph_slope2,
        [["We keep repeating these steps until our slope is 0."], [layout.CX+20,layout.CY-60]],
        [["Each time we calculate the cost and update our net"+'\n'+" is called an"],[" epoch.", textstyles.large_bold], [layout.CX+20,layout.CY]],
    ];
    SlideError6.drawText(textError6);

export const SlideError6a = new Slide();
    var costgraph_lrsmall = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph_lrsmall.png'));
        costgraph_lrsmall.anchor.set(0.5)
        costgraph_lrsmall.scale.set(0.8)
        costgraph_lrsmall.isSprite=true;
        costgraph_lrsmall.x=layout.CX-200;
        costgraph_lrsmall.y=layout.CY;

    var costgraph_lrlarge = new PIXI.Sprite(PIXI.Texture.from('images/cost/costgraph_lrlarge.png'));
        costgraph_lrlarge.anchor.set(0.5);
        costgraph_lrlarge.scale.set(0.8);
        costgraph_lrlarge.isSprite=true;
        costgraph_lrlarge.x=layout.CX+200;
        costgraph_lrlarge.y=layout.CY;


var textError6a = [
    costgraph_lrsmall,costgraph_lrlarge,
    [["The size of the learning rate is imporant."], [layout.CX-450,layout.CY-180]],
    [["Too small, and it will take "+'\n'+ "a long time to reach the minimum."], [layout.CX-350,layout.CY+150]],
    [["Too large, and we may end up"+'\n'+ " jumping past the minimum."], [layout.CX+50,layout.CY+150]]
];
SlideError6a.drawText(textError6a);

export const SlideError6b = new Slide();
    var fakelearnbox = new PIXI.Sprite(PIXI.Texture.from('images/boxes/learnbox.png'));
        fakelearnbox.isSprite=true;
        fakelearnbox.x= layout.CX-200;
        fakelearnbox.y= layout.CY+80; 
        fakelearnbox.scale.set(1.2);

    fakelearnbox.addChild(new Button("fakestep",PIXI.Texture.from('images/buttons/step.png'),212.5,60,true));
    fakelearnbox.addChild(new Button("fakelearn",PIXI.Texture.from('images/buttons/learn.png'),125,60,true));
    fakelearnbox.addChild(new Button("fakereset",PIXI.Texture.from('images/buttons/reset.png'),38,60,true));        



    var gotocalcx=layout.CX+250;
    var gotocalcy=layout.CY-80;
    var gotocalc=new Button("gotocalc",PIXI.Texture.from('images/buttons/calculus.png'), gotocalcx,gotocalcy,true);
    gotocalc.on('click', function(e){

            viewst.currentSlide=35;
            viewst.drawSlide();
        
    });
    SlideError6b.buttonContainer.addChild(gotocalc);

    var textError6b = [
    fakelearnbox,
    [["You've finished the tutorial!", textstyles.large_bold], [layout.CX-200,layout.CY-180]],
    [["Want to see the calculus behind gradient descent? click "], [layout.CX-400,layout.CY-100]],
    [["On the next slide is Sandbox mode - where we'll get to put all this to the test.",textstyles.large_bold], [layout.CX-455,layout.CY+10]],
    [["Click this button" +'\n'+ "to reset the net.",textstyles.medium], [layout.CX-400,layout.CY+100]],
    [["Click this button to"+'\n'+ "continuously backpropogate.",textstyles.medium], [layout.CX+150,layout.CY+80]],
    [["Click this button to"+'\n'+ " backpropogate 1 epoch.",textstyles.medium], [layout.CX+200,layout.CY+160]],

    // [["On the next slide is sandbox mode. Click this button to backpropogate for one epoch."+'/n'+" Click this button to continueously backpropogate. Click this button to reset the weights and biases."], [layout.CX-460,layout.CY+40]],


    ];
    SlideError6b.drawText(textError6b);



export const SlideError7 = new Slide();
SlideError7.fakenet=true;

    var netFin=new Net();
    SlideError7.slideNet=netFin;
    netFin.setNetData(fruits);
    netFin.setOutLayer();
    netFin.update();

    netFin.getLayer(0).addNeuron();
    netFin.getLayer(0).addNeuron();

    netFin.getLayer(0).getNeuron(0).setWeight(0,0.5);
    netFin.getLayer(0).getNeuron(0).setWeight(1,0.5);

    netFin.getLayer(0).getNeuron(1).setWeight(0,0.5);
    netFin.getLayer(0).getNeuron(1).setWeight(1,0.5);

    netFin.getLayer(0).getNeuron(2).setWeight(0,0.5);
    netFin.getLayer(0).getNeuron(2).setWeight(1,0.5);

    netFin.update();

    SlideError7.slideNet.setNetActFn(actFns.RELU);
    SlideError7.slideNet.update();

    var SlideErrorGraph = new Graph(fruits);
        SlideErrorGraph.axis.scale.set(1.2);

        SlideErrorGraph.axis.x=layout.CX-400;
        SlideErrorGraph.axis.y=layout.CY-130;

    SlideError7.labelsContainer.addChild(SlideErrorGraph.getGraph());

    for(var i=0;i<100;i++){
        SlideError7.slideNet.learn_batch();
        SlideError7.slideNet.update();
        SlideErrorGraph.updateGraph(SlideError7.slideNet,SlideErrorGraph);
    }

    var textError7 = [        
        [["We can visualize the neural network's learning using our graph.",textstyles.large_bold], [layout.CX-470,layout.CY-200]],
        [[" A blue square means the net will classify" +'\n'+" any data points in that region as blueberries."], [layout.CX,layout.CY-120]],
        [[" A red square means the same for strawberries."], [layout.CX,layout.CY-40]],
        [[" Darker colors mean the net is"+'\n'+" more confident in its classification."], [layout.CX,layout.CY+60]],
    ];
    SlideError7.drawText(textError7);


    export const SlideCredit = new Slide();
        SlideCredit.slidecredit=true;
        var textCredit = [
            [["Created by Allison George", textstyles.large_bold], [layout.CX-450,layout.CY-200]],
            [["feel free to email me at aegeorge@udel.edu"+'\n'+
            " or send me a tweet at @aegeorge42 "], [layout.CX-450,layout.CY-150]],

            [["Huge thanks to:"], [layout.CX-450,layout.CY-50]],
            [["3blue1brown                                             " +'\n', textstyles.large_bold],
            [     "    3blue1brown.com/lessons/neural-networks  "], [layout.CX-450,layout.CY]],
            [["Michael Nielsen                                        " +'\n', textstyles.large_bold],
            [     "    neuralnetworksanddeeplearning.com  "], [layout.CX-450,layout.CY+80]],
            [["If you're looking to go" +'\n'+"more in-depth into neural networks," +'\n'+"these are great resources.", textstyles.medium], [layout.CX+80,layout.CY+10]],

        ];
        SlideCredit.drawText(textCredit);































































/*



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
*/

export const SlideNet1e = new Slide();
    SlideNet1e.leftnet=true;
    layout.NEURON_UPPERLIM = window.innerHeight/2 -160;


    var nete = new Net();
    SlideNet1e.slideNet=nete;
    nete.setNetData(net1.data);
    nete.setOutLayer();
    nete.update();
    nete.removeLayer();
    nete.update();
    SlideNet1e.draw_init(nete);

    SlideNet1e.drawStyleButtons();
    SlideNet1e.drawRateButtons();

    SlideNet1e.buttonContainer.visible=false;
    

    var textNet1e = [
        [ [" Here's how the cost is calculated for one example."],[layout.CX-470,layout.CY-200] ],
        [ [" Reminder: click weights to change,"+'\n'+ " click image to see a new example",textstyles.instruct],[layout.CX-450,layout.CY+120] ],
        [ [" Notice how                    "+'\n'],[" changing the"],[" weights ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.CY-60] ],
        [ [" changes the"],[" output   ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.CY] ],
        [ [" which changes the"],[" cost ",textstyles.large_bold],[layout.NEURON_LEFTLIM+450,layout.CY+40] ],


       /*[ ["Notice how changing the weights " +'\n'+"of the neural network "+
            '\n'+"changes the output" +'\n'+"which changes the cost."],[layout.NEURON_LEFTLIM+470,layout.TOPBUFFER+100] ],
        */
    ];
   
    SlideNet1e.drawText(textNet1e);
    SlideNet1e.costSteps=true;
    SlideNet1e.drawCost_steps();

    layout.NEURON_UPPERLIM = window.innerHeight/2 -80;





/*********     CALCULUS    *********** */   
//layout.NEURON_X_DIF = 175;
//layout.NEURON_Y_DIF = 175;
//layout.NEURON_UPPERLIM = 190//window.innerHeight/2 -120   //150//window.innerHeight/2 -50 -100;
layout.NEURON_LEFTLIM = layout.NEURON_LEFTLIM_BACKPROP;
layout.NEURON_Y_DIF = 175;

//layout.NEURON_LEFTLIM = Math.max((window.innerWidth-1100)/2,15) +150;




export const SlideBackCalc0 = new Slide();

    var netBack0 = new Net();
    SlideBackCalc0.slideNet=netBack0;
    netBack0.setNetData(fruits_single);
    netBack0.setOutLayer();
    netBack0.checkInit();

    netBack0.update();

    SlideBackCalc0.backprop=true;
    SlideBackCalc0.backprop_init=true;
    SlideBackCalc0.backprop_labels=true;
    SlideBackCalc0.none=true;


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

    var a21example= new PIXI.Sprite(PIXI.Texture.from('images/backprop/a21.png'));
        a21example.isSprite=true;
        a21example.tint=0x000000;
        a21example.scale.set(1.4);
        a21example.x=layout.CX-70;
        a21example.y=layout.CY+60;

    var backpropx= layout.CX-40;

    SlideBackCalc0.backfromcalc=true;

    var textBackCalc0 = [
        a21example,
        [ ["First, we need to label each component of our net."],[backpropx,layout.CY-200] ],
        [ ["The output, or activation, of each neuron"+'\n'+ "is notated as"], [" a", a],[backpropx,layout.CY-150] ],
        [ ["However, we also need the value of the neuron" +'\n'+"prior to applying the activation function"], [backpropx,layout.CY-70] ],
        [ ["                            This value is "],[" z                ",z], [backpropx,layout.CY-12] ],
        [ ["The superscript denotes the layer number "], [backpropx+80,layout.CY+55] ],
        [ ["While the subscript denotes the neuron number "], [backpropx+80,layout.CY+120] ],


    ];    
    SlideBackCalc0.drawText(textBackCalc0);
    
export const SlideBackCalc1 = new Slide();
   
    SlideBackCalc1.slideNet=netBack0;

    SlideBackCalc1.backprop=true;
    SlideBackCalc1.backprop_labels=true;
    SlideBackCalc1.none=true;

    SlideBackCalc1.draw_init(netBack0);

 //   SlideBackCalc1.costSteps=true;
    SlideBackCalc1.drawCost();


    var backpropx_cost= layout.CX+80;

    var yimg=new PIXI.Sprite(PIXI.Texture.from('images/backprop/y.png'));
    yimg.isSprite=true;
    yimg.x=backpropx_cost-15;
    yimg.y=layout.CY-153;

    var C=new PIXI.Sprite(PIXI.Texture.from('images/backprop/C.png'));
    C.isSprite=true;
    C.scale.set(0.8);
    C.x=backpropx_cost-12;
    C.y=layout.CY-70;



    var textBackCalc1 = [
        [ ["We'll also need:"],[backpropx_cost,layout.CY-200] ],
        [ ["       : the target value"+'\n'+" for each output neuron"],[backpropx_cost,layout.CY-130] ],
        yimg,
        [ ["       : the cost for each output neuron," +'\n'+ "and the total cost of the net."],[backpropx_cost,layout.CY-50] ],
        C,

    ];    
    SlideBackCalc1.drawText(textBackCalc1);

export const SlideBackCalc2 = new Slide();

    SlideBackCalc2.slideNet=netBack0;
    SlideBackCalc2.backprop=true;
    SlideBackCalc2.backprop_labels=true;
    SlideBackCalc2.w3=true;

    SlideBackCalc2.draw_init(netBack0);
    SlideBackCalc2.drawCost();

    var arrowx=layout.CX-580;
    var arrowy=layout.CY-200;

    var w3toc= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3toc.png'));
        w3toc.isSprite=true;
        w3toc.x=arrowx;
        w3toc.y=arrowy;

    var dctot= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctot.png'));
        dctot.isSprite=true;
        dctot.x=backpropx_cost+100;
        dctot.y=layout.CY+30;

    var w3= new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3_teal.png'));
        w3.isSprite=true;
        w3.x=backpropx_cost+190;
        w3.y=layout.CY-180;

    var w32= new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3_teal.png'));
        w32.isSprite=true;
        w32.x=backpropx_cost+155;
        w32.y=layout.CY+5;


    var textBackCalc2 = [
        w3toc,
        [ ["What we want to know is:"],[backpropx_cost,layout.CY-200] ],
        [ ["How much does     "+'\n'+"influence the total cost?", textstyles.large_bold],[backpropx_cost,layout.CY-150] ],
        w3,
        [ ["This value is"], [backpropx_cost+20,layout.CY-50] ],

        [ ["the partial derivative of the cost "+'\n'+"with respect to   ",textstyles.ital],[backpropx_cost+20,layout.CY] ],
        w32,
        [ ["This is written as                "],[backpropx_cost,layout.CY+120] ],
        dctot,


       // [ ["Since w5 doesnt /directly/ affect cost, we need to break down this formula"],[backpropx_cost,layout.TOPBUFFER+150] ],
    ];    
    SlideBackCalc2.drawText(textBackCalc2);

export const SlideBackCalc2b = new Slide();
    SlideBackCalc2b.slideNet=netBack0;
    SlideBackCalc2b.backprop=true;
    SlideBackCalc2b.backprop_labels=true;
    SlideBackCalc2b.w3=true;


    SlideBackCalc2b.draw_init(netBack0);
    SlideBackCalc2b.drawCost();

    var w3toc= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3toc.png'));
        w3toc.isSprite=true;
        w3toc.x=arrowx;
        w3toc.y=arrowy;

    var w3= new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3_teal.png'));
    w3.isSprite=true;
    w3.x=backpropx_cost+125;
    w3.y=layout.CY-225;

    var dctot= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctot.png'));
    dctot.scale.set(0.7);
    dctot.isSprite=true;
    dctot.x=backpropx_cost+54;
    dctot.y=layout.CY-200;


    var nablaC = new PIXI.Sprite(PIXI.Texture.from('images/cost/nablaC.png'));
    nablaC.anchor.set(0.5)
    nablaC.scale.set(0.8)

    nablaC.isSprite=true;
    nablaC.x=backpropx_cost+270
    nablaC.y=layout.CY-90;

    var nablaC2 = new PIXI.Sprite(PIXI.Texture.from('images/cost/nablaC.png'));
    nablaC2.anchor.set(0.5)
    nablaC2.scale.set(0.7)

    nablaC2.isSprite=true;
    nablaC2.x=backpropx_cost+160
    nablaC2.y=layout.CY-40;

    var lr = new PIXI.Sprite(PIXI.Texture.from('images/cost/lr.png'));
        lr.anchor.set(0.5)
        lr.scale.set(0.8)
        lr.isSprite=true;
        lr.x=backpropx_cost+385;
        lr.y=layout.CY-40;

    var w3new = new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3new.png'));
        w3new.anchor.set(0.5)
        w3new.scale.set(0.8)
        w3new.isSprite=true;
        w3new.x=backpropx_cost+200;
        w3new.y=layout.CY+150;

    var textBackCalc2b = [
        w3toc,        
        [ ["To find our new         "],[backpropx_cost,layout.CY-200] ],
        w3,
        [ ["We calculate           for each of our datapoints." +'\n\n'+"then take the average to get   "],[backpropx_cost-20,layout.CY-150] ],
        [ ["We multiply            by the learning rate     "+'\n\n'+"   and subtract it from our current weight."],[backpropx_cost+25,layout.CY-50] ],
        [ ["Our final formula for our new weight is: "],[backpropx_cost+25,layout.CY+50] ],
        dctot,
        nablaC,
        nablaC2,
        lr,
        w3new


     
    ];    
    SlideBackCalc2b.drawText(textBackCalc2b);


export const SlideBackCalc3 = new Slide();
    SlideBackCalc3.slideNet=netBack0;
    SlideBackCalc3.backprop=true;
    SlideBackCalc3.backprop_labels=true;
    SlideBackCalc3.w3=true;


    SlideBackCalc3.draw_init(netBack0);
    SlideBackCalc3.drawCost();

    var w3all= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3all.png'));
    w3all.isSprite=true;
    w3all.x=arrowx;
    w3all.y=arrowy;


    var arrows= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows.png'));
        arrows.isSprite=true;
        arrows.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +90;
        arrows.y=layout.NEURON_UPPERLIM-110;

    var dctot_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctot.png'));
        dctot_small.isSprite=true;
        dctot_small.x=backpropx_cost+90;
        dctot_small.y=layout.CY-200-85;

    var dzdw3_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dxdy/dzdw3.png'));
        dzdw3_small.scale.set(0.85)
        dzdw3_small.anchor.set(0.5)
        dzdw3_small.isSprite=true;
        dzdw3_small.x=backpropx_cost+70;
        dzdw3_small.y=layout.CY-100+10;

    var w3=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3_teal.png'));
        w3.isSprite=true;
        w3.anchor.set(0.5)
        w3.scale.set(0.8);
        w3.x=backpropx_cost +270;
        w3.y=layout.CY-100+15;

    var z21=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z21.png'));
        z21.isSprite=true;
        z21.scale.set(0.6)
        z21.anchor.set(0.5)
        z21.x=backpropx_cost +355;
        z21.y=layout.CY-100+15;

    var dadz21_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dadz21.png'));
        dadz21_small.scale.set(0.85)
        dadz21_small.anchor.set(0.5)
        dadz21_small.isSprite=true;
        dadz21_small.x=backpropx_cost+70;
        dadz21_small.y=layout.CY+10;

    var a21=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a21.png'));
        a21.isSprite=true;
        a21.scale.set(0.6)
        a21.anchor.set(0.5)
        a21.x=backpropx_cost +270;
        a21.y=layout.CY+15;

    var z212=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z21.png'));
        z212.isSprite=true;
        z212.scale.set(0.6)
        z212.anchor.set(0.5)
        z212.x=backpropx_cost +355;
        z212.y=layout.CY+15;

    var dcda21_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda21.png'));
        dcda21_small.scale.set(0.85)
        dcda21_small.anchor.set(0.5)
        dcda21_small.isSprite=true;
        dcda21_small.x=backpropx_cost+70;
        dcda21_small.y=layout.CY+100+10;

        var a212=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a21.png'));
        a212.isSprite=true;
        a212.scale.set(0.6)
        a212.anchor.set(0.5)
        a212.x=backpropx_cost +270;
        a212.y=layout.CY+100+10;

        var ctot=new PIXI.Sprite(PIXI.Texture.from('images/backprop/ctot.png'));
        ctot.isSprite=true;
        ctot.scale.set(0.6)
        ctot.anchor.set(0.5)
        ctot.x=backpropx_cost +355;
        ctot.y=layout.CY+100+10;

    var textBackCalc3 = [
        w3all,
    //    arrows,   
    //    dcdw5,
        [ ["To calculate              we need:", textstyles.large_bold],[backpropx_cost,layout.CY-200] ],
        dctot_small,
        [ ["         (how much does       affect       ?)"],[backpropx_cost+50,layout.CY-100] ],
        dzdw3_small, w3,z21,
        [ ["         (how much does       affect       ?"],[backpropx_cost+50,layout.CY] ],
        dadz21_small, z212, a21,
        [ ["         (how much does       affect       ?)"],[backpropx_cost+50,layout.CY+100] ],
        dcda21_small, a212,ctot
    ];    
    SlideBackCalc3.drawText(textBackCalc3);

export const SlideBackCalc3a = new Slide();
    SlideBackCalc3a.slideNet=netBack0;
    SlideBackCalc3a.backprop=true;
    SlideBackCalc3a.backprop_labels=true;
    SlideBackCalc3a.w3=true;


    SlideBackCalc3a.draw_init(netBack0);
    SlideBackCalc3a.drawCost();

    var w3all= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3all.png'));
    w3all.isSprite=true;
    w3all.x=arrowx;
    w3all.y=arrowy;


    var arrows= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows.png'));
        arrows.isSprite=true;
        arrows.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +90;
        arrows.y=layout.NEURON_UPPERLIM-110;

    var dctot_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctot.png'));
      //  dctot_small.scale.set(0.5)
        dctot_small.isSprite=true;
        dctot_small.x=backpropx_cost+220;
        dctot_small.y=layout.CY-260;

    var dcdw3= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcdw3.png'));
    dcdw3.isSprite=true;
    dcdw3.scale.set(0.5)
    dcdw3.x=backpropx_cost+30;
    dcdw3.y=layout.CY-70;

    var textBackCalc3a = [
        w3all,
          dcdw3,    
          [ ["Using the calculus chain rule," +'\n'+"we multiply these values to get      "],[backpropx_cost,layout.CY-200] ],
          dctot_small,
          [ ["Now we can calculate "+'\n'+"each of these components."],[backpropx_cost+50,layout.CY+100] ],

      ];    
      SlideBackCalc3a.drawText(textBackCalc3a);

export const SlideBackCalc4 = new Slide();
    SlideBackCalc4.slideNet=netBack0;
    SlideBackCalc4.backprop=true;
    SlideBackCalc4.backprop_labels=true;
    SlideBackCalc4.w3=true;


    SlideBackCalc4.draw_init(netBack0);
    SlideBackCalc4.drawCost();

    var dz21dw3_form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dz21dw3_form.png'));
    dz21dw3_form.isSprite=true;
    dz21dw3_form.scale.set(0.7)
    dz21dw3_form.x=backpropx_cost;
    dz21dw3_form.y=layout.CY-150;

    var dzdw3arrow= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dzdw3arrow.png'));
    dzdw3arrow.isSprite=true;
    dzdw3arrow.x=layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +90;
    dzdw3arrow.y=layout.NEURON_UPPERLIM-110;

    var w3toz= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3toz.png'));
    w3toz.isSprite=true;
    w3toz.x=0;
    w3toz.y=50;

    var textBackCalc4 = [
        w3toz,
        dz21dw3_form,
    ];
    SlideBackCalc4.drawText(textBackCalc4);

export const SlideBackCalc5 = new Slide();
    SlideBackCalc5.slideNet=netBack0;
    SlideBackCalc5.backprop=true;
    SlideBackCalc5.backprop_labels=true;
    SlideBackCalc5.w3=true;


    SlideBackCalc5.draw_init(netBack0);
    SlideBackCalc5.drawCost();

    var ztoa= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/ztoa.png'));
    ztoa.isSprite=true;
    ztoa.x=0;
    ztoa.y=50;

    var da21dz_form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/da21dz_form.png'));
    da21dz_form.isSprite=true;
    da21dz_form.scale.set(0.7)
    da21dz_form.x=backpropx_cost;
    da21dz_form.y=layout.CY-210;

    var textBackCalc5 = [
        da21dz_form,ztoa,
        [ ["Note: this formula changes"+'\n'+"depending on the activation function."],[backpropx_cost,layout.CY+160] ],
    ];
    SlideBackCalc5.drawText(textBackCalc5);

export const SlideBackCalc6 = new Slide();
    SlideBackCalc6.slideNet=netBack0;
    SlideBackCalc6.backprop=true;
    SlideBackCalc6.backprop_labels=true;
    SlideBackCalc6.w3=true;


    SlideBackCalc6.draw_init(netBack0);
    SlideBackCalc6.drawCost();


    var a21toc= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/a21toc.png'));
    a21toc.isSprite=true;
    a21toc.x=arrowx;
    a21toc.y=arrowy;

    var dcda12_form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda12_form.png'));
    dcda12_form.isSprite=true;
    dcda12_form.scale.set(0.7)
    dcda12_form.x=backpropx_cost;
    dcda12_form.y=layout.CY-150;

    var textBackCalc6 = [
        a21toc,
        dcda12_form,
    ];
    SlideBackCalc6.drawText(textBackCalc6);

export const SlideBackCalc6a = new Slide();
    SlideBackCalc6a.slideNet=netBack0;
    SlideBackCalc6a.backprop=true;
    SlideBackCalc6a.backprop_labels=true;
    SlideBackCalc6a.w3=true;


    SlideBackCalc6a.draw_init(netBack0);
        SlideBackCalc6a.drawCost();
    //    SlideBackCalc6a.drawCost_steps();

    var dctotfinal_form= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctotfinal_form.png'));
    dctotfinal_form.isSprite=true;
    dctotfinal_form.scale.set(0.65)
    dctotfinal_form.x=backpropx_cost+20;
    dctotfinal_form.y=layout.CY-180;

    var w3all= new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w3all.png'));
    w3all.isSprite=true;
    w3all.x=arrowx;
    w3all.y=arrowy;


    var textBackCalc6a = [
        dctotfinal_form, w3all,
        [ ["Next, we'll see this example with numbers."],[backpropx_cost+20,layout.CY+170] ],
        //[ ["it may help to write down or take a screenshot of this page."],[backpropx_cost,layout.TOPBUFFER] ],

    ];
    SlideBackCalc6a.drawText(textBackCalc6a);
    




       /* var dark = new PIXI.Graphics();
        dark.drawRect(0,50,window.innerWidth,window.innerHeight);
        dark.alpha=0.5;
        SlideBackCalc7.graphContainer.addChild(dark);
        */


//INTERACTVE BACKPROP
//layout.NEURON_LEFTLIM =  Math.max((window.innerWidth-1100)/2,15) +250;
export const SlideBackCalc7 = new Slide();
    SlideBackCalc7.slideNet=netBack0;
    SlideBackCalc7.backprop=true;
    SlideBackCalc7.backprop_steps=true;
    SlideBackCalc7.w3=true;


    SlideBackCalc7.draw_init(netBack0);
    SlideBackCalc7.drawRateButtons();
    SlideBackCalc7.drawCost();




/*
    var dctot_final= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dctot_final.png'));
    dctot_final.isSprite=true;
    dctot_final.scale.set(0.5)
    dctot_final.x=backpropx_cost;
    dctot_final.y=100;

    var DZDW=100
    var DADZ=200;
    var DCDA=300;
   

   

    var dcda21_small= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda21.png'));
        dcda21_small.scale.set(0.45)
        dcda21_small.anchor.set(0.5)
        dcda21_small.isSprite=true;
        dcda21_small.x=backpropx_cost+10;
        dcda21_small.y=DCDA;
*/





    var textBackCalc7 = [
   //      dzdw5_small,dadz21_small,dcda21_small,
  //      [ ["DCDA"],[backpropx_cost,layout.TOPBUFFER] ],
    ];
    SlideBackCalc7.drawText(textBackCalc7);
    SlideBackCalc7.layernum=1;
    SlideBackCalc7.neuronnum=0;
    SlideBackCalc7.weightsnum=0;
    SlideBackCalc7.drawBackprop(1,0,0);
    SlideBackCalc7.drawLearnButtons();















// WEIGHT W1
export const SlideBackCalc8 = new Slide();

    SlideBackCalc8.slideNet=netBack0;
    SlideBackCalc8.backprop=true;
    SlideBackCalc8.backprop_labels=true;
    SlideBackCalc8.w1=true;

    var w1 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/w1_teal.png'));
    w1.isSprite=true;
    w1.x=800;
    w1.y=100;

    var dcdw1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcdw1.png'));
    dcdw1.isSprite=true;
    dcdw1.scale.set(0.7)
    dcdw1.x=backpropx_cost;
    dcdw1.y=150;


    var dz1dw1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dz1dw1.png'));
        dz1dw1.isSprite=true;
        dz1dw1.scale.set(0.5)
        dz1dw1.x=backpropx_cost;
        dz1dw1.y=300;

    var da1dz1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/da1dz1.png'));
    da1dz1.isSprite=true;
    da1dz1.scale.set(0.5)
    da1dz1.x=backpropx_cost;
    da1dz1.y=400;

    var w1all = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1all.png'));
    w1all.isSprite=true;
    w1all.x=arrowx;
    w1all.y=arrowy;

    var textBackCalc8 = [
        w1,dcdw1,
        dz1dw1,da1dz1, w1all,
        [ ["For      , the process is similar."],[backpropx_cost,layout.TOPBUFFER] ],
    ];

    SlideBackCalc8.drawText(textBackCalc8);
    SlideBackCalc8.draw_init(netBack0);
    SlideBackCalc8.drawCost();








export const SlideBackCalc9 = new Slide();
    SlideBackCalc9.slideNet=netBack0;
    SlideBackCalc9.backprop=true;
    SlideBackCalc9.backprop_labels=true;
    SlideBackCalc9.w1_all=true;

    var w1all = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1all.png'));
    w1all.isSprite=true;
    w1all.x=0;
    w1all.y=50;

    var dcda1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda11.png'));
        dcda1.isSprite=true;
        dcda1.x=700;
        dcda1.y=0;

    var a11 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/a11.png'));
        a11.isSprite=true;
        a11.scale.set(0.6)
        a11.x=700;
        a11.y=120;

    var a21 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/a21.png'));
    a21.isSprite=true;
    a21.scale.set(0.6)
    a21.x=850;
    a21.y=120;

    var a22 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/a22.png'));
    a22.isSprite=true;
    a22.scale.set(0.6)
    a22.x=900;
    a22.y=120;

    var c1 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/c1.png'));
    c1.isSprite=true;
    c1.scale.set(0.6)
    c1.x=850;
    c1.y=150;

    var c2 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/c2.png'));
    c2.isSprite=true;
    c2.scale.set(0.6)
    c2.x=900;
    c2.y=150;

    var w1toc = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1toc.png'));
    w1toc.isSprite=true;
    w1toc.x=0;
    w1toc.y=50;

    var dcda1_form1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda1_form1.png'));
    dcda1_form1.isSprite=true;
    dcda1_form1.scale.set(0.5)
    dcda1_form1.x=backpropx_cost;
    dcda1_form1.y=250;


    var textBackCalc9 = [
       // dcda1,dcda1f,
       dcda1_form1,w1toc,
       [ ["However, to find           , we need to break it down more"+'\n\n'+"since         affects both a1 and a2"+'\n\n'+"and therefore      and       "],[backpropx_cost,layout.TOPBUFFER] ],
       dcda1,a11,a21,a22,c1,c2,
    ];

    SlideBackCalc9.drawText(textBackCalc9);
    SlideBackCalc9.draw_init(netBack0);
    SlideBackCalc9.drawCost();


export const SlideBackCalc9b = new Slide();
    SlideBackCalc9b.slideNet=netBack0;
    SlideBackCalc9b.backprop=true;
    SlideBackCalc9b.backprop_labels=true;
    SlideBackCalc9b.w1_all=true;

    var w1toc_expand1 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1toc_expand1.png'));
    w1toc_expand1.isSprite=true;
    w1toc_expand1.x=0;
    w1toc_expand1.y=50;

    var dcda_form2= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda_form2.png'));
    dcda_form2.isSprite=true;
    dcda_form2.scale.set(0.5)
    dcda_form2.x=backpropx_cost;
    dcda_form2.y=50;



    var textBackCalc9b = [
      //  w1arrow2,
      //  w1arrow1,//dcda1_form1,
      w1toc_expand1, dcda_form2,
        [ ["9b"],[backpropx_cost,layout.TOPBUFFER] ],
    ];

    SlideBackCalc9b.drawText(textBackCalc9b);
    SlideBackCalc9b.draw_init(netBack0);
    SlideBackCalc9b.drawCost();



export const SlideBackCalc9a = new Slide();
SlideBackCalc9a.slideNet=netBack0;
SlideBackCalc9a.backprop=true;
SlideBackCalc9a.backprop_labels=true;
SlideBackCalc9a.w1_all=true;

    var w1arrows_all = new PIXI.Sprite(PIXI.Texture.from('images/backprop/w1arrows_all.png'));
    w1arrows_all.isSprite=true;
    w1arrows_all.x=0;
    w1arrows_all.y=50;

    var dcda1= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda1.png'));
        dcda1.isSprite=true;
        dcda1.scale.set(0.45)
        dcda1.x=backpropx_cost-100;
        dcda1.y=20;

    var w1toc_expand2 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1toc_expand2.png'));
    w1toc_expand2.isSprite=true;
    w1toc_expand2.x=0;
    w1toc_expand2.y=50;

    var dcda_form3= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda_form3.png'));
    dcda_form3.isSprite=true;
    dcda_form3.scale.set(0.4)
    dcda_form3.x=backpropx_cost;
    dcda_form3.y=50;

    var dcda1_full= new PIXI.Sprite(PIXI.Texture.from('images/backprop/formulas/dcda1_full.png'));
    dcda1_full.isSprite=true;
    dcda1_full.scale.set(0.4)
    dcda1_full.x=backpropx_cost;
    dcda1_full.y=380;

/*
    var dcda1f= new PIXI.Sprite(PIXI.Texture.from('images/backprop/dcda1f.png'));
    dcda1f.isSprite=true;
    dcda1f.scale.set(0.35)
    dcda1f.x=backpropx_cost-150;
    dcda1f.y=370;
*/
    var textBackCalc9a = [
      //  dcda1,//dcda1f,
     //  w1arrows_all,
     w1toc_expand2,dcda_form3,dcda1_full,
        [ ["49"],[backpropx_cost,layout.TOPBUFFER] ],
    ];

    SlideBackCalc9a.drawText(textBackCalc9a);
    SlideBackCalc9a.draw_init(netBack0);
    SlideBackCalc9a.drawCost();

export const SlideBackCalc9a2 = new Slide();
SlideBackCalc9a2.slideNet=netBack0;
SlideBackCalc9a2.backprop=true;
SlideBackCalc9a2.backprop_labels=true;
SlideBackCalc9a2.w1_all=true;
       
    
    var w1toc_expand2 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1toc_expand2.png'));
    w1toc_expand2.isSprite=true;
    w1toc_expand2.x=0;
    w1toc_expand2.y=50;

    var dcda1_full2= new PIXI.Sprite(PIXI.Texture.from('images/backprop/formulas/dcda1_full2.png'));
    dcda1_full2.isSprite=true;
    dcda1_full2.scale.set(0.4)
    dcda1_full2.x=backpropx_cost;
    dcda1_full2.y=50;

    
    var textBackCalc9a2 = [
        w1toc_expand2,dcda1_full2,
        [ ["Notice how we found    and     on the previous"],[backpropx_cost,layout.TOPBUFFER] ],
    ];
        
    SlideBackCalc9a2.drawText(textBackCalc9a2);
    SlideBackCalc9a2.draw_init(netBack0);
    SlideBackCalc9a2.drawCost();

export const SlideBackCalc9c = new Slide();
SlideBackCalc9c.slideNet=netBack0;
SlideBackCalc9c.backprop=true;
SlideBackCalc9c.backprop_labels=true;
SlideBackCalc9c.w1_all=true;
   

var w1toc_expand3 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/arrows/w1toc_expand3.png'));
w1toc_expand3.isSprite=true;
w1toc_expand3.x=0;
w1toc_expand3.y=50;

var dcdw1_full= new PIXI.Sprite(PIXI.Texture.from('images/backprop/formulas/dcdw1_full.png'));
dcdw1_full.isSprite=true;
dcdw1_full.scale.set(0.6)
dcdw1_full.x=backpropx_cost-150;
dcdw1_full.y=50;

        var textBackCalc9c = [
            w1toc_expand3,dcdw1_full,
          //  [ [""],[backpropx_cost,layout.TOPBUFFER] ],
        ];
    
        SlideBackCalc9c.drawText(textBackCalc9c);
        SlideBackCalc9c.draw_init(netBack0);
        SlideBackCalc9c.drawCost();


// INTERACTIVE
export const SlideBackCalc10 = new Slide();

   

    SlideBackCalc10.slideNet=netBack0;
    SlideBackCalc10.backprop=true;
    SlideBackCalc10.backprop_steps=true;
    SlideBackCalc10.w1_all=true;

    SlideBackCalc10.draw_init(netBack0);
    
    SlideBackCalc10.drawRateButtons();

    SlideBackCalc10.calc2sand=true;


    var textBackCalc10 = [

    ];
    SlideBackCalc10.drawText(textBackCalc10);
    SlideBackCalc10.layernum=0;
    SlideBackCalc10.neuronnum=0;
    SlideBackCalc10.weightsnum=0;
    SlideBackCalc10.drawBackprop(0,0,0);
    SlideBackCalc10.drawLearnButtons();
    SlideBackCalc10.drawCost();

    /*var clicknext = new PIXI.Text("click next to head to sandbox mode!", textstyles.default);
        clicknext.x=(window.innerWidth/2) +150;
        clicknext.y=window.innerHeight-(75/2);
        SlideBackCalc10.textbuttonContainer.addChild(clicknext);
    */

















































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
    layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_SANDBOX;
    layout.NEURON_Y_DIF = 125;

//    layout.NEURON_UPPERLIM=230;
//    layout.NEURON_X_DIF=150;
//    layout.NEURON_Y_DIF=125;

    SlideSandbox.slideNet.setNetActFn(actFns.RELU);
    SlideSandbox.slideNet.update();

    SlideSandbox.slideNet.checkInit();
    SlideSandbox.slideNet.update();


    SlideSandbox.draw_init(netSand);

    var SlideNet2Graph = new Graph(netSand.data);
    SlideSandbox.graphContainer.addChild(SlideNet2Graph.getGraph());

    SlideSandbox.drawActFnButtons();
    SlideSandbox.drawLayerButtons();
    SlideSandbox.drawLearnButtons(SlideNet2Graph);
    SlideSandbox.drawRateButtons();

    SlideSandbox.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(0).visible=true;
    SlideSandbox.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(0).visible=true;

    SlideSandbox.drawCost();
    SlideSandbox.drawDataButtons(SlideNet2Graph);
    var textsand = [    
        [ [""], [layout.CX-400, layout.CY+100]],
    ];    
    SlideSandbox.drawText(textsand);
    console.log(layout.NEURON_LEFTLIM)
