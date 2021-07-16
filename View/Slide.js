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

var neuronWidth=50;
var neuronHeight=100;

var buffer= 50;
var upperlim = 100;
var leftlim = 150;

var postraise = -50; //move weightline up a smidge
var postgap = 20 ; //separate out weightlines a smidge

export const layout = {
  INPUT_WIDTH: 50,
  INPUT_HEIGHT: 100,
  
  NEURON_WIDTH: 50,
  NEURON_HEIGHT: 50,
  
  WEIGHTS_WIDTH: 150, //random
  BUFFER: 20,
  UPPERLIM: 80,
  LEFTLIM: 200,
  
  WEIGHT_RAISE: -25, //move weightline up a smidge
  WEIGHT_GAP: 100 //separate out weightlines a smidge

}

/*************/


//type of controller
export class Slide{
  slideContainer; // holds it ALL
  inputContainer; // inputs to draw
  buttonContainer; // all buttons to draw -to delete?
  buttonLayerContainer;
  buttonNeuronAddContainer;
  buttonNeuronRemContainer;

    
  netContainer; // net to draw 
  weightsContainer; //weight graphics to draw
  neuronOverContainer;
  neuronSensorContainer;
  labelsContainer; 

  constructor(){
      this.buttonContainer = new PIXI.Container();
        this.buttonLayerContainer  = new PIXI.Container();
        this.buttonNeuronAddContainer = new PIXI.Container();
        this.buttonNeuronRemContainer = new PIXI.Container();
//      this.buttonContainer.addChild(this.buttonLayerContainer);   maybe do this
      this.inputContainer = new PIXI.Container();
      this.netContainer = new PIXI.Container();
        this.neuronOverContainer = new PIXI.Container();
        this.neuronSensorContainer = new PIXI.Container();
      this.weightsContainer = new PIXI.Container();
      this.labelsContainer = new PIXI.Container();
      this.slideContainer=new PIXI.Container();
      this.slideContainer.addChild(this.buttonLayerContainer,this.buttonNeuronAddContainer,this.buttonNeuronRemContainer,this.weightsContainer,this.inputContainer,this.netContainer, this.labelsContainer);
  }



  //helper function
  formatList(list){
      var nums2print =[];
      for(var n=0; n<list.length; n++){
        nums2print.push(formatter.format(list[n]));
      }
      return nums2print;
  }

  addButtontemp(button){
    this.buttonContainer.addChild(button);
  }

  addButton(name, textureimg, x, y, vis){
      var newb = new Button(name,PIXI.Texture.from(textureimg),x,y,vis)
      this.buttonContainer.addChild(newb);
  }

  
  addButtons(buttonlist){
    for(var i =0; i<buttonlist.length; i++){
      this.buttonContainer.addChild(buttonlist[i]);
    }
    
  }

  isVis(name){
    return this.buttonContainer.getChildByName(name).visible;
  }

  setVis(name,bool){
    if(bool==false){this.buttonContainer.getChildByName(name).visible=false;}
    else if(bool==true){this.buttonContainer.getChildByName(name).visible=true;}
  }

//  Slide0.buttonContainer.getChildByName("btest").on('click', function(e){
//    net.getLayer(0).addNeuron();
//    net.update();
//    Slide0.draw(net);
//  });
  onClick(buttonname,thisnet,funct){
    var slide = this;
    slide.buttonContainer.getChildByName(buttonname).on('click', function(e){
    //  thisnet.getLayer(0).addNeuron();
      thisnet.update();
      slide.draw(thisnet);
    });
  }

