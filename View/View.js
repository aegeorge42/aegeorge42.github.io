import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,      
  maximumFractionDigits: 2,
});

const textStyle = new PIXI.TextStyle({
  fontFamily: 'Open Sans',
  fontWeight: 300,
  fontSize: 15
});

export class View{
  inputContainer; // inputs to draw
  buttonContainer; // all buttons to draw

  //list of containers
  //each container holds all neurons for that layer
  layers2draw = []; 

  constructor(){
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xFFE180
    });
    document.body.appendChild(this.app.view);

    this.buttonContainer = new PIXI.Container();
    this.inputContainer = new PIXI.Container();
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

  setup_buttons(){
    this.addButtons();
    this.drawButtons();
    this.buttonContainer.getChildByName("b_addn1").visible = false;
    this.buttonContainer.getChildByName("b_remn1").visible = false;
    this.buttonContainer.getChildByName("b_addn2").visible = false;
    this.buttonContainer.getChildByName("b_remn2").visible = false;
  }

  //add buttons to list
  addButtons(){

    //make all the buttons
    var button_input = new Button("b_in",PIXI.Texture.from('images/buttons/button_setin.png'),200,100);
    var button_addlayer = new Button("b_addlayer",PIXI.Texture.from('images/buttons/button_layer.png'),100,100);

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
    this.buttonContainer.addChild(button_input, button_addlayer, 
      button_addn0, button_remn0,
      button_addn1, button_remn1,
      button_addn2, button_remn2,
      button_addf,button_actfn_binstep,button_actfn_linear);
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

  //create new layer container
  //call when new layer is added
  draw_layerSetup(net){
    this.layers2draw = [];
    for(var i = 0; i<net.layers.length; i++){
      var layerContainer = new PIXI.Container();
      this.layers2draw.push(layerContainer);
    }
  }

  //rounds number to 2 decimal places
  formatList(list){
    var nums2print =[];
    for(var n=0; n<list.length; n++){
      nums2print.push(formatter.format(list[n]));
    }
    return nums2print;
  }

  addInputs(inputs){

    this.inputContainer.x=160;
    this.inputContainer.y=150;

    this.inputContainer.removeChildren();
    for(var i = 0; i<inputs.length; i++){
      var inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
      //  inputSprite.x=160;
        inputSprite.y=i*100;

      var inputSpriteText = new PIXI.Text(inputs[i]);
        inputSpriteText.x=20;
        inputSpriteText.y=i*100 +20;

      this.inputContainer.addChild(inputSprite,inputSpriteText);
      this.app.stage.addChild(this.inputContainer);
    }
  }

  //Do i need this?
 // drawInputs(){ 
 //   this.app.stage.removeChild(this.inputContainer);
 //   this.app.stage.addChild(this.inputContainer);
 // }

  drawNeurons(net){
    //clear old stuff
    for(var i = 0; i<this.layers2draw.length; i++){
      this.layers2draw[i].removeChildren();
    }
    
    // for each layer
    for(var i = 0; i<net.layers.length; i++){
      //for each neuron
      for(var j=0; j<net.getLayer(i).neurons.length; j++){

        //each neuron is container for drawing attributes
        var neuronContainer = new PIXI.Container();
          neuronContainer.x=(i*120)+250;
          neuronContainer.y=j*120+150;

        var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
        
        var innerText = new PIXI.Text(
          "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
         + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
         + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
         + formatter.format(net.getLayer(i).neurons[j].output),
          textStyle)
          innerText.x=15;
          innerText.y=15;


        var outText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
          outText.x=25;
          outText.y=25;

          //overneuron has to be the interactive since it's on top
        var overNeuron = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          overNeuron.tint=0x7a03ad;
          overNeuron.interactive=true;

          overNeuron.addChild(outText);

          overNeuron.on('mouseover', function(e){
            this.alpha=0;
          })

          overNeuron.on('mouseout', function(e){
            this.alpha=1;
          })

        neuronContainer.addChild(neuronBase);
        neuronContainer.addChild(innerText);
        neuronContainer.addChild(overNeuron);


        this.layers2draw[i].addChild(neuronContainer);


      }
      this.app.stage.addChild(this.layers2draw[i]);
    }
  }
}