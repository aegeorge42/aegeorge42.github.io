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
  }

  //add buttons to list
  addButtons(){
    var button_input = new Button("b_in",PIXI.Texture.from('images/buttons/button_setin.png'),200,100);
    var button_addlayer = new Button("b_addlayer",PIXI.Texture.from('images/buttons/button_layer.png'),100,100);
    var button_addn0 = new Button("b_addn0",PIXI.Texture.from('images/buttons/button_neuron.png'),300,100);
    var button_addn1 = new Button("b_addn1",PIXI.Texture.from('images/buttons/button_neuron.png'),420,100);
    var button_addn2 = new Button("b_addn2",PIXI.Texture.from('images/buttons/button_neuron.png'),540,100)
    var button_addf = new Button("b_addf",PIXI.Texture.from('images/buttons/nextbutton.png'),100,200)
  
    this.buttonContainer.addChild(button_input, button_addlayer, button_addn0,button_addn1,button_addn2,button_addf);
  }

  //add a single button
  addButton(id,textureimg, x, y){
    var newb = new Button(id,PIXI.Texture.from(textureimg),x,y)
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
    this.inputContainer.removeChildren();
    for(var i = 0; i<inputs.length; i++){
      var inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
        inputSprite.x=160;
        inputSprite.y=i*120 + 200;

      var inputSpriteText = new PIXI.Text(inputs[i]);
        inputSpriteText.x=160 + 10;
        inputSpriteText.y=i*120 + 200 + 10;

      this.inputContainer.addChild(inputSprite,inputSpriteText);
    }
  }

  drawInputs(){
    this.app.stage.removeChild(this.inputContainer);
    this.app.stage.addChild(this.inputContainer);
  }

  drawNeurons(net){
    //clear old stuff
    for(var i = 0; i<this.layers2draw.length; i++){
      this.clearContainer(this.layers2draw[i]);
    }
    
    // for each layer
    for(var i = 0; i<net.layers.length; i++){
      //for each neuron
      for(var j=0; j<net.getLayer(i).neurons.length; j++){
        
        //create a neuron sprite
        var neuronSprite = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          neuronSprite.x=(i*120)+250;
          neuronSprite.y=j*120+150;

        //convert neuron values to text
        var text = new PIXI.Text(
          "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
         + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
         + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
         + formatter.format(net.getLayer(i).neurons[j].output),
          textStyle)
          text.x=(i*120)+250 + 20;
          text.y=j*120 + 150 + 20;
        
        //add it all to appropriate layer container
        this.layers2draw[i].addChild(neuronSprite);
        this.layers2draw[i].addChild(text);

      }
      this.app.stage.addChild(this.layers2draw[i]);
    }
  }

  clearContainer(container){
    for(var i = 0; i<container.length; i++){
      container.removeChild(container[i]);
    }
  }
}