  updateDraw(net){
    net.update();
    this.draw(net);
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
        this.netContainer.getChildAt(i).getChildAt(k).scale.set(2);
      }
    }
  }

  drawInputs(net){
      for(var i = 0; i<net.netInput.length; i++){
          var inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
              inputSprite.anchor.set(0.5);
              inputSprite.x= 200;//leftlim;
              inputSprite.y= (i*100) +200;//(i*(inputHeight+buffer))+upperlim+buffer;
      
          var inputSpriteText = new PIXI.Text(net.netInput[i]);
              inputSpriteText.anchor.set(0.5);

      
          inputSprite.addChild(inputSpriteText);
          this.inputContainer.addChild(inputSprite);
      }
  }

  drawWeights(net){

    for(var i = 0; i<net.layers.length; i++){
        for(var j = 0; j<net.getLayer(i).neurons.length; j++){
            for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                var weightSprite=new PIXI.Graphics();
                
                //weightSprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100);

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
                  var startx = 350 + (i*150);
                  var starty = 150 + (j*100);
                  var endx = 350 + (i*150) - 150;
                  var endy0 = 200 + (k*100);
                  var endy =  150 + (k*100);

                  if (i==0){
                    weightSprite.drawPolygon(startx, starty, 
                                             endx, endy0);
                  } else {
                    weightSprite.drawPolygon(startx, starty, 
                                             endx, endy);
                  }
                  
                  // use to view weight hitbox
                  var f=new PIXI.Graphics();
                  f.lineStyle(3, 0x000000);
                  if (i==0){
                    f.drawPolygon(startx, starty +10, 
                      endx, endy0 +10,
                      endx, endy0 -10,
                      startx, starty -10);
                  } else {
                    f.drawPolygon(startx, starty +10, 
                                  endx, endy +10,
                                  endx, endy -10,
                                  startx, starty -10);
                  }

                  if(i==0){
                    //TODO: FIX THIS
                    weightSprite.hitArea = new PIXI.Polygon(
                      startx, starty +10, 
                      endx, endy0 +10,
                      endx, endy0 -10,
                      startx, starty -10);
                  } else {

                    weightSprite.hitArea = new PIXI.Polygon(startx, starty +10, 
                      endx, endy +10,
                      endx, endy -10,
                      startx, starty -10);
                  
                  }

                  
                  weightSprite.interactive=true;

                  //weightSprite.buttonmode=true;
                  var self=this;
                  weightSprite.on('mouseover', function(e){
                    this.alpha=0;
                    console.log(this.currentPath.points);
                    //come back to this
                //    var temp = new PIXI.Polygon(this.currentPath.points[0]+20,this.currentPath.points[1]+20,this.currentPath.points[2]+20,this.currentPath.points[3]+20);
                  });
                  
        
                  weightSprite.on('mouseout', function(e){
                    this.alpha=1;
                  });
                this.weightsContainer.addChild(weightSprite);
                //this.weightsContainer.addChild(f);

                  

                //cpme back to this
                var weightSpriteText=new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].weights[k]), textStyle);
                  weightSpriteText.x= ((i*200)+350 + (i*200)+150 +100)/2 -50;
                  weightSpriteText.y= (j*120+150 +50 -5 + i+300+k*100 -100)/2;
                //   weightSpriteText.rotation=rotate;
                //  console.log("rotate"+rotate)
                //  this.weightsContainer.addChild(weightSpriteText);
            }
        }
    }
}

  drawNeurons(net){

  //clear old stuff first
  this.netContainer.removeChildren();
  this.weightsContainer.removeChildren();
  this.neuronOverContainer.removeChildren();
  this.neuronSensorContainer.removeChildren();

  //for each layer
  for(var i = 0; i<net.layers.length; i++){
    var layerContainer = new PIXI.Container();
    this.netContainer.addChild(layerContainer);

      //for each neuron
    for(var j = 0; j<net.getLayer(i).neurons.length; j++){

        var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
        neuronBase.anchor.set(0.5);
        neuronBase.x=350+ (i*150);
        neuronBase.y=150 + (j*100);
          
        //set tint depending on how much neuron is activated
        var finout = net.getLayer(i).neurons[j].output;
        if(finout>=0.9){
          neuronBase.tint= 0xFFF000
        } else if (finout>=0.8){
          neuronBase.tint= 0xFFF223
        } else if (finout>=0.7){
          neuronBase.tint= 0xFFF443
        } else if (finout>=0.6){
          neuronBase.tint= 0xFFF65F
        } else if (finout>=0.5){
          neuronBase.tint= 0xFFF87C
        } else if (finout>=0.4){
          neuronBase.tint= 0xFFFA98
        } else if (finout>=0.3){
          neuronBase.tint= 0xFFFBAF
        } else if (finout>=0.2){
          neuronBase.tint= 0xFFFCC8
        } else if (finout>=0.1){
          neuronBase.tint= 0xFFFEE9
        }


        var neuronMainText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
          neuronMainText.scale.set(0.8);
          neuronMainText.anchor.set(0.5);
          neuronBase.addChild(neuronMainText);


        var overText = new PIXI.Text(
            "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
              + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
              + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
              + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
              + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n',
            textStyle)
          overText.anchor.set(.5);
          
        var overNeuron = new PIXI.Sprite(PIXI.Texture.from('images/overneuron.png'));
          overNeuron.anchor.set(0.5);
          overNeuron.x=neuronBase.x;
          overNeuron.y=neuronBase.y;
          overNeuron.idx= [i,j];
          overNeuron.alpha=0;
          overNeuron.addChild(overText);

        //detection for showing overneuron
        var sensor= new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          sensor.anchor.set(0.5);
          sensor.x=neuronBase.x;
          sensor.y=neuronBase.y;
          sensor.tint=0xFFA500;
          sensor.alpha=0;
          sensor.interactive=true;

          var self = this;
          sensor.on('mouseover', function(e){
            self.neuronOverContainer.getChildAt(this.parent.getChildIndex(this)).alpha=1;
          });

          sensor.on('mouseout', function(e){
            self.neuronOverContainer.getChildAt(this.parent.getChildIndex(this)).alpha=0;
          });

        this.neuronOverContainer.addChild(overNeuron);
        this.neuronSensorContainer.addChild(sensor);

            
        //neuronContainer.addChild(neuronBase);
        // neuronContainer.addChild(overNeuron);
        //neuronContainer.addChild(sensor);
        layerContainer.addChild(neuronBase);
        
      }
    }

    this.netContainer.addChild(this.neuronOverContainer, this.neuronSensorContainer)

    //add text after final layer
    for(var i = 0; i<net.targetText.length; i++){
      var targetTextText = new PIXI.Text(net.targetText[i]);
      targetTextText.x=leftlim+(net.layers.length*layout.WEIGHTS_WIDTH)+ layout.WEIGHTS_WIDTH;
      targetTextText.y=(i*(inputHeight+buffer))+upperlim +buffer;

      this.labelsContainer.addChild(targetTextText);
    }

  }      
}