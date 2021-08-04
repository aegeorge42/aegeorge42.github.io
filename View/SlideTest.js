import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {actFns} from "../../Model/actfns.js"

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
});
  
const formatter_long = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 6,
});
  
const small = new PIXI.TextStyle({
    fontFamily: 'Open Sans',
    fontWeight: 300,
    fontSize: 13
});

const medium = new PIXI.TextStyle({
  fontFamily: 'Open Sans',
  fontWeight: 300,
  fontSize: 20
});

PIXI.Graphics.prototype.updateLineStyle = function(lineWidth, color, alpha){   
    var len = this.graphicsData.length;    
    for (var i = 0; i < len; i++) {        
      var data = this.graphicsData[i];
      data.lineWidth = lineWidth;        
      data.lineColor = color;        
      data.alpha = alpha;   
      this.dirty++;        
      this.clearDirty++;    
    }    
}
  
export class SlideTest{
    constructor(){

        this.buttonContainer  = new PIXI.Container();             
        this.inputContainer = new PIXI.Container();                 
        this.neuronContainer = new PIXI.Container();
            this.neuronBases = new PIXI.Container();
                this.neuronBases.name = "neuronBases";
            this.neuronOvers = new PIXI.Container();
                this.neuronOvers.name = "neuronOvers";          
            this.neuronSensors = new PIXI.Container();  
        this.weightsContainer = new PIXI.Container();               
    
        this.slideContainer=new PIXI.Container();                   
        this.slideContainer.addChild(this.buttonContainer,                                      
                                      this.weightsContainer,
                                      this.inputContainer, 
                                      this.neuronContainer);
    }

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

