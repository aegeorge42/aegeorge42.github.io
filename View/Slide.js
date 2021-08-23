import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {actFns} from "../../Model/actfns.js"
import {Data} from "../Model/data.js"
import {viewst} from "../Controller.js"
import {small, medium, typewriter, textstyles} from "./textstyles.js"


const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
});
  
const formatter_long = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,      
    maximumFractionDigits: 6,
});
  
// needed to update weights
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
  
export class Slide{
    constructor(){

        var slide=this;
       // this.maxLayers=5;
        this.buttonContainer  = new PIXI.Container();             
        this.inputContainer = new PIXI.Container();                 
        this.neuronContainer = new PIXI.Container();
            this.neuronBases = new PIXI.Container();
                this.neuronBases.name = "neuronBases";
            this.neuronOvers = new PIXI.Container();
                this.neuronOvers.name = "neuronOvers";          
            this.neuronSensors = new PIXI.Container();  
        this.weightsContainer = new PIXI.Container();
        
        this.labelsContainer = new PIXI.Container();
    
        this.textcount = 1; 
        this.textContainer = new PIXI.Container();

        this.cardContainer = new PIXI.Container(); 

        this.slideContainer=new PIXI.Container();                   
        this.slideContainer.addChild(this.buttonContainer,                                      
                                      this.weightsContainer,
                                      this.inputContainer, 
                                      this.neuronContainer,
                                      this.labelsContainer,
                                      this.cardContainer,
                                      this.textContainer
                                      );

        window.addEventListener('resize', resize);    

        function resize(){
            // shrug
            try{
                slide.buttonContainer.getChildByName("nexttext").x=window.innerWidth/2;
                slide.buttonContainer.getChildByName("nexttext").y=window.innerHeight-(layout.FOOTER_HEIGHT/2);

                slide.buttonContainer.getChildByName("prevtext").x=window.innerWidth/2 -150;
                slide.buttonContainer.getChildByName("prevtext").y=window.innerHeight-(layout.FOOTER_HEIGHT/2);
            } catch {};
        
        }
    }


    formatList(list){
        var nums2print = new Array(list.length);
        for(var n=0; n<list.length; n++){
            nums2print[n]=formatter.format(list[n]);
        }
        return nums2print;
    }

    //needed to pause drawing between updates
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setVis(container, bool){
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

    drawTextButtons(){
        var slide = this;

        this.buttonContainer.addChild(new Button("nexttext",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true));
       
        // don't draw next text button if theres 1 or less texts
        if(this.textContainer.children.length<=1){
            this.buttonContainer.getChildByName("nexttext").visible=false;
        }

        this.buttonContainer.getChildByName("nexttext").on('click', function(e){
            
            if (slide.textcount<slide.textContainer.children.length-1){
                slide.textContainer.getChildAt(slide.textcount).visible=true;
                slide.buttonContainer.getChildByName("prevtext").visible=true;

                slide.textcount=slide.textcount+1;

            } else if (slide.textcount==slide.textContainer.children.length-1){
                slide.textContainer.getChildAt(slide.textcount).visible=true;
                slide.textcount=slide.textcount+1;
                this.visible=false;
                slide.buttonContainer.getChildByName("prevtext").visible=true;
            }
        }); 

        this.buttonContainer.addChild(new Button("prevtext",PIXI.Texture.from('images/buttons/prev.png'), layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,false));

        if(this.textContainer.children.length<=1){
            this.buttonContainer.getChildByName("prevtext").visible=false;
        }

        this.buttonContainer.getChildByName("prevtext").on('click', function(e){
            console.log(slide.textcount);
           if (slide.textcount>1){
            slide.buttonContainer.getChildByName("nexttext").visible=true;
            slide.textcount=slide.textcount-1;
            slide.textContainer.getChildAt(slide.textcount).visible=false;
            console.log(slide.textcount);
            
        } 
            if (slide.textcount==1){
                this.visible=false;
            }

        });

        
    }

    drawButtons(net){
        var slide = this;
        var buttonNeuronAddContainer = new PIXI.Container();
            buttonNeuronAddContainer.name="buttonNeuronAddContainer";
        var buttonNeuronRemContainer = new PIXI.Container();
            buttonNeuronRemContainer.name="buttonNeuronRemContainer";


        this.buttonContainer.addChild(buttonNeuronAddContainer,buttonNeuronRemContainer);
        // ADD LAYER
        this.buttonContainer.addChild(new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), layout.BUTTONS_X, 140,true));
        this.buttonContainer.getChildByName("addlayer").on('click', function(e){
            if(net.layers.length<net.maxLayers){

            net.addLayer();
            net.update();
            slide.draw_init(net);
            console.log(net.layers.length)
            }
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
        //    graph.updateGraph(net,graph);

        });

