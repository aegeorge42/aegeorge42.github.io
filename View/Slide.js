import {Button, tintDown, tintOver} from "./Button.js"
import {layout} from "./layout.js"
import {actFns} from "../../Model/actfns.js"
import {data} from "../Model/data.js"
import {viewst} from "../Controller.js"
import {textstyles} from "./textstyles.js"
import { Net } from "../Model/net.js"
import { Graph } from "./Graph.js"
import { loader } from "./View.js"

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
        this.textbuttonContainer  = new PIXI.Container(); 
     
        this.inputContainer = new PIXI.Container();                 
        this.neuronContainer = new PIXI.Container();
            this.neuronBases = new PIXI.Container();
                this.neuronBases.name = "neuronBases";
            this.neuronOvers = new PIXI.Container();
                this.neuronOvers.name = "neuronOvers";          
            this.neuronSensors = new PIXI.Container();  
        this.weightsContainer = new PIXI.Container();
        
        this.labelsContainer = new PIXI.Container();
        this.arrowContainer = new PIXI.Container();


        this.costLabel = new PIXI.Container();
    
        this.textcount = 0; 
        this.textContainer = new PIXI.Container();
        this.graphContainer = new PIXI.Container();
        this.slideContainer=new PIXI.Container();

        this.slideContainer.addChild(                     
                 
                                      this.weightsContainer,
                                      this.labelsContainer,
                                      this.buttonContainer,
                                      this.neuronContainer,
                                      this.arrowContainer,
                                      this.textContainer,
                                      this.inputContainer, 
                                      this.costLabel,
                                      this.graphContainer,
                                      this.textbuttonContainer,
                                      );
       
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
    }

    drawActFnButtons(){
        var actfnsbox = new PIXI.Sprite(loader.resources["images/boxes/actfnsbox.png"].texture);
            actfnsbox.name="actfnsbox";
            if(this.sandbox){
            actfnsbox.x=0;
            actfnsbox.y=155;
            this.buttonContainer.addChild(actfnsbox);

            } else if(this.largefn){
                actfnsbox.x=layout.CX-380;
                actfnsbox.y=layout.CY+55;
                this.textContainer.addChild(actfnsbox);

            }

        var slide=this;
        actfnsbox.addChild(new Button("sigmoid",loader.resources["images/buttons/sigmoid.png"].texture, 75,90,true));
        actfnsbox.getChildByName("sigmoid").on('click', function(e){

            this.setTint(tintDown);
            actfnsbox.getChildByName("relu").tint=0xFFFFFF;
            actfnsbox.getChildByName("relu").tintDefault();


            if(slide.largenet==1){
                slide.slideNet.setNetActFn(actFns.SIGMOID);
                slide.slideNet.update_single();
                slide.draw_update_large(slide.slideNet);
            } else {
                slide.slideNet.setNetActFn(actFns.SIGMOID);
                slide.slideNet.update();
                slide.draw_update(slide.slideNet);
            }

        });

        actfnsbox.getChildByName("sigmoid").on('tap', function(e){

            this.setTint(tintDown);
            actfnsbox.getChildByName("relu").tint=0xFFFFFF;
            actfnsbox.getChildByName("relu").tintDefault();


            if(slide.largenet==1){
                slide.slideNet.setNetActFn(actFns.SIGMOID);
                slide.slideNet.update_single();
                slide.draw_update_large(slide.slideNet);
            } else {
                slide.slideNet.setNetActFn(actFns.SIGMOID);
                slide.slideNet.update();
                slide.draw_update(slide.slideNet);
            }

        });

        actfnsbox.addChild(new Button("relu",loader.resources["images/buttons/relu.png"].texture, 75, 135,true));
        actfnsbox.getChildByName("relu").on('click', function(e){

            this.setTint(tintDown);
            actfnsbox.getChildByName("sigmoid").tint=0xFFFFFF;
            actfnsbox.getChildByName("sigmoid").tintDefault();

            this.isclick=true
            if(slide.largenet==1){
                slide.slideNet.setNetActFn(actFns.RELU);
                slide.slideNet.update_single();
                slide.draw_update_large(slide.slideNet);
            } else {
                slide.slideNet.setNetActFn(actFns.RELU);
                slide.slideNet.update();
                slide.draw_update(slide.slideNet);
            }
            
        });

        actfnsbox.getChildByName("relu").on('tap', function(e){

            this.setTint(tintDown);
            actfnsbox.getChildByName("sigmoid").tint=0xFFFFFF;
            actfnsbox.getChildByName("sigmoid").tintDefault();

            this.isclick=true
            if(slide.largenet==1){
                slide.slideNet.setNetActFn(actFns.RELU);
                slide.slideNet.update_single();
                slide.draw_update_large(slide.slideNet);
            } else {
                slide.slideNet.setNetActFn(actFns.RELU);
                slide.slideNet.update();
                slide.draw_update(slide.slideNet);
            }
            
        });

        if(slide.slideNet.netActFn==actFns.RELU){
            actfnsbox.getChildByName("relu").setTint(tintDown);
        } else if(slide.slideNet.netActFn==actFns.SIGMOID){
            actfnsbox.getChildByName("sigmoid").setTint(tintDown);
        }
    }

    drawLayerButtons(){
        var slide = this;
        var buttonNeuronAddContainer = new PIXI.Container();
            buttonNeuronAddContainer.name="buttonNeuronAddContainer";
        var buttonNeuronRemContainer = new PIXI.Container();
            buttonNeuronRemContainer.name="buttonNeuronRemContainer";

        this.buttonContainer.addChild(buttonNeuronAddContainer,buttonNeuronRemContainer);

        //ADD LAYER
        var layersbox = new PIXI.Sprite(loader.resources["images/boxes/layersbox.png"].texture);
            layersbox.name="layersbox";
            layersbox.anchor.set(0.5)
            layersbox.x= layout.NEURON_LEFTLIM;
            layersbox.y= layout.NEURON_UPPERLIM-135;
            this.buttonContainer.addChild(layersbox);

        layersbox.addChild(new Button("addlayer",loader.resources["images/buttons/button_layer.png"].texture, -30, 0,true));
        layersbox.addChild(new Button("remlayer",loader.resources["images/buttons/button_removelayer.png"].texture, 80, 0, true));

        layersbox.getChildByName("addlayer").on('click', function(e){
            if(slide.slideNet.layers.length<slide.slideNet.maxLayers){

            slide.slideNet.addLayer();
            slide.slideNet.update();
            slide.draw_init(slide.slideNet);
            }
        });

        layersbox.getChildByName("addlayer").on('tap', function(e){
            if(slide.slideNet.layers.length<slide.slideNet.maxLayers){

            slide.slideNet.addLayer();
            slide.slideNet.update();
            slide.draw_init(slide.slideNet);
            }
        });
        

        // REMOVE LAYER
        layersbox.getChildByName("remlayer").on('click', function(e){
            if(slide.slideNet.layers.length>1){
                slide.slideNet.removeLayer();
                slide.slideNet.update();
                slide.draw_init(slide.slideNet);
            }
        });

        layersbox.getChildByName("remlayer").on('tap', function(e){
            if(slide.slideNet.layers.length>1){
                slide.slideNet.removeLayer();
                slide.slideNet.update();
                slide.draw_init(slide.slideNet);
            }
        });

        for (var i =0; i<slide.slideNet.maxLayers; i++){
            this.buttonContainer.getChildByName("buttonNeuronAddContainer").addChild(new Button("addneuron",loader.resources["images/buttons/button_addneuron.png"].texture,layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),layout.NEURON_UPPERLIM-80, false));
            this.buttonContainer.getChildByName("buttonNeuronRemContainer").addChild(new Button("remneuron",loader.resources["images/buttons/button_removeneuron.png"].texture,layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),layout.NEURON_UPPERLIM-50, false));
            this.setNeuronButtons(i);
            
          }
    }

    setNeuronButtons(layernum){
        var slide = this;
    
        this.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(layernum).on('click', function(e){
          if(slide.slideNet.getLayer(layernum).neurons.length<slide.slideNet.maxNeurons){
            slide.slideNet.getLayer(layernum).addNeuron();
            slide.slideNet.update();
            slide.draw_init(slide.slideNet);
          }
        });
    
        this.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(layernum).on('tap', function(e){
            if(slide.slideNet.getLayer(layernum).neurons.length<slide.slideNet.maxNeurons){
              slide.slideNet.getLayer(layernum).addNeuron();
              slide.slideNet.update();
              slide.draw_init(slide.slideNet);
            }
          });

        this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(layernum).on('click', function(e){
            if(slide.slideNet.getLayer(layernum).neurons.length>1){

                slide.slideNet.getLayer(layernum).removeNeuron();
                slide.slideNet.update();
                slide.draw_init(slide.slideNet);
            }
        });

        this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(layernum).on('tap', function(e){
            if(slide.slideNet.getLayer(layernum).neurons.length>1){

                slide.slideNet.getLayer(layernum).removeNeuron();
                slide.slideNet.update();
                slide.draw_init(slide.slideNet);
            }
        });
    }



    drawRateButtons(){
        var slide=this;
        var ratebox = new PIXI.Sprite(loader.resources["images/boxes/ratebox.png"].texture);
            ratebox.name="ratebox";
            if(this.sandbox){
            
            ratebox.x= 0;
            ratebox.y= 315;
            } else {
                ratebox.x= layout.CX-225;
                
                ratebox.y= layout.CY-215;
            }

        this.buttonContainer.addChild(ratebox);
        
        ratebox.addChild(new Button("inc_rate",loader.resources["images/buttons/plus.png"].texture,60,98,true));
        ratebox.addChild(new Button("dec_rate",loader.resources["images/buttons/minus.png"].texture,90,98,true));

        var rateback = new PIXI.Graphics();
            rateback.beginFill(0xFFFFFF)
            rateback.drawRect(25,45,100,35);
            ratebox.addChild(rateback);

        
        var rateText = new PIXI.Text(slide.slideNet.learnRate.toFixed(4));
            rateText.name="rateText";
            rateText.x=35;
            rateText.y=49;
        ratebox.addChild(rateText);

        
        var rates= [0.0001, 0.001, 0.01, 0.03, 0.1, 0.3, 0.5, 1.0];
        var rate_start=0;
        for(var i = 0; i<rates.length; i++){
            if(rates[i] ==slide.slideNet.learnRate){
                rate_start=i;
            }
        }

        var clickcount=0;
        ratebox.getChildByName("inc_rate").on('click', function(e){
            if(rates[rate_start+clickcount+1] !==undefined){
                clickcount++;
                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);
                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4);
                slide.drawWeights_update(slide.slideNet);

            }
        });

        ratebox.getChildByName("inc_rate").on('tap', function(e){
            if(rates[rate_start+clickcount+1] !==undefined){
                clickcount++;
                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);
                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4);
                slide.drawWeights_update(slide.slideNet);

            }
        });

        ratebox.getChildByName("dec_rate").on('click', function(e){
            if(rates[rate_start+clickcount-1] !==undefined){
                clickcount--;

                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);//slide.slideNet.learnRate*10)
                console.log(slide.slideNet.learnRate);

                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4)//"hi"//slide.slideNet.learnRate;
                slide.drawWeights_update(slide.slideNet);
            }
                });

        ratebox.getChildByName("dec_rate").on('tap', function(e){
            if(rates[rate_start+clickcount-1] !==undefined){
                clickcount--;

                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);//slide.slideNet.learnRate*10)
                console.log(slide.slideNet.learnRate);

                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4)//"hi"//slide.slideNet.learnRate;
                slide.drawWeights_update(slide.slideNet);
            }
        });
    }

  

    drawLearnButtons(graph){

        
        var slide=this;
        this.pauselearn=0;

        this.loopcount=0;

        var learnbox = new PIXI.Sprite(loader.resources["images/boxes/learnbox.png"].texture);
            learnbox.name="learnbox";
            learnbox.x= 6;
            learnbox.y= 50; 
        this.buttonContainer.addChild(learnbox);

        if(!slide.sandbox){
            learnbox.x=layout.CX-480;
            learnbox.y=layout.CY-210;

        }

        var epoch = new PIXI.Text("0");
            epoch.anchor.set(0.5,0)
            epoch.name="epoch"

            epoch.x=0
            epoch.y=0

        var epochbox = new PIXI.Sprite(loader.resources["images/boxes/epochbox.png"].texture);
            epochbox.name="epochbox";
            epochbox.anchor.set(0.5)
            epochbox.x=window.innerWidth-200;
            epochbox.y=layout.BOTTOMBUFFER-280;

        if(slide.sandbox){
            slide.costLabel.addChild(epochbox);    
            epochbox.addChild(epoch);  
        }  

        learnbox.addChild(new Button("learn_stoch_step",loader.resources["images/buttons/step.png"].texture,212.5,60,true));
        learnbox.getChildByName("learn_stoch_step").on('click', function(e){
            slide.slideNet.learn();
            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

        });
        
        learnbox.getChildByName("learn_stoch_step").on('tap', function(e){
            slide.slideNet.learn();
            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

        });

        learnbox.addChild(new Button("learn_stoch",loader.resources["images/buttons/learn.png"].texture,125,60,true));
        learnbox.getChildByName("learn_stoch").pressCount=0;
        learnbox.getChildByName("learn_stoch").on('click', async function(e){
            
            this.pressCount++;
            slide.pauselearn = 0;

            if(slide.pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
            }

            //no double clicks
            if(this.pressCount==1){ 
            while(slide.pauselearn==0){
                slide.slideNet.learn();
                slide.draw_update(slide.slideNet);
                
                if(graph){graph.updateGraph(slide.slideNet,graph);}
                await slide.sleep(10); //pause to see updates - 10 seems good

                slide.loopcount=slide.loopcount+1;

                if(slide.sandbox){
                slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                }

                if(slide.loopcount==slide.looplim){
                    break;
                }


            }

            slide.looplim=slide.looplim+1000;
            slide.pauselearn=1;
            learnbox.getChildByName("pause").visible=false;
            this.pressCount=0;

        }
        
        });

        learnbox.getChildByName("learn_stoch").on('tap', async function(e){
            
            this.pressCount++;
            slide.pauselearn = 0;

            if(slide.pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
            }

            //no double clicks
            if(this.pressCount==1){ 
            while(slide.pauselearn==0){
                slide.slideNet.learn();
                slide.draw_update(slide.slideNet);
                
                if(graph){graph.updateGraph(slide.slideNet,graph);}
                await slide.sleep(10); //pause to see updates - 10 seems good

                slide.loopcount=slide.loopcount+1;

                if(slide.sandbox){
                slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                }

                if(slide.loopcount==slide.looplim){
                    break;
                }


            }

            slide.looplim=slide.looplim+1000;
            slide.pauselearn=1;
            learnbox.getChildByName("pause").visible=false;
            this.pressCount=0;

        }
        
        });

        learnbox.addChild(new Button("learn_van_step",loader.resources["images/buttons/step.png"].texture,212.5,60,true));
        learnbox.getChildByName("learn_van_step").on('click', async function(e){
            slide.loopcount=slide.loopcount+1;
            if(slide.sandbox){
            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }
           
            slide.slideNet.learn_batch();
            slide.slideNet.setNetInput(slide.slideNet.data.points[slide.slideNet.dataIdx]);

            await slide.sleep(10);

            slide.slideNet.update();

            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

            

        });

        learnbox.getChildByName("learn_van_step").on('tap', async function(e){
            slide.loopcount=slide.loopcount+1;
            if(slide.sandbox){
            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }
           
            slide.slideNet.learn_batch();
            slide.slideNet.setNetInput(slide.slideNet.data.points[slide.slideNet.dataIdx]);

            await slide.sleep(10);

            slide.slideNet.update();

            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

            

        });

        learnbox.addChild(new Button("learn_van",loader.resources["images/buttons/learn.png"].texture, 125,60,true));
        learnbox.getChildByName("learn_van").pressCount=0;

        slide.looplim=1000;
        learnbox.getChildByName("learn_van").on('click', async function(e){
            
            this.pressCount++;
            slide.pauselearn=0;

            if(slide.pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
            }

            if(this.pressCount==1){
                console.log("here");
                console.log(slide.pauselearn)

                while(slide.pauselearn==0){

                    await slide.sleep(10);
                    slide.slideNet.learn_batch();

                    slide.slideNet.setNetInput(slide.slideNet.data.points[slide.slideNet.dataIdx]);


                    slide.slideNet.update();
                    slide.draw_update(slide.slideNet);   
            
                    if(graph){graph.updateGraph(slide.slideNet,graph);}

        
                    slide.loopcount=slide.loopcount+1;

                    if(slide.sandbox){
                        slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                    }

                    if(slide.loopcount==slide.looplim){
                        break;
                    }

                }

                slide.looplim=slide.looplim+1000;
                slide.pauselearn=1;
                learnbox.getChildByName("pause").visible=false;
                this.pressCount=0;

            
        }
            
        });

        learnbox.getChildByName("learn_van").on('tap', async function(e){
            
            this.pressCount++;
            slide.pauselearn=0;

            if(slide.pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
            }

            if(this.pressCount==1){

                while(slide.pauselearn==0){

                    await slide.sleep(10);
                    slide.slideNet.learn_batch();

                    slide.slideNet.setNetInput(slide.slideNet.data.points[slide.slideNet.dataIdx]);


                    slide.slideNet.update();
                    slide.draw_update(slide.slideNet);   
            
                    if(graph){graph.updateGraph(slide.slideNet,graph);}

        
                    slide.loopcount=slide.loopcount+1;

                    if(slide.sandbox){
                        slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                    }

                    if(slide.loopcount==slide.looplim){
                        break;
                    }

                }

                slide.looplim=slide.looplim+1000;
                slide.pauselearn=1;
                learnbox.getChildByName("pause").visible=false;
                this.pressCount=0;

            
        }
            
        });

        learnbox.addChild(new Button("pause",loader.resources["images/buttons/pause.png"].texture,125,60,false));
        slide.pauselearn=0;
        learnbox.getChildByName("pause").on('click', function(e){
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_stoch").pressCount=0;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").pressCount=0;

            slide.pauselearn=1;
            this.visible=false;
        });
        learnbox.getChildByName("pause").on('tap', function(e){
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_stoch").pressCount=0;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").pressCount=0;

            slide.pauselearn=1;
            this.visible=false;
        });





        learnbox.addChild(new Button("reset",loader.resources["images/buttons/reset.png"].texture,38,60,true));        
        learnbox.getChildByName("reset").on('click', function(e){
            slide.loopcount=0;
            slide.looplim=1000;
            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";

            if(slide.sandbox){

                layout.NEURON_Y_DIF=125;
                layout.NEURON_LEFTLIM= layout.NEURON_LEFTLIM_SANDBOX;

                slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                graph.clearGraphBg();

                for(var i=0;i<slide.slideNet.layers.length;i++){
                    slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                    slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
                }

                var newnet = new Net();
                newnet.setNetData(slide.slideNet.data);
                newnet.setNetActFn(slide.slideNet.netActFn);
                newnet.setLearnRate(slide.slideNet.learnRate);
                  //  console.log("old: "+slide.slideNet.netActFn + "new: "+ newnet.netActFn);
                newnet.getLayer(0).addNeuron();
                newnet.getLayer(0).addNeuron();
                newnet.setOutLayer();
                newnet.update();
                slide.slideNet=newnet;

                slide.slideNet.checkInit();
                slide.slideNet.update();
                slide.draw_init(newnet);
                layout.NEURON_Y_DIF=125;

            } else {
                layout.NEURON_Y_DIF = 175;
                layout.NEURON_X_DIF = 135;


                layout.NEURON_LEFTLIM = window.innerWidth/2 - 310;

                var backpropx_cost= layout.LEFTBUFFER + layout.NEURON_LEFTLIM+layout.NEURON_X_DIF +200;

                var newnet = new Net();
                newnet.setNetData(slide.slideNet.data);
                newnet.setNetActFn(slide.slideNet.netActFn);
                newnet.setLearnRate(slide.slideNet.learnRate);

                newnet.setOutLayer();
                newnet.update();
                slide.slideNet=newnet;


                slide.slideNet.checkInit();
                slide.slideNet.update();
                slide.draw_init(newnet);
                slide.drawWeights_update(slide.slideNet);

                layout.NEURON_Y_DIF=125;

            }

        });

        learnbox.getChildByName("reset").on('tap', function(e){
            slide.loopcount=0;
            slide.looplim=1000;
            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";

            if(slide.sandbox){

                layout.NEURON_Y_DIF=125;
                layout.NEURON_LEFTLIM= layout.NEURON_LEFTLIM_SANDBOX;

                slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
                graph.clearGraphBg();

                for(var i=0;i<slide.slideNet.layers.length;i++){
                    slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                    slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
                }

                var newnet = new Net();
                newnet.setNetData(slide.slideNet.data);
                newnet.setNetActFn(slide.slideNet.netActFn);
                newnet.setLearnRate(slide.slideNet.learnRate);
                  //  console.log("old: "+slide.slideNet.netActFn + "new: "+ newnet.netActFn);
                newnet.getLayer(0).addNeuron();
                newnet.getLayer(0).addNeuron();
                newnet.setOutLayer();
                newnet.update();
                slide.slideNet=newnet;

                slide.slideNet.checkInit();
                slide.slideNet.update();
                slide.draw_init(newnet);
                layout.NEURON_Y_DIF=125;

            } else {
                layout.NEURON_Y_DIF = 175;
                layout.NEURON_X_DIF = 135;


                layout.NEURON_LEFTLIM = window.innerWidth/2 - 310;

                var backpropx_cost= layout.LEFTBUFFER + layout.NEURON_LEFTLIM+layout.NEURON_X_DIF +200;

                var newnet = new Net();
                newnet.setNetData(slide.slideNet.data);
                newnet.setNetActFn(slide.slideNet.netActFn);
                newnet.setLearnRate(slide.slideNet.learnRate);

                newnet.setOutLayer();
                newnet.update();
                slide.slideNet=newnet;


                slide.slideNet.checkInit();
                slide.slideNet.update();
                slide.draw_init(newnet);
                slide.drawWeights_update(slide.slideNet);

                layout.NEURON_Y_DIF=125;

            }

        });

        if(this.backprop){
            learnbox.getChildByName("learn_van").visible=false;
            learnbox.getChildByName("learn_van_step").visible=false;

        }
        
    }


    
    drawDataButtons(graph){

        var newdatax=window.innerWidth-260;
        var newdatay= 50
        var slide=this;
        
        var databox= new PIXI.Sprite(loader.resources["images/boxes/databox.png"].texture);
        databox.name="databox";
            databox.x=newdatax
            databox.y=newdatay
        this.buttonContainer.addChild(databox);

        databox.addChild(new Button("newdata",loader.resources["images/buttons/datalin.png"].texture,100,88,true));   
        databox.getChildByName("newdata").on('click', function(e){

            slide.looplim=1000;
            slide.loopcount=0;

            graph.clearGraph_all(slide.slideNet.data);
            if(slide.sandbox){

            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }

            graph.posAxis();
            graph.axis.texture=(loader.resources["images/graph/axis.png"].texture);

            for(var i=0;i<slide.slideNet.layers.length;i++){
                slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
            }            

            var newdata = new data(0,["strawberry","blueberry"],["length", "roundness"]);
            newdata.makefruits_linear();
            newdata.shuffle();
            slide.slideNet.setNetData(newdata);
            slide.slideNet.setNetInput(newdata.points[0]);
            slide.slideNet.update();
            slide.draw_update(slide.slideNet);
            graph.populateGraph(newdata);

            var newnet = new Net();
            
            newnet.setNetData(slide.slideNet.data);
            newnet.setNetActFn(slide.slideNet.netActFn);
            newnet.getLayer(0).addNeuron();
            newnet.getLayer(0).addNeuron();
            newnet.setOutLayer();
            newnet.update();
            slide.slideNet=newnet;
            slide.draw_init(newnet);

            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";



        });

        databox.getChildByName("newdata").on('tap', function(e){

            slide.looplim=1000;
            slide.loopcount=0;

            graph.clearGraph_all(slide.slideNet.data);
            if(slide.sandbox){

            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }

            graph.posAxis();
            graph.axis.texture=(loader.resources["images/graph/axis.png"].texture);

            for(var i=0;i<slide.slideNet.layers.length;i++){
                slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
            }            

            var newdata = new data(0,["strawberry","blueberry"],["length", "roundness"]);
            newdata.makefruits_linear();
            newdata.shuffle();
            slide.slideNet.setNetData(newdata);
            slide.slideNet.setNetInput(newdata.points[0]);
            slide.slideNet.update();
            slide.draw_update(slide.slideNet);
            graph.populateGraph(newdata);

            var newnet = new Net();
            
            newnet.setNetData(slide.slideNet.data);
            newnet.setNetActFn(slide.slideNet.netActFn);
            newnet.getLayer(0).addNeuron();
            newnet.getLayer(0).addNeuron();
            newnet.setOutLayer();
            newnet.update();
            slide.slideNet=newnet;
            slide.draw_init(newnet);

            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";



        });

        databox.addChild(new Button("newdata_circle",loader.resources["images/buttons/datacircle.png"].texture,195,88,true));   
        databox.getChildByName("newdata_circle").on('click', function(e){
            slide.looplim=1000;

            graph.clearGraph_all(slide.slideNet.data);
            slide.loopcount=0;

            if(slide.sandbox){
            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }

            graph.negAxis();
            graph.axis.texture=loader.resources["images/graph/axis_neg.png"].texture;

            for(var i=0;i<slide.slideNet.layers.length;i++){
                slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
            }

            var newdata = new data(0,["strawberry","blueberry"],["length", "roundness"]);
                newdata.large=true;

            newdata.makefruits_circle_newaxis();
            newdata.shuffle();
            slide.slideNet.setNetData(newdata);
            slide.slideNet.setNetInput(newdata.points[0]);
            slide.slideNet.update();
            slide.draw_update(slide.slideNet);
            graph.populateGraph(newdata);

            var newnet = new Net();
            
            newnet.setNetData(slide.slideNet.data);
            newnet.setNetActFn(slide.slideNet.netActFn);
            newnet.getLayer(0).addNeuron();
            newnet.getLayer(0).addNeuron();
            newnet.setOutLayer();
            newnet.update();
            slide.slideNet=newnet;
            slide.draw_init(newnet);

            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";


        });

        databox.getChildByName("newdata_circle").on('tap', function(e){
            slide.looplim=1000;

            graph.clearGraph_all(slide.slideNet.data);
            slide.loopcount=0;

            if(slide.sandbox){
            slide.costLabel.getChildByName("epochbox").getChildByName("epoch").text=slide.loopcount;
            }

            graph.negAxis();
            graph.axis.texture=loader.resources["images/graph/axis_neg.png"].texture;

            for(var i=0;i<slide.slideNet.layers.length;i++){
                slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
            }

            var newdata = new data(0,["strawberry","blueberry"],["length", "roundness"]);
                newdata.large=true;

            newdata.makefruits_circle_newaxis();
            newdata.shuffle();
            slide.slideNet.setNetData(newdata);
            slide.slideNet.setNetInput(newdata.points[0]);
            slide.slideNet.update();
            slide.draw_update(slide.slideNet);
            graph.populateGraph(newdata);

            var newnet = new Net();
            
            newnet.setNetData(slide.slideNet.data);
            newnet.setNetActFn(slide.slideNet.netActFn);
            newnet.getLayer(0).addNeuron();
            newnet.getLayer(0).addNeuron();
            newnet.setOutLayer();
            newnet.update();
            slide.slideNet=newnet;
            slide.draw_init(newnet);

            slide.costLabel.getChildByName("costBox").getChildByName("costText").text="-";


        });

    }


    draw_init(net){

        if(this.sandbox){
            layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_SANDBOX;
            layout.NEURON_X_DIF=150;


        } else if(this.backprop){
            layout.NEURON_LEFTLIM= layout.NEURON_LEFTLIM_BACKPROP;
        } else {
            layout.NEURON_LEFTLIM=layout.NEURON_LEFTLIM_INIT;
            layout.NEURON_X_DIF=150;


        }
        this.drawWeights_init(net);
        this.drawNeurons_init(net);
        this.drawInputs_init(net);
        this.drawLabels_init(net);
        this.drawCost_update(net);

        
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
        this.drawLabels_init_large(net);
    }

    draw_update(net){
        this.drawNeurons_update(net);
        this.drawWeights_update(net);
        this.drawInputs_update(net);
        this.drawLabels_update(net);
        this.drawCost_update(net);
    }

    draw_update_large(net){
        this.drawNeurons_update_large(net);
        this.drawWeights_update(net);
    }
        
    drawWeights_init(net){
        var slide = this;
        this.weightsContainer.removeChildren();

        var addedlabels=0;
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
                for(var k = 0; k<net.getLayer(i).neurons[j].weights.length; k++){
                    var weightSprite=new PIXI.Graphics();
                    weightSprite.name = i.toString() + j.toString() + k.toString();
                    weightSprite.idx = [i,j,k];

                    var thickness = Math.abs(net.getLayer(i).neurons[j].weights[k] * 10) + 1;
                    var color = 0x000000;

                    //positive weight = blue, negative = orange
                    if(net.getLayer(i).neurons[j].weights[k] < 0){
                        color = 0xFF8000;;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x0080e8;
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
                    
                    if(this.backprop){

                        starty= layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF)+100
                        endy =  layout.NEURON_UPPERLIM + (k*layout.NEURON_Y_DIF)+100;
                        var hilitecolor=0xb7ff00;
                        
                        if(i==1 && j==0 && k==0 && !this.w1 && !this.none){
                        var hilite = new PIXI.Graphics();
                            hilite.lineStyle(20, hilitecolor);
                            hilite.alpha=0.5;
                            hilite.drawPolygon(startx, startyf, endx, endy);
                            this.weightsContainer.addChild(hilite);
                        }

                        if(this.w1){
                            if(i==0 && j==0 && k==0){
                            startx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF);
                            startyf = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;

                            endx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                                var hilite = new PIXI.Graphics();
                            hilite.lineStyle(20, hilitecolor);
                            hilite.alpha=0.5
                            hilite.drawPolygon(startx, starty, endx, endy0);
                            this.weightsContainer.addChild(hilite)

                            }
                        }

                        if(this.w1_all){
                            if(i==0 && j==0 && k==0){
                            startx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF);
                            startyf = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;

                            endx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                            
                            var hilite = new PIXI.Graphics();
                            hilite.lineStyle(20, hilitecolor);
                            hilite.alpha=0.5
                            hilite.drawPolygon(startx, starty, endx, endy0);
                            this.weightsContainer.addChild(hilite)

                            }

                            if(i==1 && j==1 && k==0){

                            startx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF);
                            startyf = layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
                            endx = layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                            endy =  layout.NEURON_UPPERLIM + (k*layout.NEURON_Y_DIF)+100;
                            
                            var hilite = new PIXI.Graphics();
                            hilite.lineStyle(20, hilitecolor);
                            hilite.alpha=0.5
                            hilite.drawPolygon(startx, startyf, endx, endy);
                            this.weightsContainer.addChild(hilite)

                            }
                        }
                    }

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

                    if(this.backprop && addedlabels==0){
                        addedlabels=1;
                        var x= layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 ;
                        var y= layout.NEURON_UPPERLIM;
            
                        var w1=new PIXI.Sprite(loader.resources["images/backprop/w1_teal.png"].texture);
                            w1.anchor.set(0.5)
                            w1.x=x+10;
                            w1.y=y+40;
                            
                        var w2=new PIXI.Sprite(loader.resources["images/backprop/w2.png"].texture);
                            w2.anchor.set(0.5)
                            w2.x=x+5;
                            w2.y=y+120;
                        var w3=new PIXI.Sprite(loader.resources["images/backprop/w3_teal.png"].texture);
                            w3.anchor.set(0.5)
                            w3.x=x +135;
                            w3.y=y+45;

                        var w4=new PIXI.Sprite(loader.resources["images/backprop/w4_teal.png"].texture);
                            w4.anchor.set(0.5)
                            w4.x=x+160;
                            w4.y=y+145;

                            if(this.none==true){
                                w1.tint=0x000000;
                                w3.tint=0x000000;
                                w4.tint=0x000000;

                            } else if(this.w3==true){
                                w1.tint=0x000000;
                                w4.tint=0x000000;

                            } else if(this.w1==true || this.w1_all==true){
                                w3.tint=0x000000;
                                w4.tint=0x000000;
                            }

                        this.weightsContainer.addChild(w1,w2,w3,w4)
                    }                    

                    weightSprite.interactive=true;

                    var weightTextBox = new PIXI.Graphics();
                        weightTextBox.beginFill(0xFFFFFF);
                        weightTextBox.drawRect(-35,-10,70,60);
                        weightTextBox.name="weightTextBox";
                        weightTextBox.visible=false;
                        weightTextBox.interactive=true;
                        weightTextBox.on('mouseover', function(e){
                            this.visible=true;
                        });


                    var weightText = new PIXI.Text(net.getLayer(i).getNeuron(j).getWeight(k).toFixed(2),textstyles.default)
                        weightText.visible=false;
                        weightText.anchor.set(0.5);
                        weightText.y=35;
                        weightText.name="weightText";
                    weightSprite.addChild(weightTextBox);
                    weightTextBox.addChild(weightText);


                    var addweight = new Button("+",loader.resources["images/buttons/plus.png"].texture,(startx+endx)/2,(starty+endy)/2,false);
                    var loseweight = new Button("-",loader.resources["images/buttons/minus.png"].texture,((startx+endx)/2)-25,(starty+endy)/2,false);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){

                           var xbuffer=0;
                           var ybuffer=(window.innerHeight-viewst.startheight)/2;
                           if(slide.sandbox){
                               if (window.innerWidth>1280){
                                var xbuffer=-(window.innerWidth-1280)/2;
                               }
                           } else {
                                var xbuffer=(window.innerWidth-viewst.startwidth)/2;
                                var ybuffer=(window.innerHeight-viewst.startheight)/2;
                           }
                        if(!slide.backprop_labels){

                        this.getChildByName("weightTextBox").visible=true;
                        this.getChildByName("weightTextBox").x=e.data.global.x-xbuffer;
                        this.getChildByName("weightTextBox").y=e.data.global.y-10-ybuffer;

                        this.getChildByName("weightTextBox").getChildByName("weightText").visible=true;

                        this.getChildByName("+").x=e.data.global.x+15-xbuffer;
                        this.getChildByName("+").y=e.data.global.y-ybuffer;

                        this.getChildByName("-").x=e.data.global.x-15-xbuffer;
                        this.getChildByName("-").y=e.data.global.y-ybuffer;

                        this.getChildByName("+").visible=true;
                        this.getChildByName("-").visible=true;
                        }
                    });

                    weightSprite.on('tap', function(e){

                        var xbuffer=0;
                        var ybuffer=(window.innerHeight-viewst.startheight)/2;
                        if(slide.sandbox){
                            if (window.innerWidth>1280){
                             var xbuffer=-(window.innerWidth-1280)/2;
                            }
                        } else {
                             var xbuffer=(window.innerWidth-viewst.startwidth)/2;
                             var ybuffer=(window.innerHeight-viewst.startheight)/2;
                        }
                     if(!slide.backprop_labels){
                    
                        if(!this.tapped){
                     this.getChildByName("weightTextBox").visible=true;
                     this.getChildByName("weightTextBox").x=e.data.global.x-xbuffer;
                     this.getChildByName("weightTextBox").y=e.data.global.y-10-ybuffer;

                     this.getChildByName("weightTextBox").getChildByName("weightText").visible=true;

                     this.getChildByName("+").x=e.data.global.x+15-xbuffer;
                     this.getChildByName("+").y=e.data.global.y-ybuffer;

                     this.getChildByName("-").x=e.data.global.x-15-xbuffer;
                     this.getChildByName("-").y=e.data.global.y-ybuffer;

                     this.getChildByName("+").visible=true;
                     this.getChildByName("-").visible=true;
                     this.tapped=true;
                        }
                     }
                 });

                    weightSprite.on('mouseout', function(e){
                        this.getChildByName("weightTextBox").visible=false;
                        this.getChildByName("+").visible=false;
                        this.getChildByName("-").visible=false;
                    });

                    addweight.on('click', function(e){
                      var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                      net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight+0.1);
                      net.update();
                      slide.draw_update(net);

                    });

                    addweight.on('tap', function(e){
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

                    loseweight.on('tap', function(e){
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
                        color = 0xFF8000;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x0080e8;
                    } else if(net.getLayer(i).neurons[j].weights[k] == 0){
                        color = 0xAAADB3;
                    }

                    weightSprite.lineStyle(thickness, color);
                    /*
                    var startx = layout.NEURON_LARGE_X;//layout.NEURON_LARGE_LEFTLIM //+ (i*layout.NEURON_X_DIF);
                    var starty = layout.NEURON_LARGE_Y;//layout.NEURON_UPPERLIM + (j*layout.NEURON_Y_DIF);
                    var endx = layout.NEURON_LARGE_LEFTLIM;//layout.NEURON_LEFTLIM + (i*layout.NEURON_X_DIF) - layout.NEURON_X_DIF;
                    var endy = layout.NEURON_UPPERLIM_LARGE + (k*layout.NEURON_LARGE_Y_DIF);
                    */

                    var startx = layout.CX+320;
                    var starty = layout.CY;
                    var endx = layout.CX;
                    var endy = layout.CY-120 +(k*layout.NEURON_LARGE_Y_DIF)

                    
                    var hitbuffer = 30;
                    weightSprite.interactive=true;

                    var weightTextBox = new PIXI.Graphics();
                        weightTextBox.beginFill(0xFFFFFF);
                        weightTextBox.drawRect(-35,-10,70,60);
                        weightTextBox.name="weightTextBox";
                        weightTextBox.visible=false;
                        weightTextBox.interactive=true;
                        weightTextBox.on('mouseover', function(e){
                            this.visible=true;
                        });


                    var weightText = new PIXI.Text(net.getLayer(i).getNeuron(j).getWeight(k).toFixed(2),textstyles.default)
                        weightText.visible=false;
                        weightText.anchor.set(0.5);
                        weightText.y=35;
                        weightText.name="weightText";
                    weightSprite.addChild(weightTextBox);
                    weightTextBox.addChild(weightText);


                    weightSprite.drawPolygon(startx, starty, endx, endy);
                    weightSprite.hitArea = new PIXI.Polygon(startx, starty +hitbuffer, 
                                                            endx, endy +hitbuffer,
                                                            endx, endy -hitbuffer,
                                                            startx, starty -hitbuffer);

                                

                    var addweight = new Button("+",loader.resources["images/buttons/plus.png"].texture,(startx+endx)/2,(starty+endy)/2,false);
                    var loseweight = new Button("-",loader.resources["images/buttons/minus.png"].texture,((startx+endx)/2)-25,(starty+endy)/2,false);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){

                        if (!slide.large_nointeract){
                        var xbuffer=(window.innerWidth-viewst.startwidth)/2;
                        var ybuffer=(window.innerHeight-viewst.startheight)/2;

                        this.getChildByName("weightTextBox").visible=true;
                        this.getChildByName("weightTextBox").x=e.data.global.x-xbuffer;
                        this.getChildByName("weightTextBox").y=e.data.global.y-10-ybuffer;

                        this.getChildByName("weightTextBox").getChildByName("weightText").visible=true;

                        this.getChildByName("+").x=e.data.global.x+15-xbuffer;
                        this.getChildByName("+").y=e.data.global.y-ybuffer;

                        this.getChildByName("-").x=e.data.global.x-15-xbuffer;
                        this.getChildByName("-").y=e.data.global.y-ybuffer;

                        this.getChildByName("+").visible=true;
                        this.getChildByName("-").visible=true;
                        }
                    });

                    weightSprite.on('tap', function(e){

                        if (!slide.large_nointeract){
                        var xbuffer=(window.innerWidth-viewst.startwidth)/2;
                        var ybuffer=(window.innerHeight-viewst.startheight)/2;

                        this.getChildByName("weightTextBox").visible=true;
                        this.getChildByName("+").visible=true;
                        this.getChildByName("-").visible=true;
                        this.getChildByName("weightTextBox").getChildByName("weightText").visible=true;

                        if(!this.tapped){
                            this.getChildByName("weightTextBox").visible=true;
                            this.getChildByName("weightTextBox").x=e.data.global.x//-xbuffer-50;
                            this.getChildByName("weightTextBox").y=e.data.global.y//-10-ybuffer;
       
                            this.getChildByName("weightTextBox").getChildByName("weightText").visible=true;
       
                            this.getChildByName("+").x=e.data.global.x+15-xbuffer;
                            this.getChildByName("+").y=e.data.global.y-ybuffer;
       
                            this.getChildByName("-").x=e.data.global.x-15-xbuffer;
                            this.getChildByName("-").y=e.data.global.y-ybuffer;
       
                            this.getChildByName("+").visible=true;
                            this.getChildByName("-").visible=true;
                            this.tapped=true;
                            }

                        }
                    });
                    
                    weightSprite.on('mouseout', function(e){
                        this.getChildByName("weightTextBox").visible=false;
                        this.getChildByName("+").visible=false;
                        this.getChildByName("-").visible=false;
                    });

                    addweight.on('click', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight+0.1);
                        net.update_single();
                        slide.draw_update_large(net);                  
                    });

                    addweight.on('tap', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight+0.1);
                        net.update_single();
                        slide.draw_update_large(net);                  
                    });
  
                    loseweight.on('click', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight-0.1);
                        net.update_single();
                        slide.draw_update_large(net);
                    });

                    loseweight.on('tap', function(e){
                        var currWeight = net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]);
                        net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).setWeight(this.parent.idx[2],currWeight-0.1);
                        net.update_single();
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
                        color = 0xFF8000;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x0080e8;
                    }

                    this.weightsContainer.getChildByName(name).updateLineStyle(thickness, color, 1);
                    this.weightsContainer.getChildByName(name).getChildByName("weightTextBox").getChildByName("weightText").text=
                    net.getLayer(i).getNeuron(j).getWeight(k).toFixed(2);

                    if(this.backprop_steps){

                        if(this.w3){
                        this.slideNet.backprop();

                        this.textContainer.getChildByName("dzdw_num").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dz_dw[this.weightsnum].toFixed(2);
                        this.textContainer.getChildByName("dadz_num").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(2)+
                                                                            " × " + "(1 - " +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(2) +")" +
                                                                            '\n'+"   = "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).da_dz.toFixed(5);
                        this.textContainer.getChildByName("dcda_num").text="= "+this.slideNet.netOut[0].toFixed(2) +" - " +this.slideNet.target[0] 
                        + '\n'+ "   = "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_da.toFixed(2);

                        this.textContainer.getChildByName("dcdw_num").text="= "+
                            this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dz_dw[this.weightsnum].toFixed(2)+" × "
                            +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).da_dz.toFixed(5)+" × "
                            +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_da.toFixed(2)
                            +'\n'+"   = "+ this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum].toFixed(5);

                            var newweight=    this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).getWeight(this.weightsnum)
                            -(this.slideNet.learnRate*this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum]);
        
                            this.textContainer.getChildByName("w_new").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).getWeight(this.weightsnum).toFixed(4)
                                + " - ("+ this.slideNet.learnRate +" × "+ this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum].toFixed(5)+")"
                                +'\n'+"   = "+newweight.toFixed(4);

                        } else if(this.w1_all){

                            this.slideNet.backprop();

                            this.textContainer.getChildByName("dadz_num").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(2)+
                            " × " + "(1 - " +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(2) +")" +
                            '\n'+"   = "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).da_dz.toFixed(5);

                            this.textContainer.getChildByName("dcda_num").text="= ("+this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2)+
                            " × " + "(1 - " +this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2) +"))" +
                            "("+this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2)+" - "+this.slideNet.target[0]+")"
                            +"("+this.slideNet.getLayer(1).getNeuron(0).weights[0].toFixed(2)+")"

                            + '\n'+"  + ("+this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2) + 
                            " × " + "(1 - " +this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2) +"))" 
                          +"("+this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2)+" - "+this.slideNet.target[1]+")"
                          +"("+this.slideNet.getLayer(1).getNeuron(1).weights[0].toFixed(2)+")"
                          +'\n'+"            = "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_da.toFixed(5);

                         
                          this.textContainer.getChildByName("dcdw_num").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dz_dw[this.weightsnum].toFixed(2)+" × "
                            +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).da_dz.toFixed(5)+" × "
                            +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_da.toFixed(5)
                            +'\n'+"   = "+ this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum].toFixed(5);

                            var newweight=    this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).getWeight(this.weightsnum)
                            -(this.slideNet.learnRate*this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum]);
                            
                            this.textContainer.getChildByName("w_new").text="= "+this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).getWeight(this.weightsnum).toFixed(4)
                                + " - ("+ this.slideNet.learnRate +" × "+ this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum].toFixed(5)+")"
                                +'\n'+"   = "+newweight.toFixed(4);
                        }

                    }
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

        var slide=this;
      
        for(var i = 0; i<net.layers.length; i++){
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){


                var neuronBase = new PIXI.Sprite(loader.resources["images/net/neuron.png"].texture);
            
                neuronBase.anchor.set(0.5);
                neuronBase.name = i.toString() + j.toString();

                neuronBase.x = layout.NEURON_LEFTLIM + (i * layout.NEURON_X_DIF);

                if(i==net.layers.length-1){
                    neuronBase.y = layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF) + layout.NEURON_NUDGE;
                } else {
                    neuronBase.y = layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF);
                    if(this.backprop){
                        neuronBase.y = layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF)+100
                    }
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
            str=str+formatter.format(net.getLayer(i).neurons[j].bias)+"\n  ━━━━━";//+"\n   "+formatter.format(net.getLayer(i).neurons[j].output_nofn)

            var overText0 = new PIXI.Text(str,textstyles.small);
            overText0.anchor.set(0,0.5);
            overText0.x=-71;

            var overneuron_small =   new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: 15,
                fill:  0x00ad09
            });

            var overneuron_large=   new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: 22,
                fill:  0x7c00ad
            });

            var overText1 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),overneuron_small)
            overText1.anchor.set(0,0.5);
            overText1.x=-50;
            overText1.y=35;

            var overText15 = new PIXI.Text("𝑓(       )",textstyles.default);
            overText15.anchor.set(0,0.5);
            overText15.x=4;
              
            var overText2 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),overneuron_small);
            overText2.anchor.set(0.5);
            overText2.x=40;

            var overText3 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output),overneuron_large)
            overText3.anchor.set(0.5);
            overText3.x=30;
            overText3.y=30;
            

            var neuronOver = new PIXI.Sprite(loader.resources["images/net/overneuron2.png"].texture);
                neuronOver.anchor.set(0.5);
                neuronOver.scale.set(1.5);
                neuronOver.name = neuronBase.name;
                neuronOver.x=neuronBase.x;
                neuronOver.y=neuronBase.y;
                neuronOver.alpha=0;
            neuronOver.addChild(overText0,overText1,overText15,overText2,overText3);



            
            this.neuronOvers.addChild(neuronOver);


      
              //detection for showing overneuron
            var sensor= new PIXI.Sprite(loader.resources["images/net/neuron.png"].texture);
                sensor.anchor.set(0.5);
                sensor.x=neuronBase.x;
                sensor.y=neuronBase.y;
                sensor.tint=0xFFA500;
                sensor.alpha=0;
                sensor.interactive=true;
      
                var self = this;
                sensor.on('mouseover', function(e){
                    if(!slide.backprop_labels ){
                        self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=1;
                    }
                });
      
                sensor.on('mouseout', function(e){
                  self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=0;
                });
            this.neuronSensors.addChild(sensor);
            
            this.neuronContainer.addChild(this.neuronBases, this.neuronOvers, this.neuronSensors);
            

            // backprop neuron bases have both z and a showing
            if(this.backprop){
                neuronBase.texture= loader.resources["images/net/neuron_backprop.png"].texture;

                if(this.backprop_steps){
                    neuronText.text=formatter.format(net.getLayer(i).neurons[j].output_nofn)+"  "+formatter.format(net.getLayer(i).neurons[j].output);
                } else {
                    neuronText.text="";     
                    neuronBase.tint=0xFFFFFF;


                    if(i==0 && j==0){
                        var z1=new PIXI.Sprite(loader.resources["images/backprop/z11.png"].texture);
                        z1.anchor.set(0.5)
                        z1.x=-26;
                        z1.y=10;    
                        neuronText.addChild(z1);

                        var a1=new PIXI.Sprite(loader.resources["images/backprop/a11.png"].texture);
                        a1.anchor.set(0.5)
                        a1.x=35;
                        a1.y=10;    
                        neuronText.addChild(a1);
                
                    } else if(i==1 && j==0){

                        var z3=new PIXI.Sprite(loader.resources["images/backprop/z21.png"].texture);
                        z3.anchor.set(0.5)
                        z3.x=-28;
                        z3.y=10;    
                        neuronText.addChild(z3);

                        var a3=new PIXI.Sprite(loader.resources["images/backprop/a21.png"].texture);
                        a3.anchor.set(0.5)
                        a3.x=32;
                        a3.y=10;    
                        neuronText.addChild(a3);

                    } else if(i==1 && j==1){
                        var z4=new PIXI.Sprite(loader.resources["images/backprop/z22.png"].texture);
                        z4.anchor.set(0.5)
                        z4.x=-26;
                        z4.y=10;    
                        neuronText.addChild(z4);

                        var a4=new PIXI.Sprite(loader.resources["images/backprop/a22.png"].texture);
                        a4.anchor.set(0.5)
                        a4.x=32;
                        a4.y=10;    
                        neuronText.addChild(a4);

                    }

                }
            }

            if(this.backprop){
                neuronBase.scale.set(0.8);
            }

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
            var neuronBase = new PIXI.Sprite(loader.resources["images/net/neuron_large.png"].texture);
            
            neuronBase.anchor.set(0.5);
            neuronBase.name = i.toString() + j.toString();

            neuronBase.x = layout.NEURON_LEFTLIM_LARGE;//layout.NEURON_LARGE_X;
            neuronBase.y = layout.CY;//layout.NEURON_LARGE_Y;

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
                    fontFamily: 'Helvetica',
                    fontWeight: 500,
                    fontSize: 24
                })
            );
            overText_weights.anchor.set(0,0.5);
            overText_weights.x=-175;

            var overText_outnofn = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),
                new PIXI.TextStyle({
                    fontFamily: 'Helvetica',
                    fontWeight: 500,
                    fontSize: 30,
                    fill: 0x00ad09
                })
            );
            overText_outnofn.anchor.set(1,0.5);
            overText_outnofn.x=-60;
            overText_outnofn.y=70;

            var overText_f= new PIXI.Text("𝑓 ", new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 500,
                fontSize: 60,
            }));
            overText_f.x=10;
            overText_f.y=-50;

            var overText_paren= new PIXI.Text("(             ) =", new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 500,
                fontSize: 25,
            }));
            overText_paren.x=35;
            overText_paren.y=-20;
            
            var overText_actfn = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn), new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 500,
                fontSize: 30,
                fill:  0x00ad09
            }));
            overText_actfn.anchor.set(0.5);
            overText_actfn.x=90;
            overText_actfn.y=-2;

            var overText_actfn_out = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output), new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 500,
                fontSize: 40,
                fill: 0x7c00ad,
            }));

            overText_actfn_out.anchor.set(0.5);

            overText_actfn_out.x=75;
            overText_actfn_out.y=60;
               
            neuronBase.addChild(overText_weights,overText_outnofn);
            neuronBase.addChild(overText_f,overText_paren,overText_actfn,overText_actfn_out);

            var neuronOver_large=new PIXI.Sprite(loader.resources["images/net/neuronOver_large.png"].texture);
                neuronOver_large.anchor.set(0.5);

                neuronOver_large.x=neuronBase.x;
                neuronOver_large.y=neuronBase.y;
                neuronOver_large.visible=false;
                neuronOver_large.interactive=true;

                neuronOver_large.on('mouseover', function(e){
                    this.alpha=0;
                  });
        
                neuronOver_large.on('mouseout', function(e){
                    this.alpha=1;
                  });

                  var out = net.getLayer(i).neurons[j].output;
                
                  if(out>=0.9){
                      neuronOver_large.tint= 0xfff000
                  } else if (out>=0.8){
                    neuronOver_large.tint= 0xfdee3b
                  } else if (out>=0.7){
                    neuronOver_large.tint= 0xfbeb56
                  } else if (out>=0.6){
                    neuronOver_large.tint= 0xf9e96d
                  } else if (out>=0.5){
                    neuronOver_large.tint= 0xf6e781
                  } else if (out>=0.4){
                    neuronOver_large.tint= 0xf2e494
                  } else if (out>=0.3){
                    neuronOver_large.tint= 0xeee2a7
                  } else if (out>=0.2){
                    neuronOver_large.tint= 0xe9e0b9
                  } else if (out>=0.1){
                    neuronOver_large.tint= 0xe3deca
                  }  else if (out>=0.0){
                    neuronOver_large.tint= 0xdcdcdc
                  }

            var neuronOver_large_text = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output), new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: 50,
              }));
                  
                neuronOver_large_text.anchor.set(0.5);
                neuronOver_large.addChild(neuronOver_large_text);

            this.neuronBases.addChild(neuronBase);
            this.neuronOvers.addChild(neuronOver_large);

            this.neuronContainer.addChild(this.neuronBases,this.neuronOvers);
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

                if(!this.backprop){
                    currBase.getChildAt(0).text=formatter.format(net.getLayer(i).neurons[j].output);
                } 

                if(this.backprop_labels){
                    currBase.tint=0xFFFFFF;
                }
          

                if(this.backprop_steps){
                    currBase.getChildAt(0).text=formatter.format(net.getLayer(i).neurons[j].output_nofn)+"  "+formatter.format(net.getLayer(i).neurons[j].output);
                  }
        
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
                str=str+formatter.format(net.getLayer(i).neurons[j].bias)+"\n━━━━━";
    
                this.neuronContainer.getChildByName("neuronOvers").getChildByName(name).getChildAt(0).text = str;
                this.neuronContainer.getChildByName("neuronOvers").getChildByName(name).getChildAt(1).text = formatter.format(net.getLayer(i).neurons[j].output_nofn);
                this.neuronContainer.getChildByName("neuronOvers").getChildByName(name).getChildAt(3).text = formatter.format(net.getLayer(i).neurons[j].output_nofn);
                this.neuronContainer.getChildByName("neuronOvers").getChildByName(name).getChildAt(4).text = formatter.format(net.getLayer(i).neurons[j].output);``
            
            
            }
        }
    }

    drawNeurons_update_large(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){

                var name = i.toString() + j.toString();

                var currBase = this.neuronContainer.getChildByName("neuronBases").getChildByName(name);
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
                
                currBase.getChildAt(4).text=formatter.format(net.getLayer(i).neurons[j].output_nofn);
                currBase.getChildAt(5).text=formatter.format(net.getLayer(i).neurons[j].output);

                var currOver = this.neuronContainer.getChildByName("neuronOvers").getChildAt(0);
                currOver.getChildAt(0).text=formatter.format(net.getLayer(i).neurons[j].output);

                var out = net.getLayer(i).neurons[j].output;
                  if(out>=0.9){
                    currOver.tint= 0xfff000;
                  } else if (out>=0.8){
                    currOver.tint= 0xfdee3b;
                  } else if (out>=0.7){
                    currOver.tint= 0xfbeb56;
                  } else if (out>=0.6){
                    currOver.tint= 0xf9e96d;
                  } else if (out>=0.5){
                    currOver.tint= 0xf6e781;
                  } else if (out>=0.4){
                    currOver.tint= 0xf2e494;
                  } else if (out>=0.3){
                    currOver.tint= 0xeee2a7;
                  } else if (out>=0.2){
                    currOver.tint= 0xe9e0b9;
                  } else if (out>=0.1){
                    currOver.tint= 0xe3deca;
                  }  else if (out>=0.0){
                    currOver.tint= 0xdcdcdc;
                  }

            }
        }
    }


    drawInputs_init(net){
       this.inputContainer.removeChildren();

        for(var i = 0; i<net.netInput.length; i++){

            var inputBase = new PIXI.Sprite(loader.resources["images/net/inputbase.png"].texture);
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_Y_DIF) + layout.NEURON_UPPERLIM + layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputContainer.addChild(inputBase);

            if(this.backprop_labels){
                if(i==0){
                    var inputText = new PIXI.Sprite(loader.resources["images/backprop/in1.png"].texture);
                } else if(i==1){
                    var inputText = new PIXI.Sprite(loader.resources["images/backprop/in2.png"].texture);

                }

            } else { 
            var inputText = new PIXI.Text(formatter.format(net.netInput[i]));
            inputText.scale.set(0.8);

            
            }
                inputText.anchor.set(0.5);
                inputText.name = inputBase.name;
                
            inputBase.addChild(inputText);
        }
    }

    drawInputs_init_large(net){
        this.inputContainer.removeChildren();

        for(var i = 0; i<net.netInput.length; i++){

            var inputBase = new PIXI.Sprite(loader.resources["images/net/inputbase.png"].texture);
                inputBase.scale.set(1.2);
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.CX-20;//layout.NEURON_LARGE_LEFTLIM //- layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_LARGE_Y_DIF) + layout.CY-120; //+ layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputContainer.addChild(inputBase);

            var inputText = new PIXI.Text(net.netInput[i].toFixed(2),textstyles.default);
                inputText.anchor.set(0.5);
                inputText.name = inputBase.name;
            inputBase.addChild(inputText);
        }

    }

    drawInputs_update(net){
        for(var i = 0; i<net.netInput.length; i++){

            var name = i.toString();
            this.inputContainer.getChildByName(name).getChildAt(0).text = formatter.format(net.netInput[i]);
        }
    }

    drawLabels_init(net){
        this.labelsContainer.removeChildren();

        for(var i = 0; i<net.data.type.length; i++){

            //final output type labels ex strawberry, blueberry
            var typeLabel = new PIXI.Text(net.data.type[i],textstyles.default);
                typeLabel.name="typeLabel"+i;
                typeLabel.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF + 35;
                typeLabel.y=layout.NEURON_UPPERLIM + (i*layout.NEURON_Y_DIF) + 5;

            //target value
            var targetLabel = new PIXI.Text("target: "+net.target[i],textstyles.medium);
                targetLabel.name="targetLabel"+i;
                targetLabel.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF + 35;
                targetLabel.y=layout.NEURON_UPPERLIM + (i*layout.NEURON_Y_DIF) + 30;

            this.labelsContainer.addChild(typeLabel,targetLabel);
        }

        if(this.backprop){
            var targetLabel0= this.labelsContainer.getChildByName("targetLabel0");
            var typeLabel0= this.labelsContainer.getChildByName("typeLabel0");

            var y1 = new PIXI.Sprite(loader.resources["images/backprop/y1.png"].texture);
            targetLabel0.addChild(y1);

            targetLabel0.text="     = "+net.target[0];
            typeLabel0.text="     = "+net.cost[0].toFixed(4);
            typeLabel0.style=targetLabel0.style;

            targetLabel0.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF +60;
            targetLabel0.y=layout.NEURON_UPPERLIM;
            typeLabel0.x=targetLabel0.x;
            typeLabel0.y=targetLabel0.y+30;

            var targetLabel1= this.labelsContainer.getChildByName("targetLabel1");
            var typeLabel1= this.labelsContainer.getChildByName("typeLabel1");

            var y2 = new PIXI.Sprite(loader.resources["images/backprop/y2.png"].texture);
            targetLabel1.addChild(y2);

            targetLabel1.text="     = "+net.target[1];
            typeLabel1.text="     = "+net.cost[1].toFixed(4);
            typeLabel1.style=targetLabel1.style;

            targetLabel1.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF +60;
            targetLabel1.y=layout.NEURON_UPPERLIM + (layout.NEURON_Y_DIF);
            typeLabel1.x=targetLabel1.x;
            typeLabel1.y=targetLabel1.y+30;

            if(this.backprop_steps){

            var c1 = new PIXI.Sprite(loader.resources["images/backprop/c1.png"].texture);
                c1.scale.set(0.55)
                c1.x=-10;
                c1.y=10;
            targetLabel0.addChild(c1);

            var c2 = new PIXI.Sprite(loader.resources["images/backprop/c2.png"].texture);
                c2.scale.set(0.55)
                c2.x=-10;
                c2.y=10;
            targetLabel1.addChild(c2);
            }

            if(this.backprop_labels){
                targetLabel0.text="     = target";
                
                var y1 = new PIXI.Sprite(loader.resources["images/backprop/y1.png"].texture);
                var c1 = new PIXI.Sprite(loader.resources["images/backprop/c1form.png"].texture);
                c1.scale.set(0.55)
                c1.x=-10;
                c1.y=10;
                targetLabel0.addChild(c1);

                targetLabel1.text="     = target";

                var y2 = new PIXI.Sprite(loader.resources["images/backprop/y2.png"].texture);
                var c2 = new PIXI.Sprite(loader.resources["images/backprop/c2form.png"].texture);
                c2.scale.set(0.55)
                c2.x=-10;
                c2.y=10;
                targetLabel1.addChild(c2);

                typeLabel0.text="";
                typeLabel1.text="";

            }
            
        }


        if(!this.backprop){

        for(var i=0; i<net.data.labels.length; i++){

            // input types ex. length, roundness
            var inputLabel = new PIXI.Text(net.data.labels[i],textstyles.default);
                inputLabel.anchor.set(0.5);
                inputLabel.x = layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;
                inputLabel.y = layout.NEURON_UPPERLIM + (i*layout.NEURON_Y_DIF) + 80;
            this.labelsContainer.addChild(inputLabel);
        }
    }

        // data image
        
        var target = new PIXI.Sprite(loader.resources["images/net/strawberrycard.png"].texture);

        target.anchor.set(0.5)
        target.name="target";

        if (net.targetText=="blueberry"){
            target.texture=loader.resources["images/net/blueberrycard.png"].texture;
        } else if (net.targetText=="strawberry"){
            target.texture=loader.resources["images/net/strawberrycard.png"].texture;
        }
            
        target.x = layout.NEURON_LEFTLIM- layout.NEURON_X_DIF -80;
        target.y= layout.NEURON_UPPERLIM +layout.NEURON_Y_DIF/2 +40;

        var slide=this;
        target.interactive=true;
        target.buttonMode=true;
        target.on('click', function(e){ 
            net.dataIdx=(net.dataIdx+1)%net.data.points.length;
            console.log(net.dataIdx);

            net.setNetInput(net.data.points[net.dataIdx]);
            net.update();
            console.log(net.netInput);
            slide.draw_update(net);
        });

        target.on('tap', function(e){ 
            net.dataIdx=(net.dataIdx+1)%net.data.points.length;
            console.log(net.dataIdx);

            net.setNetInput(net.data.points[net.dataIdx]);
            net.update();
            console.log(net.netInput);
            slide.draw_update(net);
        });

        this.labelsContainer.addChild(target);

        if(this.backprop){
            target.visible=false;
        }

    }

    drawLabels_init_large(net){
        for(var i=0; i<net.data.labels.length; i++){
            // input types ex. length, roundness
            var inputLabel = new PIXI.Text(net.data.labels[i],textstyles.default);
                inputLabel.anchor.set(0.5);
                inputLabel.x = layout.CX-20;
                inputLabel.y = layout.CY-120 + (i*layout.NEURON_LARGE_Y_DIF) +50;
            this.labelsContainer.addChild(inputLabel);
        }

    }

    drawCost_steps(){
        
        var costBox = new PIXI.Sprite(loader.resources["images/boxes/cost.png"].texture);
            costBox.name= "costBox";
            costBox.anchor.set(0.5)
            costBox.x=layout.NEURON_LEFTLIM+340;
            costBox.y=layout.NEURON_UPPERLIM+280;          
        this.labelsContainer.addChild(costBox);

        var costText= new PIXI.Text(formatter_long.format(this.slideNet.costTot));
            costText.name = "costText";
            costText.anchor.set(0.5)
            costText.y=15;
        costBox.addChild(costText);

        var cost1box=  new PIXI.Sprite(loader.resources["images/cost/cost1box.png"].texture);
            cost1box.name="cost1box";
            cost1box.x=layout.NEURON_LEFTLIM +135;
            cost1box.y=layout.NEURON_UPPERLIM -40;
        this.labelsContainer.addChild(cost1box);

        var cost1= new PIXI.Text(this.slideNet.netOut[0].toFixed(2)+"  -  "+this.slideNet.target[0])
            cost1.name="cost1"
            cost1.x=135;
            cost1.y=50;
        cost1box.addChild(cost1);
        
        var cost2box=  new PIXI.Sprite(loader.resources["images/cost/cost2box.png"].texture);
            cost2box.name="cost2box";
            cost2box.x=layout.NEURON_LEFTLIM +135;
            cost2box.y=layout.NEURON_UPPERLIM +90;
        this.labelsContainer.addChild(cost2box);

        var cost2= new PIXI.Text(this.slideNet.netOut[1].toFixed(2)+"  -  "+this.slideNet.target[1])
            cost2.name="cost2"
            cost2.x=135;
            cost2.y=50;
        cost2box.addChild(cost2);

        var costplus= new PIXI.Sprite(loader.resources["images/cost/costplus.png"].texture);
            costplus.name="costplus";
            costplus.x=layout.NEURON_LEFTLIM +80;
            costplus.y=layout.NEURON_UPPERLIM+240;
        this.labelsContainer.addChild(costplus);

        
    }

    drawCost(){
        var costBox = new PIXI.Sprite(loader.resources["images/boxes/cost.png"].texture);
            costBox.name= "costBox";
            costBox.anchor.set(0.5)

            costBox.x=layout.NEURON_LEFTLIM +300;//window.innerWidth-170;
            costBox.y=layout.NEURON_UPPERLIM + layout.NEURON_Y_DIF/2 +35;     

            if(this.sandbox){
                costBox.x=window.innerWidth-80;
                costBox.y=layout.BOTTOMBUFFER-280;      
            } if(this.costSteps){
                costBox.x=500;
                costBox.y=layout.BOTTOMBUFFER-280;      
            }
        this.costLabel.addChild(costBox);
    
        var costText= new PIXI.Text(" - ",textstyles.large);
            costText.name = "costText";
            costText.anchor.set(0.5)
            costText.y=15;
        costBox.addChild(costText);

        if(this.backprop_labels){
            costText.text="";
            
            var cplus = new PIXI.Sprite(loader.resources["images/backprop/cplus2.png"].texture);
            cplus.anchor.set(0.5)
            cplus.scale.set(0.5)
            cplus.x=0;
            cplus.y=10;
            costBox.addChild(cplus);
        }
    }

    drawLabels_update(net){

        var targetimg = this.labelsContainer.getChildByName("target");


            if (net.targetText=="blueberry"){
                targetimg.texture=loader.resources["images/net/blueberrycard.png"].texture;
            } else if (net.targetText=="strawberry"){
            targetimg.texture=loader.resources["images/net/strawberrycard.png"].texture;
            }


        
        if (this.slideContainer.getChildAt(1).getChildByName("targetLabel0") !== null){
        this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="target: "+this.slideNet.target[0]
        this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="target: "+this.slideNet.target[1]

        }

        if(this.backprop){
            this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="     = "+net.target[0];
            this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="     = "+net.target[1];
           // this.slideContainer.getChildAt(1).getChildByName("targetLabel0").getChildAt(0).text="C1 = "+net.cost[0].toFixed(2)
           // this.slideContainer.getChildAt(1).getChildByName("targetLabel1").getChildAt(0).text="C2 = "+net.cost[1].toFixed(2)

        }

        if(this.backprop_labels){
            this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="     = target";
            this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="     = target";
        }

        if(this.backprop_steps){
            this.slideContainer.getChildAt(1).getChildByName("typeLabel0").text="     = "+net.cost[0].toFixed(4);
            this.slideContainer.getChildAt(1).getChildByName("typeLabel1").text="     = "+net.cost[1].toFixed(4);


        }


    }

    drawCost_update(net){

        if(this.costSteps){
            this.labelsContainer.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot);
            this.labelsContainer.getChildByName("cost1box").getChildByName("cost1").text=this.slideNet.netOut[0].toFixed(2)+"  -  "+this.slideNet.target[0]
            this.labelsContainer.getChildByName("cost2box").getChildByName("cost2").text=this.slideNet.netOut[1].toFixed(2)+"  -  "+this.slideNet.target[1]


        } else {
            if (this.costLabel.getChildByName("costBox") && net.costTot_batch){
               this.costLabel.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot_batch);
            } else if (this.costLabel.getChildByName("costBox") && this.backprop_steps) {
                this.costLabel.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot);
            }
        }
    }

    drawBackprop(layernum,neuronnum,weightnum){

        var DZDW_X=layout.CX;
        var DZDW_Y=layout.CY-150;

        var DADZ_X=layout.CX+180;
        var DADZ_Y=layout.CY-150;

        if(layernum==1){
            var DCDA_X=layout.CX+100;
            var DCDA_Y=layout.CY-50;
        } else {
            var DCDA_X=layout.CX+80;
            var DCDA_Y=layout.CY-50;
        }
        var DCDW_X=layout.CX+140;
        var DCDW_Y=layout.CY+70;

        var W_NEWX=layout.CX+140;
        var W_NEWY=layout.CY+180;


        //dz_dw
        var dzdw3_small= new PIXI.Sprite(loader.resources["images/backprop/dxdy/dzdw3.png"].texture);;
            dzdw3_small.scale.set(0.9)
            dzdw3_small.anchor.set(0.5)
            dzdw3_small.isSprite=true;
            dzdw3_small.x=DZDW_X;
            dzdw3_small.y=DZDW_Y;
        this.textContainer.addChild(dzdw3_small);

        var dzdw_num= new PIXI.Text("",textstyles.label_med);
            dzdw_num.name="dzdw_num";
            dzdw_num.x=dzdw3_small.x+40;
            dzdw_num.y=dzdw3_small.y-15;
        this.textContainer.addChild(dzdw_num);

        //da_dz
        var dadz21_small= new PIXI.Sprite(loader.resources["images/backprop/dxdy/dadz21.png"].texture);
            dadz21_small.scale.set(0.9)
            dadz21_small.anchor.set(0.5)
            dadz21_small.isSprite=true;
            dadz21_small.x=DADZ_X;
            dadz21_small.y=DADZ_Y;
        this.textContainer.addChild(dadz21_small);


        var dadz_num= new PIXI.Text("",textstyles.label_med);
            dadz_num.name="dadz_num";
            dadz_num.x=dadz21_small.x+40;
            dadz_num.y=dadz21_small.y-25;
        this.textContainer.addChild(dadz_num);

        //dc_da
        var dcda21_small= new PIXI.Sprite(loader.resources["images/backprop/dxdy/dcda21.png"].texture);
            dcda21_small.scale.set(0.9);
            dcda21_small.anchor.set(0.5)
            dcda21_small.isSprite=true;
            dcda21_small.x=DCDA_X;
            dcda21_small.y=DCDA_Y;
        this.textContainer.addChild(dcda21_small);

        var dcda_num= new PIXI.Text("",textstyles.label_med);
            dcda_num.name="dcda_num";
            dcda_num.x=dcda21_small.x+60;
            dcda_num.y=dcda21_small.y-25;
        this.textContainer.addChild(dcda_num);

        //DC_DW
        var dcdw3_small= new PIXI.Sprite(loader.resources["images/backprop/dxdy/dcdw3.png"].texture);
        dcdw3_small.scale.set(1.0);
        dcdw3_small.anchor.set(0.5)
        dcdw3_small.isSprite=true;
        dcdw3_small.x=DCDW_X;
        dcdw3_small.y=DCDW_Y;
        this.textContainer.addChild(dcdw3_small);

        var dcdw_num= new PIXI.Text("",textstyles.label_large);
            dcdw_num.name="dcdw_num";
            dcdw_num.x=dcdw3_small.x+70;
            dcdw_num.y=DCDW_Y-25;
        this.textContainer.addChild(dcdw_num);

        //W_NEW
        var w3_new= new PIXI.Sprite(loader.resources["images/backprop/dxdy/w3_new.png"].texture);
        w3_new.scale.set(0.75)
        w3_new.anchor.set(0.5)
        w3_new.isSprite=true;
        w3_new.x=W_NEWX;
        w3_new.y=W_NEWY;
        this.textContainer.addChild(w3_new);

        var w_new= new PIXI.Text("",textstyles.label_med);
           w_new.name="w_new";
           w_new.x=W_NEWX+70;
           w_new.y=w3_new.y-25;
       this.textContainer.addChild(w_new);



        this.slideNet.backprop();


        dzdw_num.text="= "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).dz_dw[weightnum].toFixed(2);
        dadz_num.text="= "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).output.toFixed(2) + 
              " × " + "(1 - " +this.slideNet.getLayer(layernum).getNeuron(neuronnum).output.toFixed(2) +")" +
              '\n'+"   = "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).da_dz.toFixed(5);

        dcda_num.text="= "+this.slideNet.netOut[0].toFixed(2) +" - " +this.slideNet.target[0] 
            + '\n'+ "   = "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_da.toFixed(2);

        dcdw_num.text= "= "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).dz_dw[weightnum].toFixed(2)+" × "
            +this.slideNet.getLayer(layernum).getNeuron(neuronnum).da_dz.toFixed(5)+" × "
            +this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_da.toFixed(2)
            +'\n'+"   = "+ this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_dw[weightnum].toFixed(5);

        var newweight=    this.slideNet.getLayer(layernum).getNeuron(neuronnum).getWeight(weightnum)
                            -(this.slideNet.learnRate*this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_dw[weightnum]);
        
        w_new.text="= "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).getWeight(weightnum).toFixed(4)
            + " - ("+ this.slideNet.learnRate +" × "+ this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_dw[weightnum].toFixed(5)+")"
            +'\n'+"   = "+newweight.toFixed(4);

        if(this.w1_all){
            dzdw3_small.texture = loader.resources["images/backprop/dxdy/dzdw1.png"].texture;
            dadz21_small.texture = loader.resources["images/backprop/dxdy/dadz11.png"].texture;
            dcda21_small.texture = loader.resources["images/backprop/dxdy/dcda11.png"].texture;
            dcdw3_small.texture = loader.resources["images/backprop/dxdy/dcdw1.png"].texture;
            w3_new.texture = loader.resources["images/backprop/dxdy/w1_new.png"].texture;

            dcda_num.text="= ("+this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2) + 
              " × " + "(1 - " +this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2) +"))" +
              "("+this.slideNet.getLayer(1).getNeuron(0).output.toFixed(2)+" - "+this.slideNet.target[0]+")"
              +"("+this.slideNet.getLayer(1).getNeuron(0).weights[0].toFixed(2)+")"

             + '\n'+"  + ("+this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2) + 
              " × " + "(1 - " +this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2) +"))" 
            +"("+this.slideNet.getLayer(1).getNeuron(1).output.toFixed(2)+" - "+this.slideNet.target[1]+")"
            +"("+this.slideNet.getLayer(1).getNeuron(1).weights[0].toFixed(2)+")"
            +'\n'+"            = "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_da.toFixed(5);
         
            dcdw_num.text= "= "+this.slideNet.getLayer(layernum).getNeuron(neuronnum).dz_dw[weightnum].toFixed(2)+" × "
            +this.slideNet.getLayer(layernum).getNeuron(neuronnum).da_dz.toFixed(5)+" × "
            +this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_da.toFixed(5)
            +'\n'+"   = "+ this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_dw[weightnum].toFixed(5);
        }

    }

    drawTextButtons(){
        /*
        this.textbuttonContainer.addChild(new Button("nexttext",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true));
        this.textbuttonContainer.addChild(new Button("prevtext",PIXI.Texture.from('images/buttons/back.png'), layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,false));

        var slide = this;
        if(slide.textContainer.children.length<=1){
            this.textbuttonContainer.getChildByName("nexttext").visible=false;
        }

        this.textbuttonContainer.getChildByName("nexttext").on('click', function(e){
            slide.textcount++;
            slide.textContainer.getChildAt(slide.textcount).visible=true;

            if(slide.textcount==slide.textContainer.children.length-1){
                this.visible=false;
            }

            if(slide.textcount>=1){
                slide.textbuttonContainer.getChildByName("prevtext").visible=true;
            }
        });

        this.textbuttonContainer.getChildByName("prevtext").on('click', function(e){
            slide.textContainer.getChildAt(slide.textcount).visible=false;
            slide.textcount--;

            if(slide.textcount<1){
                slide.textbuttonContainer.getChildByName("prevtext").visible=false;
            }
            if(slide.textcount<slide.textContainer.children.length-1){
                slide.textbuttonContainer.getChildByName("nexttext").visible=true;
            }
        });*/
    }

    /*
    var textInstruct = [    
        [ ["Here is text without sprite"], [50, 350]],
        [ testsprite,["text WITH sprite"], [70, 100]],
        testsprite2, //just a sprite
        [ ["text check",typewriter], ["morecheck"],[70, 100]],
    ];   
    */


    // simplified text stuff after doing all this
    // oh well
    drawText(text){

        for (var i = 0; i<text.length; i++){
            if(text[i].isSprite){
                this.textContainer.addChild(text[i]);                
            
            //if first elem is sprite
            } else if(text[i][0].isSprite){
                var textwidth = 0;
                var textheight = 0;
                for(var j=1; j<(text[i].length)-1; j++){
                    
                    if(text[i][j][1] === undefined){
                        var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0], textstyles.default).width;
                        var textheight_temp=PIXI.TextMetrics.measureText(text[i][j][0], textstyles.default).height;
                    } else {
                        var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0],text[i][j][1]).width;
                        var textheight_temp=PIXI.TextMetrics.measureText(text[i][j][0], text[i][j][1]).height;
                    }

                    textwidth=textwidth+textwidth_temp;
                    if(textheight_temp>textheight){
                        textheight=textheight_temp;
                    }

                }

                var textbox = new PIXI.Graphics();
                textbox.beginFill(0xFFFFFF);
                textbox.drawRoundedRect(text[i][(text[i].length)-1][0]-10,text[i][(text[i].length)-1][1]-10,textwidth+20, textheight+20);
                textbox.endFill();

                this.textContainer.addChild(textbox);       
                
                for(var j=0; j<(text[i].length)-1; j++){
                     var textPiece= new PIXI.Text(text[i][j][0]);
                     textPiece.anchor.set(0,0.5);
                     textbox.addChild(textPiece);
 
                     if(text[i][j][1] === undefined){
                         textPiece.style= textstyles.default;
                     } else {
                         textPiece.style=text[i][j][1];
                     }
 
                     textPiece.y=text[i][(text[i].length)-1][1] + textheight/2;
 
                     if(j==0){
                         textPiece.x=text[i][(text[i].length)-1][0];
 
                     } else {
                         textPiece.x = textbox.getChildAt(j-1).x + textbox.getChildAt(j-1).width;
                     }
                 }
                textbox.addChild(text[i][0]);

            // if only text
            } else {


            var lines = 0;
            var textheight=0;
            var textwidth=0;
            var textheight_temp=24;

            for(var j=0; j<(text[i].length)-1; j++){

                // how many lines is the text box
                if(PIXI.TextMetrics.measureText(text[i][j][0],textstyles.default).lines.length>lines){
                    lines=PIXI.TextMetrics.measureText(text[i][j][0],textstyles.default).lines.length;
                }
                
                //get longest length/width
                if(text[i][j][1] === undefined){
                    var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0], textstyles.default).width;
                } else {
                    var textwidth_temp=PIXI.TextMetrics.measureText(text[i][j][0],text[i][j][1]).width;
                }

                var currlines = PIXI.TextMetrics.measureText(text[i][j][0],textstyles.default).lines.length;

                if(currlines==lines){
                    textwidth=textwidth+textwidth_temp;

                }

            }

            textheight=textheight_temp*lines;
            
            var textbox = new PIXI.Graphics();
                textbox.beginFill(0xFFFFFF);
                textbox.drawRoundedRect(text[i][(text[i].length)-1][0]-10,text[i][(text[i].length)-1][1]-10,textwidth+20, textheight+20);
                textbox.endFill();
            this.textContainer.addChild(textbox);       

            for(var j=0; j<(text[i].length)-1; j++){
                var textPiece= new PIXI.Text(text[i][j][0]);
                    textPiece.anchor.set(0,0.5);
                    textbox.addChild(textPiece);

                    if(text[i][j][1] === undefined){
                        textPiece.style= textstyles.default;
                    } else {
                        textPiece.style=text[i][j][1];
                    }

                    var currlines = PIXI.TextMetrics.measureText(text[i][j][0],textstyles.default).lines.length;
                    
                

                    
                    if(j==0){
                        
                        textPiece.x=text[i][(text[i].length)-1][0];

                        if(currlines < lines){ 
                            textPiece.y=text[i][(text[i].length)-1][1] + textheight/4;
                        } else {
                            textPiece.y=text[i][(text[i].length)-1][1] + textheight/2;
                        }
                    } else { 
                        var prevlines = PIXI.TextMetrics.measureText(text[i][j-1][0],textstyles.default).lines;
                        if(text[i][j-1][1] === undefined){
                            var prevstyle= textstyles.default;
                        } else {
                            var prevstyle=text[i][j-1][1];
                        }

                        if(currlines < lines){ 
                            textPiece.x=PIXI.TextMetrics.measureText(prevlines[prevlines.length-1],prevstyle).width + text[i][(text[i].length)-1][0];
                            textPiece.y=text[i][(text[i].length)-1][1] + textheight*3/4;
                        } else {
                            textPiece.x = textbox.getChildAt(j-1).x + textbox.getChildAt(j-1).width;
                            textPiece.y=text[i][(text[i].length)-1][1] + textheight/2;

                        }
                    }
                }
            }
        }
        /*
        var borders=new PIXI.Graphics();
        borders.lineStyle(2, 0x000000);
        borders.drawPolygon(

                            layout.CX-500,layout.CY-225,
                            layout.CX+500, layout.CY-225,
                            layout.CX+500, layout.CY+225,
                            layout.CX-500, layout.CY+225,
                            layout.CX-500, layout.CY-225,
                            )

        this.textContainer.addChild(borders);   
        
        var inner=new PIXI.Graphics();
        inner.lineStyle(2, 0xFF0000);
        inner.drawPolygon(

                            layout.CX-450,layout.CY-200,
                            layout.CX+450, layout.CY-200,
                            layout.CX+450, layout.CY+200,
                            layout.CX-450, layout.CY+200,
                            layout.CX-450, layout.CY-200,
                            )
                            
        this.textContainer.addChild(inner);   

        var center = new PIXI.Graphics();
        center.drawRect(layout.CX,layout.CY, 10,10)
        this.textContainer.addChild(center);   
            */
    }

    drawInteractive(){
        var interactive = new PIXI.Sprite(PIXI.Texture.from('images/interactive.png'));
            interactive.x=layout.CX+400;
            interactive.y=layout.CY-220;
        this.textContainer.addChild(interactive);

    }
}