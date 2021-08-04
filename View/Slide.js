import {Button} from "./Button.js"
import {actFns} from "../../Model/actfns.js"



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

const medium = new PIXI.TextStyle({
  fontFamily: 'Open Sans',
  fontWeight: 300,
  fontSize: 20
});

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

// This handles pretty much alllll the visual stuff

export class Slide{
 
  constructor(){
    this.maxNeurons=3;
    this.maxLayers=3;

    this.data=[];
        this.buttonContainer  = new PIXI.Container();             // Holds all my buttons EXCEPT add / remove neuron
        this.buttonNeuronAddContainer = new PIXI.Container();     // Holds add neuron buttons
        this.buttonNeuronRemContainer = new PIXI.Container();     // Holds rem neuron buttons (different containers for indexing purposes)
      this.inputContainer = new PIXI.Container();                 // inputs to draw
      this.netContainer = new PIXI.Container();                   // all neurons to draw (incl. neuronOverContainer + neuronSensorContainer)
        this.neuronOverContainer = new PIXI.Container();          // shows neuron guts
        this.neuronSensorContainer = new PIXI.Container();  
        // hitbox for neuronOverContaine
      this.weightsContainer = new PIXI.Container();               // all weights to draw
      this.labelsContainer = new PIXI.Container();                // all labels to draw (ex. input labels, data type labels)
      this.textContainer = new PIXI.Container();                  // all slide text that isn't labels

      this.slideContainer=new PIXI.Container();                   // the WHOLE slide
      this.slideContainer.addChild(this.buttonContainer,
                                  this.buttonNeuronAddContainer,
                                  this.buttonNeuronRemContainer,
                                  
                                  this.weightsContainer,
                                  this.inputContainer, 
                                  this.labelsContainer,
                                  this.netContainer,
                                  this.textContainer);
    }



  /**** helper functions ****/
  formatList(list){
      var nums2print = new Array(list.length);
      for(var n=0; n<list.length; n++){
        nums2print[n]=formatter.format(list[n]);
      }
      return nums2print;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /**** *************** ****/


  drawButtons(net){
    var slide = this;
    
    // ADD LAYER
    this.buttonContainer.addChild(new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,140,true));
    this.buttonContainer.getChildAt(0).on('click', function(e){
      if(net.layers.length<slide.maxLayers){
        net.addLayer();
      //  slide.updateDraw(net);
      }
    });
    
    // REMOVE LAYER
    this.buttonContainer.addChild(new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,200,true));
    this.buttonContainer.getChildAt(1).on('click', function(e){
      if(net.layers.length>1){
        net.removeLayer();
      //  slide.updateDraw(net);
      }
    });

    //ADD NEURON + REMOVE NEURON
    for (var i =0; i<this.maxLayers; i++){
      this.buttonNeuronAddContainer.addChild(new Button("addneuron",PIXI.Texture.from('images/buttons/button_addneuron.png'),350+ (i*150),80, false));
      this.buttonNeuronRemContainer.addChild(new Button("remneuron",PIXI.Texture.from('images/buttons/button_removeneuron.png'),350+ (i*150),105, false));
      this.setNeuronButtons(net,i);
    }

    // LEARN - STOCHASTIC STEP
    this.buttonContainer.addChild(new Button("learn_step",PIXI.Texture.from('images/buttons/button_learnstep.png'), 80,255,true));
    this.buttonContainer.getChildAt(2).on('click', function(e){
      console.log("----INPUT " +net.dataIdx + "---------");
      net.learn();
    //  slide.updateDraw(net);
    });

    // LEARN - STOCHASTIC
    this.buttonContainer.addChild(new Button("learn",PIXI.Texture.from('images/buttons/button_learn.png'), 80,300,true));
    this.buttonContainer.getChildAt(3).on('click', async function(e){
      var loopcount = 0;
      pauselearn=0;
      while(loopcount<1000 && pauselearn==0){
        net.learn();
      //  slide.updateDraw(net);
        await slide.sleep(100); //pause to see updates - 100 seems good
        loopcount=loopcount+1;
        //console.log(loopcount);
      }
    });

    //PAUSE LEARNING
    this.buttonContainer.addChild(new Button("pause",PIXI.Texture.from('images/buttons/button_pause.png'), 80,350,true));
      var pauselearn=0;
    this.buttonContainer.getChildAt(4).on('click', function(e){
      pauselearn=1;
    });

    // LEARN - VANILLA STEP
    this.buttonContainer.addChild(new Button("learnbatch",PIXI.Texture.from('images/buttons/learn_batch_step.png'), 80,400,true));
    this.buttonContainer.getChildAt(5).on('click', async function(e){

      //cycle data points for drawing purposes
      for(var i=0; i<net.data.points.length; i++){
       
  //      console.log(slide.labelsContainer);
        net.setNetInput(net.data.points[i]);
   //     slide.updateDraw(net);
        slide.labelsContainer.getChildAt(5).style.fill = 0x6b6b6b;

        await slide.sleep(100);
      }

      net.learn_batch();
      await slide.sleep(100);
   //   slide.updateDraw(net);
    });