        // LEARN STOCHASTIC
        this.buttonContainer.addChild(new Button("learn_stoch",PIXI.Texture.from('images/buttons/button_learn.png'),layout.BUTTONS_X,300,true));
        this.buttonContainer.getChildByName("learn_stoch").on('click', async function(e){
          var loopcount = 0;
          pauselearn=0;
          while(loopcount<100 && pauselearn==0){
            net.learn();
            slide.draw_update(net);
        //    graph.updateGraph(net,graph);
            await slide.sleep(100); //pause to see updates - 100 seems good
            loopcount=loopcount+1;
          }
        });

        this.buttonContainer.addChild(new Button("pause",PIXI.Texture.from('images/buttons/button_pause.png'),layout.BUTTONS_X,350,true));
        var pauselearn=0;
        this.buttonContainer.getChildByName("pause").on('click', function(e){
            console.log("PAUSE!!!");
        pauselearn=1;
        });

        // LEARN - VANILLA STEP
        this.buttonContainer.addChild(new Button("learnbatch_step",PIXI.Texture.from('images/buttons/learn_batch_step.png'),layout.BUTTONS_X,400,true));
        this.buttonContainer.getChildByName("learnbatch_step").on('click', async function(e){
            //cycle data points for drawing purposes
            for(var i=0; i<net.data.points.length; i++){
                net.setNetInput(net.data.points[i]);
                net.update();
                slide.draw_update(net);
            //    graph.updateGraph(net,graph);
                slide.labelsContainer.getChildByName("costLabel").style.fill = 0x6b6b6b;
                await slide.sleep(100);
            }

        slide.labelsContainer.getChildByName("costLabel").style.fill = 0x000000;
        net.learn_batch();
        await slide.sleep(100);

        net.update();
        slide.draw_update(net);
        });

        //LEARN - VANILLA
        this.buttonContainer.addChild(new Button("learnbatch",PIXI.Texture.from('images/buttons/learnbatch.png'), layout.BUTTONS_X,450,true));
        this.buttonContainer.getChildByName("learnbatch").on('click', async function(e){
            var loopcount = 0;
            pauselearn=0;

            while(loopcount<100 && pauselearn==0){

                //cycle data points for drawing purposes, but only for the first few times
                if(loopcount<0){
                    for(var i=0; i<net.data.points.length; i++){
                        net.setNetInput(net.data.points[i]);
                        net.update();
                        slide.draw_update(net);
                    //    graph.updateGraph(net,graph);

                        slide.labelsContainer.getChildByName("costLabel").style.fill = 0x6b6b6b;
                        await slide.sleep(100);
                        slide.labelsContainer.getChildByName("costLabel").style.fill = 0x000000;

                    }
                }

                await slide.sleep(100);
                net.learn_batch();
                net.update();
                slide.draw_update(net);           
               // graph.updateGraph(net,graph);
     
                loopcount=loopcount+1;
            }
        });

        this.buttonContainer.addChild(new Button("sigmoid",PIXI.Texture.from('images/buttons/sigmoid.png'), layout.BUTTONS_X,500,true));
        this.buttonContainer.getChildByName("sigmoid").on('click', function(e){

             console.log(net.netActFn);

            net.setNetActFn(actFns.SIGMOID);
            net.update();
            console.log(net.netActFn);

            slide.draw_init(net);
        });

        this.buttonContainer.addChild(new Button("relu",PIXI.Texture.from('images/buttons/relu.png'), layout.BUTTONS_X,550,true));
        this.buttonContainer.getChildByName("relu").on('click', function(e){
        
            console.log(net.netActFn);

            net.setNetActFn(actFns.RELU);
            console.log(net.netActFn);
            net.update();
            slide.draw_init(net);
        });