    drawButtons(net){
        var slide = this;

        // ADD LAYER
        this.buttonContainer.addChild(new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), layout.BUTTONS_X, 140,true));
        this.buttonContainer.getChildByName("addlayer").on('click', function(e){
            net.addLayer();
            net.update();
            slide.draw_init(net);
            console.log(net.layers.length)
        });

        // REMOVE LAYER
        this.buttonContainer.addChild(new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), layout.BUTTONS_X, 200, true));
        this.buttonContainer.getChildByName("remlayer").on('click', function(e){
            if(net.layers.length>1){
                net.removeLayer();
                net.update();
                slide.draw_init(net);
            }
        });

        // LEARN STOCHASTIC STEP
        this.buttonContainer.addChild(new Button("learn_stoch_step",PIXI.Texture.from('images/buttons/button_learnstep.png'),layout.BUTTONS_X,255,true));
        this.buttonContainer.getChildByName("learn_stoch_step").on('click', function(e){
            net.learn();
            slide.draw_update(net);
        });

        // LEARN STOCHASTIC
        this.buttonContainer.addChild(new Button("learn_stoch",PIXI.Texture.from('images/buttons/button_learn.png'),layout.BUTTONS_X,300,true));
        this.buttonContainer.getChildByName("learn_stoch").on('click', async function(e){
          var loopcount = 0;
          pauselearn=0;
          while(loopcount<100 && pauselearn==0){
            net.learn();
            slide.draw_update(net);
            await slide.sleep(100); //pause to see updates - 100 seems good
            loopcount=loopcount+1;
          }
        });

        this.buttonContainer.addChild(new Button("pause",PIXI.Texture.from('images/buttons/button_pause.png'),layout.BUTTONS_X,350,true));
        var pauselearn=0;
        this.buttonContainer.getChildByName("pause").on('click', function(e){
        pauselearn=1;
        });
    }


    draw_init(net){
        this.drawWeights_init(net);
        this.drawNeurons_init(net);
    }

    draw_update(net){
        this.drawNeurons_update(net);
        this.drawWeights_update(net);
    }
        
    drawWeights_init(net){
        this.weightsContainer.removeChildren();

        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
                for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                    var weightSprite=new PIXI.Graphics();
                    weightSprite.name = i.toString() + j.toString() + k.toString();

                    var thickness = Math.abs(net.getLayer(i).neurons[j].weights[k] * 10) + 1;
                    var color = 0x000000;

                    //positive weight = blue, neagtive = orange
                    if(net.getLayer(i).neurons[j].weights[k] < 0){
                        color = 0xFF5733;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x344EE8;
                    } else if(net.getLayer(i).neurons[j].weights[k] == 0){
                        color = 0xAAADB3;
                    }

                    weightSprite.lineStyle(thickness, color);

                    var startx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF);
                    var starty = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF);
                    var startyf = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
                    var endx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                    var endy0 = layout.NEURON_UPPERLIM + (k*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
                    var endy =  layout.NEURON_UPPERLIM + (k*layout.NEURON_Y_DIF);
                    
                    var hitbuffer = 10;

                    var f=new PIXI.Graphics();
                    f.lineStyle(3, 0x000000);
                    if (i==0 && net.layers.length >1){
                        weightSprite.drawPolygon(startx, starty, endx, endy0);
                        weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                                endx, endy0 +hitbuffer,
                                                                endx, endy0 -hitbuffer,
                                                                startx, starty -hitbuffer);

                                                                f.drawPolygon(startx, starty +hitbuffer, 
                                                                    endx, endy0 +hitbuffer,
                                                                    endx, endy0 -hitbuffer,
                                                                    startx, starty -hitbuffer);

                    } else if (i==net.layers.length-1 && net.layers.length >1){
                        weightSprite.drawPolygon(startx, startyf, endx, endy);
                        weightSprite.hitArea = new PIXI.Polygon(startx, startyf +hitbuffer, 
                                                                endx, endy +hitbuffer,
                                                                endx, endy -hitbuffer,
                                                                startx, startyf -hitbuffer);

                                                                f.drawPolygon(startx, startyf +hitbuffer, 
                                                                    endx, endy +hitbuffer,
                                                                    endx, endy -hitbuffer,
                                                                    startx, startyf -hitbuffer);

                    } else if (net.layers.length == 1){
                        weightSprite.drawPolygon(startx, startyf, endx, endy0);
                        weightSprite.hitArea = new PIXI.Polygon(startx, startyf +hitbuffer, 
                                                                endx, endy0 +hitbuffer,
                                                                endx, endy0 -hitbuffer,
                                                                startx, startyf -hitbuffer);

                                                                f.drawPolygon(startx, startyf +hitbuffer, 
                                                                    endx, endy0 +hitbuffer,
                                                                    endx, endy0 -hitbuffer,
                                                                    startx, startyf -hitbuffer);
                        
                    } else {
                        weightSprite.drawPolygon(startx, starty, endx, endy);
                        weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                                endx, endy +hitbuffer,
                                                                endx, endy -hitbuffer,
                                                                startx, starty -hitbuffer);

                                                                f.drawPolygon(startx, starty +hitbuffer, 
                                                                    endx, endy +hitbuffer,
                                                                    endx, endy -hitbuffer,
                                                                    startx, starty -hitbuffer);
                    }

                    
                    weightSprite.interactive=true;

                    var self=this;
                    weightSprite.on('mouseover', function(e){
                        this.alpha=0;
                    });
                    
                    weightSprite.on('mouseout', function(e){
                    this.alpha=1;
                    });

                    this.weightsContainer.addChild(weightSprite);
                    //this.weightsContainer.addChild(f);
                    
                }
            }
        }
    }

    drawWeights_update(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
                for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){

                    var name = i.toString() + j.toString() + k.toString();

                    var thickness = Math.abs(net.getLayer(i).neurons[j].weights[k] * 10) + 1;
                    var color = 0x000000;

                    //positive weight = blue, neagtive = orange
                    if(net.getLayer(i).neurons[j].weights[k] <= 0){
                        color = 0xFF5733;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x344EE8;
                    }

                    this.weightsContainer.getChildByName(name).updateLineStyle(thickness, color, 1);
                }
            }
        }

    }
        
    drawNeurons_init(net){

        //clear old stuff first
        this.neuronContainer.removeChildren();
        this.neuronBases.removeChildren();
        this.neuronOvers.removeChildren();
        this.neuronSensors.removeChildren();
      
        for(var i = 0; i<net.layers.length; i++){
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){
      
            var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
                neuronBase.anchor.set(0.5);
                neuronBase.name = i.toString() + j.toString();

                neuronBase.x = layout.NEURON_LEFTLIM + (i * layout.NEURON_X_DIF);

                if(i==net.layers.length-1){
                    neuronBase.y = layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
                } else {
                    neuronBase.y = layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF);
                }
                
                //set tint depending on how much neuron is activated
                var out = net.getLayer(i).neurons[j].output;
                if(out>=0.9){
                    neuronBase.tint= 0xfff000
                } else if (out>=0.8){
                    neuronBase.tint= 0xfdee3b
                } else if (out>=0.7){
                    neuronBase.tint= 0xfbeb56
                } else if (out>=0.6){
                    neuronBase.tint= 0xf9e96d
                } else if (out>=0.5){
                    neuronBase.tint= 0xf6e781
                } else if (out>=0.4){
                    neuronBase.tint= 0xf2e494
                } else if (out>=0.3){
                    neuronBase.tint= 0xeee2a7
                } else if (out>=0.2){
                    neuronBase.tint= 0xe9e0b9
                } else if (out>=0.1){
                    neuronBase.tint= 0xe3deca
                }  else if (out>=0.0){
                    neuronBase.tint= 0xdcdcdc
                }

            this.neuronBases.addChild(neuronBase);

      
            var neuronText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
                neuronText.scale.set(0.8);
                neuronText.anchor.set(0.5);
            neuronBase.addChild(neuronText);
      
      
            var overText = new PIXI.Text(
                "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
                + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n',
                small)
            overText.anchor.set(.5);
                
            var neuronOver = new PIXI.Sprite(PIXI.Texture.from('images/overneuron.png'));
                neuronOver.anchor.set(0.5);
                neuronOver.scale.set(1.5);
                neuronOver.name = neuronBase.name;
                neuronOver.x=neuronBase.x;
                neuronOver.y=neuronBase.y;
                neuronOver.alpha=0;
            neuronOver.addChild(overText);
            this.neuronOvers.addChild(neuronOver);
      
              //detection for showing overneuron
            var sensor= new PIXI.Sprite(PIXI.Texture.from('images/neuron_old.png'));
                sensor.anchor.set(0.5);
                sensor.x=neuronBase.x;
                sensor.y=neuronBase.y;
                sensor.tint=0xFFA500;
                sensor.alpha=0;
                sensor.interactive=true;
      
                var self = this;
                sensor.on('mouseover', function(e){
                  self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=1;
                });
      
                sensor.on('mouseout', function(e){
                  self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=0;
                });
            this.neuronSensors.addChild(sensor);

            this.neuronContainer.addChild(this.neuronBases, this.neuronOvers, this.neuronSensors)
            }
        }
    }

    drawNeurons_update(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){

                var name = i.toString() + j.toString();

                var currBase = this.neuronContainer.getChildByName("neuronBases").getChildByName(name);
                var out = net.getLayer(i).neurons[j].output;
                
                if(out>=0.9){
                    currBase.tint= 0xfff000
                } else if (out>=0.8){
                    currBase.tint= 0xfdee3b
                } else if (out>=0.7){
                    currBase.tint= 0xfbeb56
                } else if (out>=0.6){
                    currBase.tint= 0xf9e96d
                } else if (out>=0.5){
                    currBase.tint= 0xf6e781
                } else if (out>=0.4){
                    currBase.tint= 0xf2e494
                } else if (out>=0.3){
                    currBase.tint= 0xeee2a7
                } else if (out>=0.2){
                    currBase.tint= 0xe9e0b9
                } else if (out>=0.1){
                    currBase.tint= 0xe3deca
                }  else if (out>=0.0){
                    currBase.tint= 0xdcdcdc
                }

                currBase.getChildAt(0).text=formatter.format(net.getLayer(i).neurons[j].output);     
            
                this.neuronContainer.getChildByName("neuronOvers").getChildByName(name).getChildAt(0).text = 
                
                "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
                + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n' ;
            
            }
        }
    }
}