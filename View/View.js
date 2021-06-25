//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,      
  maximumFractionDigits: 2,
});

const formatter_long = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,      
  maximumFractionDigits: 6,
});

const textStyle = new PIXI.TextStyle({
  fontFamily: 'Open Sans',
  fontWeight: 300,
  fontSize: 15
});



/*{
 ___________    _______________________________________________________
|button     |  | netContainer                                          |
|  Container|  |  ______________   ________________   ______________   |
|  ______   |  | |layerContainer| | weightCont    |  |layerContainer|  |                                                     |
| |Button|  |  | |  __________  | |  __________   |  |  __________  |  |                                       
| |______|  |  | | |neuronCont| | | |weight    |  |  | |neuronCont| |  |
|___________|  | | |__________| | | |__________|  |  | |__________| |  |                                           
 ___________   | |  __________  | |  __________   |  |              |  |
|input      |  | | |neuronCont| | | |weight    |  |  |              |  |
| Container |  | | |__________| | | |__________|  |  |              |  |  
|  ______   |  | |______________| |_______________|  |______________|  |
| |input |  |  |                                                       |
| |______|  |  |                                                       |
|___________|  |_______________________________________________________|         

}
*/

export class View{
  inputContainer; // inputs to draw
  buttonContainer; // all buttons to draw
  netContainer; //container of layercontainer (of neuroncontainer)
  slideContainer; //container of slides
  currentSlide;