        console.log(this.buttonContainer.children);
        for (var i =0; i<net.maxLayers; i++){
            this.buttonContainer.getChildByName("buttonNeuronAddContainer").addChild(new Button("addneuron",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),80, false));
            this.buttonContainer.getChildByName("buttonNeuronRemContainer").addChild(new Button("remneuron",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),105, false));
            this.setNeuronButtons(net,i);
            
          }
    }

    setNeuronButtons(net,layernum){
        var slide = this;
    
        this.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(layernum).on('click', function(e){
          if(net.getLayer(layernum).neurons.length<net.maxNeurons){
            net.getLayer(layernum).addNeuron();
            net.update();
            slide.draw_init(net);
          }
        });
    
        this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(layernum).on('click', function(e){
          net.getLayer(layernum).removeNeuron();
          net.update();
          slide.draw_init(net);
        });
    }

    
    addGraphFns(net,graph){
        this.buttonContainer.getChildByName("learn_stoch_step").on('click', function(e){
            graph.updateGraph(net,graph);
        });
    }


    draw_init(net){
        this.drawWeights_init(net);
        this.drawNeurons_init(net);
        this.drawInputs_init(net);
        this.drawLabels_init(net);

        if(this.buttonContainer.getChildByName("buttonNeuronAddContainer") !==null){
            
            for(var i=0;i<net.layers.length;i++){
                this.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;

                if(i!=0){
                this.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i-1).visible=true;
                this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i-1).visible=true;
                }
            }
        }
    }

    draw_init_large(net){
        this.drawWeights_init_large(net);
        this.drawNeurons_init_large(net);
        this.drawInputs_init_large(net);
       // this.drawLabels_init(net);
    }

    draw_update(net){
        this.drawNeurons_update(net);
        this.drawWeights_update(net);
        this.drawInputs_update(net);
        this.drawLabels_update(net);
    }

    draw_update_large(net){
        this.drawNeurons_update_large(net);
        this.drawWeights_update(net);
    //    this.drawInputs_update(net);
      //  this.drawLabels_update(net);
    }
        
    drawWeights_init(net){
        var slide = this;
        this.weightsContainer.removeChildren();

        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
                for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                    var weightSprite=new PIXI.Graphics();
                    weightSprite.name = i.toString() + j.toString() + k.toString();
                    weightSprite.idx = [i,j,k];

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

                    if (i==0 && net.layers.length >1){
                        weightSprite.drawPolygon(startx, starty, endx, endy0);
                        weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                                endx, endy0 +hitbuffer,
                                                                endx, endy0 -hitbuffer,
                                                                startx, starty -hitbuffer);
                    } else if (i==net.layers.length-1 && net.layers.length >1){
                        weightSprite.drawPolygon(startx, startyf, endx, endy);
                        weightSprite.hitArea = new PIXI.Polygon(startx, startyf +hitbuffer, 
                                                                endx, endy +hitbuffer,
                                                                endx, endy -hitbuffer,
                                                                startx, startyf -hitbuffer);
                    } else if (net.layers.length == 1){
                        weightSprite.drawPolygon(startx, startyf, endx, endy0);
                        weightSprite.hitArea = new PIXI.Polygon(startx, startyf +hitbuffer, 
                                                                endx, endy0 +hitbuffer,
                                                                endx, endy0 -hitbuffer,
                                                                startx, startyf -hitbuffer);
                    } else {
                        weightSprite.drawPolygon(startx, starty, endx, endy);
                        weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                                endx, endy +hitbuffer,
                                                                endx, endy -hitbuffer,
                                                                startx, starty -hitbuffer);
                    }

                    weightSprite.interactive=true;
                    var addweight = new Button("+",PIXI.Texture.from('images/buttons/plus.png'),(startx+endx)/2,(starty+endy)/2,false);
                      addweight.anchor.set(0.5);
                    var loseweight = new Button("-",PIXI.Texture.from('images/buttons/minus.png'),((startx+endx)/2)-25,(starty+endy)/2,false);
                      addweight.anchor.set(0.5);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){
                        this.getChildByName("+").visible=true;
                        this.getChildByName("-").visible=true;
                        console.log(this)

                    });
                    
                    weightSprite.on('mouseout', function(e){
                        this.getChildByName("+").visible=false;
                        this.getChildByName("-").visible=false;
                    });

                    addweight.on('click', function(e){
                      var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                      net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight+0.1);
                      net.update();
                      slide.draw_update(net);
                
                    });

                    loseweight.on('click', function(e){
                      var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                      net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight-0.1);
                      net.update();
                      slide.draw_update(net);
                
                    });

                    this.weightsContainer.addChild(weightSprite);
                    
                }
            }
        }
    }

    drawWeights_init_large(net){
        var slide = this;
        this.weightsContainer.removeChildren();

        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
                for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                    var weightSprite=new PIXI.Graphics();
                    weightSprite.name = i.toString() + j.toString() + k.toString();
                    weightSprite.idx = [i,j,k];

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
                    var startx = layout.NEURON_LARGE_X;//layout.NEURON_LARGE_LEFTLIM //+ (i*layout.NEURON_X_DIF);
                    var starty = layout.NEURON_LARGE_Y;//layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF);
                    var endx = layout.NEURON_LARGE_LEFTLIM;//layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                    var endy = layout.NEURON_UPPERLIM + (k*layout.NEURON_LARGE_Y_DIF);
                    
                    var hitbuffer = 10;
                    weightSprite.interactive=true;

                    weightSprite.drawPolygon(startx, starty, endx, endy);
                    weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                            endx, endy +hitbuffer,
                                                            endx, endy -hitbuffer,
                                                            startx, starty -hitbuffer);

                    var addweight = new Button("+",PIXI.Texture.from('images/buttons/plus.png'),(startx+endx)/2,(starty+endy)/2,false);
                      addweight.anchor.set(0.5);
                    var loseweight = new Button("-",PIXI.Texture.from('images/buttons/minus.png'),((startx+endx)/2)-25,(starty+endy)/2,false);
                      addweight.anchor.set(0.5);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){
                        this.getChildByName("+").visible=true;
                        this.getChildByName("-").visible=true;
                    });
                    
                    weightSprite.on('mouseout', function(e){
                        this.getChildByName("+").visible=false;
                        this.getChildByName("-").visible=false;
                    });

                    addweight.on('click', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight+0.1);
                        net.update();
                        slide.draw_update_large(net);
                  
                    });
  
                    loseweight.on('click', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight-0.1);
                        net.update();
                        slide.draw_update_large(net);
                    });

                    this.weightsContainer.addChild(weightSprite);
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

            var ins=[];            
            var str = "  ";

            for (var ii=0;ii<net.getLayer(i).neurons[j].inputs.length;ii++){
                ins.push(new Array(2));
                ins[ii][0]=net.getLayer(i).neurons[j].inputs[ii].toFixed(2);
                ins[ii][1]=net.getLayer(i).neurons[j].weights[ii].toFixed(2);

                if(ii<3){
                    str=str+ins[ii][0]+" × "+ins[ii][1]+'\n'+"+";
                }
            }
            str=str+formatter.format(net.getLayer(i).neurons[j].bias)+"\n━━━━━"+"\n   "+formatter.format(net.getLayer(i).neurons[j].output_nofn)

            var overText = new PIXI.Text(str,small);
            overText.anchor.set(0,0.5);
            overText.x=-65;

            var overText2 = new PIXI.Text(" 𝑓("+formatter.format(net.getLayer(i).neurons[j].output_nofn)+")="+"\n\n  "+formatter.format(net.getLayer(i).neurons[j].output),
            new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontWeight: 500,
                fontSize: 14,
            }));
            overText2.anchor.set(0,0.5);
            overText2.x=5;


            var neuronOver = new PIXI.Sprite(PIXI.Texture.from('images/overneuron.png'));
                neuronOver.anchor.set(0.5);
                neuronOver.scale.set(1.5);
                neuronOver.name = neuronBase.name;
                neuronOver.x=neuronBase.x;
                neuronOver.y=neuronBase.y;
                neuronOver.alpha=0;
            neuronOver.addChild(overText,overText2);



            
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
            
            this.neuronContainer.addChild(this.neuronBases, this.neuronOvers, this.neuronSensors);
            
            }
        }
    }

    drawNeurons_init_large(net){
        this.neuronContainer.removeChildren();
        this.neuronBases.removeChildren();
        this.neuronOvers.removeChildren();
        this.neuronSensors.removeChildren();
      
        for(var i = 0; i<net.layers.length; i++){
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){
            var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron_large.png'));
            
            neuronBase.anchor.set(0.5);
            neuronBase.name = i.toString() + j.toString();

            neuronBase.x = layout.NEURON_LARGE_X;
            neuronBase.y = layout.NEURON_LARGE_Y;

            var ins=[];
            for (var ii=0;ii<net.getLayer(i).neurons[j].inputs.length;ii++){
                ins.push(new Array(2));
                ins[ii][0]=net.getLayer(i).neurons[j].inputs[ii].toFixed(2);
                ins[ii][1]=net.getLayer(i).neurons[j].weights[ii].toFixed(2);

            }

            var overText_weights = new PIXI.Text(
                "    "+ins[0][0] + " × " + ins[0][1]
                +'\n'+ " + " +ins[1][0] + " × " + ins[1][1] 
                + '\n' + " + " + formatter.format(net.getLayer(i).neurons[j].bias)
                + '\n' + "  ━━━━━",
                new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontWeight: 500,
                    fontSize: 25
                })
            );
            overText_weights.anchor.set(0,0.5);
            overText_weights.x=-170;

            var overText_outnofn = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),
                new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontWeight: 500,
                    fontSize: 30,
                    fill: 0x00FF00
                })
            );
            overText_outnofn.anchor.set(1,0.5);
            overText_outnofn.x=-60;
            overText_outnofn.y=70;

            var overText_f= new PIXI.Text("𝑓 ", new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontWeight: 500,
                fontSize: 60,
            }));
            overText_f.x=10;
            overText_f.y=-50;

            var overText_paren= new PIXI.Text("(           ) =", new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontWeight: 500,
                fontSize: 25,
            }));
            overText_paren.x=35;
            overText_paren.y=-20;
            
            var overText_actfn = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn), new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontWeight: 500,
                fontSize: 30,
                fill: 0x00FF00
            }));
            overText_actfn.anchor.set(1,0.5);
            overText_actfn.x=115;
            overText_actfn.y=-5;

            var overText_actfn_out = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output), new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontWeight: 500,
                fontSize: 40,
                fill: 0xFF0000,
            }));
            overText_actfn_out.anchor.set(1,0.5);
            overText_actfn_out.x=105;
            overText_actfn_out.y=50;
                
            neuronBase.addChild(overText_weights,overText_outnofn);
            neuronBase.addChild(overText_f,overText_paren,overText_actfn,overText_actfn_out);

            this.neuronBases.addChild(neuronBase);
            this.neuronContainer.addChild(this.neuronBases);
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

    drawNeurons_update_large(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){

                var name = i.toString() + j.toString();

                var currBase = this.neuronContainer.getChildByName("neuronBases").getChildByName(name);
//                currBase.getChildAt(0).text="hi";
                // currBase.text="hi";
                var ins=[];
                
                for (var ii=0;ii<net.getLayer(i).neurons[j].inputs.length;ii++){
                    ins.push(new Array(2));
                    ins[ii][0]=net.getLayer(i).neurons[j].inputs[ii].toFixed(2);
                    ins[ii][1]=net.getLayer(i).neurons[j].weights[ii].toFixed(2);
                }
                currBase.getChildAt(0).text="    "+ins[0][0] + " × " + ins[0][1]
                +'\n'+ " + " +ins[1][0] + " × " + ins[1][1] 
                + '\n' + " + " + formatter.format(net.getLayer(i).neurons[j].bias)
                + '\n' + "  ━━━━━";

                currBase.getChildAt(1).text=formatter.format(net.getLayer(i).neurons[j].output_nofn);

                /*currBase.getChildAt(2).text="𝑓("+ formatter.format(net.getLayer(i).neurons[j].output_nofn)+") ="
                + '\n\n' + "   "+formatter.format(net.getLayer(i).neurons[j].output);*/
                
                currBase.getChildAt(4).text=formatter.format(net.getLayer(i).neurons[j].output_nofn);
                currBase.getChildAt(5).text=formatter.format(net.getLayer(i).neurons[j].output);
            }
        }
    }


    drawInputs_init(net){
       this.inputContainer.removeChildren();

        for(var i = 0; i<net.netInput.length; i++){

            var inputBase = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_Y_DIF) + layout.NEURON_UPPERLIM + layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputContainer.addChild(inputBase);

            var inputText = new PIXI.Text(net.netInput[i]);
                inputText.anchor.set(0.5);
                inputText.name = inputBase.name;
            inputBase.addChild(inputText);
        }
    }

    drawInputs_init_large(net){
        this.inputContainer.removeChildren();

        for(var i = 0; i<net.netInput.length; i++){

            var inputBase = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
                inputBase.scale.set(1.2);
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LARGE_LEFTLIM //- layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_LARGE_Y_DIF) + layout.NEURON_UPPERLIM; //+ layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputContainer.addChild(inputBase);

            var inputText = new PIXI.Text(net.netInput[i],medium);
                inputText.anchor.set(0.5);
                inputText.name = inputBase.name;
            inputBase.addChild(inputText);
        }

    }

    drawInputs_update(net){
        for(var i = 0; i<net.netInput.length; i++){

            var name = i.toString();
            this.inputContainer.getChildByName(name).getChildAt(0).text = net.netInput[i];
        }
    }

    drawLabels_init(net){
        this.labelsContainer.removeChildren();

        for(var i = 0; i<net.data.type.length; i++){

            //final output type labels ex strawberry, blueberry
            var typeLabel = new PIXI.Text(net.data.type[i],medium);
                typeLabel.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF + 30;
                typeLabel.y=layout.NEURON_UPPERLIM + (i*layout.NEURON_Y_DIF) + 25;
            this.labelsContainer.addChild(typeLabel);
        }
        for(var i=0; i<net.data.labels.length; i++){
            // input types ex. length, roundness
            var inputLabel = new PIXI.Text(net.data.labels[i],medium);
                inputLabel.anchor.set(0.5);
                inputLabel.x = layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;
                inputLabel.y = layout.NEURON_UPPERLIM + (i*layout.NEURON_Y_DIF) + 70;
            this.labelsContainer.addChild(inputLabel);
        }

        //target label ex strawberry
        var targetLabel = new PIXI.Text(net.targetText,medium);
            targetLabel.anchor.set(0.5);
            targetLabel.name = "targetLabel";
            targetLabel.x= layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;
            targetLabel.y= layout.NEURON_UPPERLIM - 20;
        this.labelsContainer.addChild(targetLabel);

        var costLabel = new PIXI.Text("cost" + '\n' +formatter_long.format(net.costTot),medium);
            costLabel.name = "costLabel";
            costLabel.x=450;
            costLabel.y=50;
        this.labelsContainer.addChild(costLabel);
    }

    drawLabels_update(net){
        this.labelsContainer.getChildByName("targetLabel").text=net.targetText;
        this.labelsContainer.getChildByName("costLabel").text="cost" + '\n' +formatter_long.format(net.costTot);
    }