    //LEARN - VANILLA
    this.buttonContainer.addChild(new Button("learnbatch",PIXI.Texture.from('images/buttons/cat.png'), 150,400,true));
    this.buttonContainer.getChildAt(6).on('click', async function(e){
      var loopcount = 0;
      pauselearn=0;
      while(loopcount<100 && pauselearn==0){

        //cycle data points for drawing purposes, but only for the first few times
        if(loopcount<5){
          for(var i=0; i<net.data.points.length; i++){
            net.setNetInput(net.data.points[i]);
//            slide.updateDraw(net);
            slide.labelsContainer.getChildAt(5).style.fill = 0x6b6b6b;
            await slide.sleep(100);
            slide.labelsContainer.getChildAt(5).style.fill = 0x000000;

          }

        }

        await slide.sleep(100);
        net.learn_batch();
//        slide.updateDraw(net);
        loopcount=loopcount+1;
      }
    });

    this.buttonContainer.addChild(new Button("setactfn",PIXI.Texture.from('images/buttons/treasure.png'), 80,550,true));
 //   console.log(net.netActFn);
    this.buttonContainer.getChildAt(7).on('click', function(e){
      
      net.setNetActFn(actFns.SIGMOID);
      slide.updateDraw(net);

   //   console.log(net.netActFn);
    });

