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
    fontSize: 13
});

/**MAGIC NUMBERS**/

//var highest = window.innerHeight/10;
//var buffer = window.innerHeight/20;
var inputWidth=100;
var inputHeight=100;

var neuronWidth=100;
var neuronHeight=100;

var weightsWidth = 230; //random
var buffer= 50;
var upperlim = 100;
var leftlim = 200;

var postraise = 0; //move weightline up a smidge
var postgap = 20; //separate out weightlines a smidge

/*************/


//type of controller
export class Slide{
  slideContainer; // holds it ALL
  inputContainer; // inputs to draw
  buttonContainer; // all buttons to draw
  netContainer; // net to draw 
  weightsContainer; //weight graphics to draw

  constructor(){
      this.buttonContainer = new PIXI.Container();
      this.inputContainer = new PIXI.Container();
      this.netContainer = new PIXI.Container();
      this.weightsContainer = new PIXI.Container();
      this.slideContainer=new PIXI.Container();
      this.slideContainer.addChild(this.buttonContainer,this.inputContainer,this.netContainer,this.weightsContainer);
  }

  //helper function
  formatList(list){
      var nums2print =[];
      for(var n=0; n<list.length; n++){
        nums2print.push(formatter_long.format(list[n]));
      }
      return nums2print;
  }

  addButton(name, textureimg, x, y){
      var newb = new Button(name,PIXI.Texture.from(textureimg),x,y)
      this.buttonContainer.addChild(newb);
  }

  clearButtons(){}
  clearInputs(){}
  clearNet(){}
  clear(){}
  clearExceptButtons(){}

  draw(net){
      this.drawInputs(net);
      this.drawNeurons(net);
      this.drawWeights(net);
  }

  drawBig(net){
    this.drawInputs(net);
    this.drawNeurons(net);
    this.drawWeights(net);
    
    //get layers
    for(var i = 0; i<this.netContainer.children.length; i++){
      
      //get neurons
      for(var k = 0; k<this.netContainer.getChildAt(i).children.length; k++){
        this.netContainer.getChildAt(i).getChildAt(k).scale.set(3,3);
      }
    }
  }

  drawInputs(net){
      for(var i = 0; i<net.netInput.length; i++){
          var inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
              inputSprite.x=leftlim;
              inputSprite.y=(i*(inputHeight+buffer))+upperlim;
              console.log("IS " + "[" + inputSprite.x + "," + inputSprite.y +"]")
      
          var inputSpriteText = new PIXI.Text(net.netInput[i]);
              inputSpriteText.anchor.set(0.5);
              inputSpriteText.x= leftlim+ (inputWidth/2);
              inputSpriteText.y = inputSprite.y + inputHeight/2;
      
          this.inputContainer.addChild(inputSprite,inputSpriteText)
      }
  }

  drawWeights(net){
      for(var i = 0; i<net.layers.length; i++){
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){
              for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                  var weightSprite=new PIXI.Graphics();

                    //magnitude of weight determines thickness
                    var thickness = Math.abs(net.getLayer(i).neurons[j].weights[k] * 10);
                      if(thickness<1){ var thickness =3 }
                    var color = 0x000000;

                    //positive weight = blue, neagtive = orange
                    if(net.getLayer(i).neurons[j].weights[k] < 0){
                      color = 0xFF5733;
                    }else if(net.getLayer(i).neurons[j].weights[k] > 0){
                      color = 0x344EE8;
                    } else if(net.getLayer(i).neurons[j].weights[k] == 0){
                      color = 0xAAADB3;
                    }

                    weightSprite.lineStyle(thickness, color);
                    weightSprite.moveTo(leftlim+inputWidth+(i*weightsWidth-neuronWidth)+weightsWidth,
                       (j*neuronHeight*1.5+buffer)+upperlim + (k*postgap) -postraise);

                    weightSprite.lineTo(leftlim+inputWidth+(i*weightsWidth), upperlim+buffer+(k*(neuronHeight+buffer)) );
                    
                  this.weightsContainer.addChild(weightSprite);

                  //cpme back to this
                  var weightSpriteText=new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].weights[k]), textStyle);
                    weightSpriteText.x= ((i*200)+350 + (i*200)+150 +100)/2;
                    weightSpriteText.y= (j*120+150 +50 -5 + i+300+k*100 -100)/2;
                  //   weightSpriteText.rotation=rotate;
                  //  console.log("rotate"+rotate)
                    this.weightsContainer.addChild(weightSpriteText);
              }
          }
      }
  }

  drawNeurons(net){

      //for each layer
      for(var i = 0; i<net.layers.length; i++){

          var layerContainer = new PIXI.Container();
          this.netContainer.addChild(layerContainer);

          //for each neuron
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){
              var neuronContainer = new PIXI.Container();
               neuronContainer.x = leftlim+(i*weightsWidth)+weightsWidth;
               neuronContainer.y = (j*(inputHeight+buffer))+upperlim ;

               console.log("N " + "[" + neuronContainer.x + "," + neuronContainer.y +"]")

                var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));

                var innerText = new PIXI.Text(
                  "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                    + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                    + "b: " + formatter_long.format(net.getLayer(i).layerBias) +'\n'
                    + "o: " + formatter_long.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                    + formatter_long.format(net.getLayer(i).neurons[j].output) + '\n',
                  textStyle)
                  innerText.anchor.set(.5);
                  innerText.x=neuronWidth/2;
                  innerText.y=neuronHeight/2 +7; //lil nudge
        
                var neuronOutText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
                  neuronOutText.anchor.set(.5);
                  neuronOutText.x=neuronWidth/2;
                  neuronOutText.y=neuronHeight/2;
        
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
                neuronContainer.addChild(overNeuron);     // PUT ME BACK LATER
                
              layerContainer.addChild(neuronContainer);
          }

      }
    
    }      
}