/*
    drawText_old(text){
      for (var i =0; i<text.length; i++){

        // need to add sprites here in order to make them work with click
        if(text[i].isSprite){
           //console.log(text[i].isSprite)
           this.textContainer.addChild(text[i]);

        } else {
        var t = new PIXI.Text(text[i][0],typewriter);
          t.x=text[i][1];
          t.y=text[i][2];

        var boxbounds = t.getLocalBounds();
        var textbox=new PIXI.Graphics();
        textbox.beginFill(0xFFFFFF);
        textbox.drawRect(t.x-5,t.y-5,boxbounds.width+10,boxbounds.height+10);
        this.textContainer.addChild(textbox);
        textbox.addChild(t);

      }
      this.textContainer.getChildAt(i).visible=false;

    }
      this.textContainer.getChildAt(0).visible=true;
    }

/*
    var textIntro2 = [
        ["So how does it work?", 50, 100],
        ["In order to train our network,"+'\n'+" we need to give it some examples"+'\n'+"of data we want to classify." , 50, 170],
        examples,
        ["Using our big human brains,"+'\n'+" we label these examples with the right answers" , 50, 250],
        examples_labels
    ];
*/

/*
var textIntro2_test = [
    [ ["So", typewriter], ["how"], ["does it work"], [50, 100]],
    [ ["we train with examples"], [69, 420] ],

];
*/
    drawText(text){
        //for the whole text thing
        for (var i =0; i<text.length; i++){
            if(text[i].isSprite){
                this.textContainer.addChild(text[i]);
            } else {


            var textLineContainer= new PIXI.Container();
            var textwidth =0;
            var textheight =0;

            for(var j=0; j<(text[i].length)-1; j++){

                if(text[i][j][1] === undefined){
                    var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0], typewriter).width;
                    var textheight_temp=PIXI.TextMetrics.measureText(text[i][j][0], typewriter).height;

                } else {
                    var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0], text[i][j][1]).width;
                    var textheight_temp=PIXI.TextMetrics.measureText(text[i][j][0], text[i][j][1]).height;
                }
                textwidth=textwidth+textwidth_temp;
                
                if(textheight_temp>textheight){
                    textheight=textheight_temp;
                }
            }
           // console.log("TEXTWIDTH:" + textwidth);
           // console.log("TEXTHEIGHT:" + textheight);
            
            var textbox= new PIXI.Graphics();
            
            textbox.beginFill(0xFFFFFF);
            textbox.drawRect(text[i][(text[i].length)-1][0]-10,text[i][(text[i].length)-1][1]-10,textwidth+20, textheight+20);
           // textbox.drawRect(text[i][text[i][(text[i].length)-1][1],(text[i].length)-1][0],50,textwidth);

            textLineContainer.addChild(textbox);
            //for each text piece
            for(var j=0; j<(text[i].length)-1; j++){
                
                var textPiece= new PIXI.Text(text[i][j][0]);
                textPiece.anchor.set(0,0.5);
                textbox.addChild(textPiece);
                //textLineContainer.addChild(textPiece);
                


                if(text[i][j][1] === undefined){
                    textPiece.style=typewriter;
                } else {
                    textPiece.style=text[i][j][1];
                }
               // textPiece.y=textbox.y;
                textPiece.y=text[i][(text[i].length)-1][1] + textheight/2;


                if(j==0){
                    textPiece.x=text[i][(text[i].length)-1][0];

                } else {
                    //textPiece.x = textLineContainer.getChildAt(j-1).x + textLineContainer.getChildAt(j-1).width;
                    textPiece.x = textbox.getChildAt(j-1).x + textbox.getChildAt(j-1).width;

                }
            }
            this.textContainer.addChild(textLineContainer);
        }
            this.textContainer.getChildAt(i).visible=false;

        }
        this.textContainer.getChildAt(0).visible=true;

    }

      /*
    drawCard(small,cardheight, cardwidth, cardx, cardy, datatype, datalabels, expected, image){
        var card = new PIXI.Sprite(PIXI.Texture.from('images/card.png'));
            card.anchor.set(0.5)
            card.x=cardx;
            card.y=cardy;
            if (small==1){
                card.scale.set(0.5);
            }
        this.cardContainer.addChild(card);
        

        var type = new PIXI.Text(datatype);
            type.anchor.set(0.5);
            type.y = -cardheight/2 + cardheight/8;
        card.addChild(type);

        var l0 = new PIXI.Text(datalabels[0]);
            l0.x = -cardwidth/2 + cardwidth/8;
            l0.y = -cardheight/2 + cardheight*(6/8);
        card.addChild(l0);

        var l1 = new PIXI.Text(datalabels[1]);
            l1.x = -cardwidth/2 + cardwidth/8;
            l1.y = -cardheight/2 + cardheight*(7/8);
        card.addChild(l1);

        var e0 = new PIXI.Text(expected[0]);
            e0.x = -cardwidth/2 + cardwidth*(3/4);
            e0.y = -cardheight/2 + cardheight*(6/8);
        card.addChild(e0);

        var e1 = new PIXI.Text(expected[1]);
            e1.x = -cardwidth/2 + cardwidth*(3/4);
            e1.y = -cardheight/2 + cardheight*(7/8);
        card.addChild(e1);

        var img = new PIXI.Sprite(PIXI.Texture.from(image));
            img.anchor.set(0.5);
        card.addChild(img);
    }*/
}