  constructor(){
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xFFE180
    });
    document.body.appendChild(this.app.view);

    this.buttonContainer = new PIXI.Container();
    this.inputContainer = new PIXI.Container();
    this.netContainer = new PIXI.Container();

  }
    // load all images (it would be cool if this worked)
    /*
    PIXI.loader
    .add([
      "images/cat.png",
      "images/button.png",
      "images/treasure.png",
      "images/circle.png",
      "images/button_down.png"
    ])
    .load(this.pixisetup);
  }

  pixisetup(){
    console.log("ready 2 go")
  }
  */

  //add buttons to list
  addButtons(){
    //make all the buttons
    var button_input = new Button("b_in",PIXI.Texture.from('images/buttons/button_setin.png'),200,100);
    var button_addlayer = new Button("b_addlayer",PIXI.Texture.from('images/buttons/button_layer.png'),100,50);
    var button_removelayer = new Button("b_remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'),100,110);

    var button_addn0 = new Button("b_addn0",PIXI.Texture.from('images/buttons/button_addneuron.png'),300,50);
    var button_remn0 = new Button("b_remn0",PIXI.Texture.from('images/buttons/button_removeneuron.png'),300,100);

    var button_addn1 = new Button("b_addn1",PIXI.Texture.from('images/buttons/button_addneuron.png'),420,50);
    var button_remn1 = new Button("b_remn1",PIXI.Texture.from('images/buttons/button_removeneuron.png'),420,100);

    var button_addn2 = new Button("b_addn2",PIXI.Texture.from('images/buttons/button_addneuron.png'),540,50);
    var button_remn2 = new Button("b_remn2",PIXI.Texture.from('images/buttons/button_removeneuron.png'),540,100);

    var button_addf = new Button("b_addf",PIXI.Texture.from('images/buttons/button_next.png'),100,175);
    var button_actfn_linear= new Button("b_actfn_linear",PIXI.Texture.from('images/buttons/button_linear.png'),100,250)
    var button_actfn_binstep= new Button("b_actfn_binstep",PIXI.Texture.from('images/buttons/button_binstep.png'),100,300)

    //add all the buttons
    this.buttonContainer.addChild(button_input, button_addlayer, button_removelayer,
      button_addn0, button_remn0,
      button_addn1, button_remn1,
      button_addn2, button_remn2,
      button_addf,button_actfn_binstep,button_actfn_linear);
  }

  setup_buttons(){
    this.addButtons();
    this.drawButtons();
    this.buttonContainer.getChildByName("b_addn1").visible = false;
    this.buttonContainer.getChildByName("b_remn1").visible = false;
    this.buttonContainer.getChildByName("b_addn2").visible = false;
    this.buttonContainer.getChildByName("b_remn2").visible = false;
  }

  //add a single button
  addButton(name,textureimg, x, y){
    var newb = new Button(name,PIXI.Texture.from(textureimg),x,y)
    this.buttonContainer.addChild(newb);
    this.app.stage.addChild(newb);
  }

  drawButtons(){    
    this.app.stage.removeChild(this.buttonContainer);
    this.app.stage.addChild(this.buttonContainer);
  }

  draw(net){
    //clear the old stuff
    this.netContainer.removeChildren();
    
    //for each layer
    for(var i = 0; i<net.layers.length; i++){
  
      //create layercontainer + add to netcontainer
      var layerContainer = new PIXI.Container();
      this.netContainer.addChild(layerContainer);

      var biasSprite = new PIXI.Text(formatter.format(net.getLayer(i).layerBias));
        biasSprite.x=(i*120)+250;
        biasSprite.y=120;

      layerContainer.addChild(biasSprite);

      //for each neuron
      for(var j = 0; j<net.getLayer(i).neurons.length; j++){

        //create neuroncontainer (+neuroncontainer stuff) + add to layercontainer
        var neuronContainer = new PIXI.Container();
          neuronContainer.x=(i*120)+250;
          neuronContainer.y=j*120+150;

        var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          //neuronBase.tint = 0xa8ff05;

        var innerText = new PIXI.Text(
          "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
         + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
         + "b: " + formatter_long.format(net.getLayer(i).layerBias) +'\n'
         + "o: " + formatter_long.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
         + formatter_long.format(net.getLayer(i).neurons[j].output) + '\n',
          textStyle)
          innerText.x=15;
          innerText.y=0;

        var neuronOutText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
          neuronOutText.x=25;
          neuronOutText.y=25;

        //overneuron has to be the interactive since it's on top
        //also layerwise:  neuroncontainer [ [neuronBase] [innerText] [overneuron [outtext]] ]
        var overNeuron = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          overNeuron.tint=0x2003fc;
          overNeuron.interactive=true;

          overNeuron.on('mouseover', function(e){
            this.alpha=0;
          })

          overNeuron.on('mouseout', function(e){
            this.alpha=1;
          })

        overNeuron.addChild(neuronOutText);
        
        neuronContainer.addChild(neuronBase);
        neuronContainer.addChild(innerText);
//        neuronContainer.addChild(overNeuron);     // PUT ME BACK LATER

        //add neurons to layer
        layerContainer.addChild(neuronContainer);
      }

    var outputContainer = new PIXI.Container();
    this.netContainer.addChild(outputContainer);

    //TARGETS
    var outText = new PIXI.Text("target"+'\n'+"out"+'\n'+ "error"+'\n'+"delta", textStyle)
      outText.x=170;
      outText.y=380;
    outputContainer.addChild(outText);

    //errors
    for(var k=0; k<net.target.length; k++){
      var outText = new PIXI.Text(net.target[k] + '\n'
      + formatter_long.format(net.netOut[k]) + '\n'
      + formatter_long.format(net.error[k]) + '\n'
      + formatter_long.format(net.delta[k]), textStyle)
        outText.x=250;
        outText.y=380;
//        outText.y=15*k +400;
      outputContainer.addChild(outText);
    }

    //total error
    var outText = new PIXI.Text("Etot"+' \n' + formatter_long.format(net.eTot), textStyle)
      outText.x=200;
      outText.y=460;
    outputContainer.addChild(outText);
    }

    //add net to screen
    this.app.stage.addChild(this.netContainer);
  }

  clear(net){
    this.app.stage.removeChild(this.netContainer);
  }

  //rounds number to 2 decimal places
  formatList(list){
    var nums2print =[];
    for(var n=0; n<list.length; n++){
      nums2print.push(formatter_long.format(list[n]));
    }
    return nums2print;
  }

  addInputs(inputs){
    this.inputContainer.x=160;
    this.inputContainer.y=150;

    this.inputContainer.removeChildren();

    for(var i = 0; i<inputs.length; i++){
      var inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
        inputSprite.y=i*80;

      var inputSpriteText = new PIXI.Text(inputs[i]);
        inputSpriteText.x=20;
        inputSpriteText.y=i*80 +20;

      this.inputContainer.addChild(inputSprite,inputSpriteText)

    }
    this.app.stage.addChild(this.inputContainer);
  }
}