    this.buttonContainer.addChild(new Button("setactfn",PIXI.Texture.from('images/buttons/treasure.png'), 120,550,true));
    //console.log(net.netActFn);
    this.buttonContainer.getChildAt(8).on('click', function(e){
      
      net.setNetActFn(actFns.RELU);
//      slide.updateDraw(net);

      console.log(net.netActFn);
    });

  }

  

  // add/remove neuron button functionality
  setNeuronButtons(net,layernum){
    var slide = this;

    this.buttonNeuronAddContainer.getChildAt(layernum).on('click', function(e){
      if(net.getLayer(layernum).neurons.length<slide.maxNeurons){
        net.getLayer(layernum).addNeuron();
//        slide.updateDraw(net);
      }
    });

    this.buttonNeuronRemContainer.getChildAt(layernum).on('click', function(e){
      net.getLayer(layernum).removeNeuron();
//      slide.updateDraw(net);
    });

  }

  // to delete?
  /* 
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
  */

  clearButtons(){
    console.log("clear");
    for(var i =0; i<this.buttonContainer.children.length; i++){
      this.buttonContainer.getChildAt(i).visible=false;
    }   
  }

  setVis(container,idx,bool){
    if(bool==false){container.getChildAt(idx).visible=false;}
    else if(bool==true){container.getChildAt(idx).visible=true;}
  }

  setVisAll(container, bool){
    if(bool==false){
      for(var i = 0; i<container.children.length; i++){
        container.getChildAt(i).visible=false;
      }
    } else if(bool==true){
      for(var i = 0; i<container.children.length; i++){
        container.getChildAt(i).visible=true;
      }
    }
    console.log("setvis")
  }

  drawInit(net){
    this.drawInputs(net);
    this.drawNeurons(net);
    this.drawWeights(net);
    this.drawCost(net);
  }

  drawUpdate(net){
    net.update();
  }

  // update net and redraw
  updateDraw(net){
    net.update();
    this.draw(net);

    if(net.layers.length>1){
      this.setVis(this.buttonNeuronAddContainer,net.layers.length-2,true);
      this.setVis(this.buttonNeuronRemContainer,net.layers.length-2,true);
    }

    this.setVis(this.buttonNeuronAddContainer,net.layers.length-1,false);
    this.setVis(this.buttonNeuronRemContainer,net.layers.length-1,false);
  }

  clearInputs(){}
  clearNet(){}
  clear(){}
  clearExceptButtons(){}

  draw(net){
      this.drawInputs(net);
      this.drawNeurons(net);
      this.drawWeights(net);
      this.drawCost(net);
  }

  draw_noCost(net){
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
      this.inputContainer.removeChildren();
    
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
      console.log(this.inputContainer.children);
  }

  drawWeights(net){
    this.weightsContainer.removeChildren();

    for(var i = 0; i<net.layers.length; i++){
        for(var j = 0; j<net.getLayer(i).neurons.length; j++){
            for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                var weightSprite=new PIXI.Graphics();
                
                //weightSprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100);

                  //magnitude of weight determines thickness
                  var thickness = Math.abs(net.getLayer(i).neurons[j].weights[k] * 10) + 1;
                //    if(thickness<1){ var thickness =3 }
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
                  //  this.getChildAt(0).alpha=0;
                  //  this.getChildAt(0).scale.set(1.5);
                    //come back to this
                //    var temp = new PIXI.Polygon(this.currentPath.points[0]+20,this.currentPath.points[1]+20,this.currentPath.points[2]+20,this.currentPath.points[3]+20);
                  });
                  
        
                  weightSprite.on('mouseout', function(e){
                    this.alpha=1;
                  
                 // this.getChildAt(0).scale.set(1);
                  

                  });
                this.weightsContainer.addChild(weightSprite);
                this.weightsContainer.addChild(f);

                  

                //cpme back to this
                var weightSpriteText=new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].weights[k]), textStyle);
              //  weightSpriteText.anchor.set(0.5)
                 weightSpriteText.x= startx-50 //weightSprite.x// ((i*200)+350 + (i*200)+150 +100)/2 -50;
                  weightSpriteText.y= starty-10 + (k*20) - (j*10)// (j*120+150 +50 -5 + i+300+k*100 -100)/2-50;

                  var slope = (endy-starty)/(endx-startx);
                //    weightSpriteText.rotation=Math.atan(slope);
                //  console.log("slope"+slope)
                 weightSprite.addChild(weightSpriteText);
            }
        }
    }
}

  drawNeurons(net){

  //clear old stuff first
  //this.inputContainer.removeChildren();
  this.netContainer.removeChildren();
  this.labelsContainer.removeChildren();
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
          neuronBase.tint= 0xfff000
        } else if (finout>=0.8){
          neuronBase.tint= 0xfdee3b
        } else if (finout>=0.7){
          neuronBase.tint= 0xfbeb56
        } else if (finout>=0.6){
          neuronBase.tint= 0xf9e96d
        } else if (finout>=0.5){
          neuronBase.tint= 0xf6e781
        } else if (finout>=0.4){
          neuronBase.tint= 0xf2e494
        } else if (finout>=0.3){
          neuronBase.tint= 0xeee2a7
        } else if (finout>=0.2){
          neuronBase.tint= 0xe9e0b9
        } else if (finout>=0.1){
          neuronBase.tint= 0xe3deca
        }  else if (finout>=0.0){
          neuronBase.tint= 0xdcdcdc
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
          overNeuron.scale.set(1.5);

          overNeuron.x=neuronBase.x;
          overNeuron.y=neuronBase.y;
          overNeuron.idx= [i,j];
          overNeuron.alpha=0;
          overNeuron.addChild(overText);

        //detection for showing overneuron
        var sensor= new PIXI.Sprite(PIXI.Texture.from('images/neuron_old.png'));
          sensor.anchor.set(0.5);
          sensor.x=neuronBase.x;
          sensor.y=neuronBase.y;
          sensor.tint=0xFFA500;
          sensor.alpha=1;
          sensor.interactive=true;

          var self = this;
          sensor.on('mouseover', function(e){
            self.neuronOverContainer.getChildAt(this.parent.getChildIndex(this)).alpha=1;
          });

          sensor.on('mouseout', function(e){
            self.neuronOverContainer.getChildAt(this.parent.getChildIndex(this)).alpha=0;
          });

          layerContainer.addChild(neuronBase);

        this.neuronOverContainer.addChild(overNeuron);
        this.neuronSensorContainer.addChild(sensor);

        this.netContainer.addChild(this.neuronOverContainer, this.neuronSensorContainer)

        //neuronContainer.addChild(neuronBase);
        // neuronContainer.addChild(overNeuron);
        //neuronContainer.addChild(sensor);
        
      }
    }

//    this.netContainer.addChild(this.neuronOverContainer, this.neuronSensorContainer)

   // console.log(net.data.input_labels);
    for(var i = 0; i<net.data.type.length; i++){
      var typeLabel = new PIXI.Text(net.data.type[i],medium);
      typeLabel.x=380+((net.layers.length-1)*150);
      typeLabel.y=135+(i*100);
      this.labelsContainer.addChild(typeLabel);

    }

    for(var i = 0; i<net.data.labels.length; i++){
      var inputLabel = new PIXI.Text(net.data.labels[i],medium);
      inputLabel.anchor.set(0.5);
      inputLabel.x=200
      inputLabel.y=240+(i*100)
      this.labelsContainer.addChild(inputLabel);
    }



    var targetLabel = new PIXI.Text(net.targetText);
      targetLabel.anchor.set(0.5);
      targetLabel.x=200;
      targetLabel.y=140;
      this.labelsContainer.addChild(targetLabel);

  }     
  
  drawCost(net){
    var costTotLabel = new PIXI.Text("cost" + '\n' +formatter_long.format(net.costTot));
      costTotLabel.x=50;
      costTotLabel.y=450;
      this.labelsContainer.addChild(costTotLabel);
    //  console.log(this.labelsContainer.children.length)
  }
}