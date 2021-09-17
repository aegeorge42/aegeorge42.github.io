import {Button, tintDown, tintOver} from "./Button.js"
import {layout} from "./layout.js"
import {actFns} from "../../Model/actfns.js"
import {Data} from "../Model/data.js"
import {viewst} from "../Controller.js"
import {textstyles} from "./textstyles.js"
import { Net } from "../Model/net.js"
import { Graph } from "./Graph.js"


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

        this.costLabel = new PIXI.Container();
    
        this.textcount = 0; 
        this.textContainer = new PIXI.Container();
        //this.textContainer.position.set(0,0);

        //this.textContainer.pivot.set(0,0);
        //this.textContainer.pivot.set(this.textContainer.width,this.textContainer.height)

        this.graphContainer = new PIXI.Container();

     //   this.cardContainer = new PIXI.Container(); 
     //   this.miscContainer=new PIXI.Container();
        this.slideContainer=new PIXI.Container();
        
        const footer=new PIXI.Graphics();
        footer.name="footer";
        footer.beginFill(0xbfbfbf);
        footer.drawRect(0,window.innerHeight,window.innerWidth,-layout.FOOTER_HEIGHT);

        const header = new PIXI.Graphics();
        header.name="header";
        header.beginFill(0xbfbfbf);
        header.drawRect(0,0,window.innerWidth,layout.HEADER_HEIGHT);

        /*let text = new PIXI.MultiStyleText("Let's make some <ml>multiline</ml>\nand <ms>multistyle</ms> text for\n<pixi>Pixi.js!</pixi>",
        {
            "default": {
                fontFamily: "Arial",
                fontSize: "24px",
                fill: "#cccccc",
                align: "center"
            },
            "ml": {
                fontStyle: "italic",
                fill: "#ff8888"
            },
            "ms": {
                fontStyle: "italic",
                fill: "#4488ff"
            },
            "pixi": {
                fontSize: "64px",
                fill: "#efefef"
            }
        });

        */

        this.slideContainer.addChild(                     
                 
                                      this.weightsContainer,
                                      this.labelsContainer,

                                      this.neuronContainer,
                                      this.textContainer,

                                      this.inputContainer, 
                                    //  this.neuronContainer,
                                   //  this.cardContainer,
                                   //   this.textContainer,
                                      //this.labelsContainer,

                                      this.costLabel,
                                      this.graphContainer,

                                   //   this.imagesContainer,
                                      footer,
                                      header,
                                      this.buttonContainer,
                                      this.textbuttonContainer,
                                      );

        window.addEventListener('resize', resize);    

        var h=window.innerHeight;    
        function resize(){
            header.x=0;
            footer.width=window.innerWidth;
            footer.y=window.innerHeight-h;
            header.width=window.innerWidth;

            // shrug
            try{

                slide.textbuttonContainer.getChildByName("nexttext").x=window.innerWidth/2 +100;
                slide.textbuttonContainer.getChildByName("nexttext").y=window.innerHeight-(layout.FOOTER_HEIGHT/2);

                slide.textbuttonContainer.getChildByName("prevtext").x=window.innerWidth/2 -100;
                slide.textbuttonContainer.getChildByName("prevtext").y=window.innerHeight-(layout.FOOTER_HEIGHT/2);

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
    }

    drawActFnButtons(){
        var actfnsbox = new PIXI.Sprite(PIXI.Texture.from('images/actfnsbox.png'));
        //actfnsbox.scale.set(0.9)

            actfnsbox.name="actfnsbox";
            actfnsbox.x=5;
            actfnsbox.y=layout.BOTTOMBUFFER-100;
        this.buttonContainer.addChild(actfnsbox);

        var slide=this;
        actfnsbox.addChild(new Button("sigmoid",PIXI.Texture.from('images/buttons/sigmoid.png'), 70,65,true));
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

        actfnsbox.addChild(new Button("relu",PIXI.Texture.from('images/buttons/relu.png'), 180, 65,true));
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
        var layersbox = new PIXI.Sprite(PIXI.Texture.from('images/layersbox_horz.png'));
            layersbox.name="layersbox";
            layersbox.anchor.set(0.5)
            layersbox.x= window.innerWidth/2;//layout.NEURON_LEFTLIM-150;
            layersbox.y= 90;//layout.BOTTOMBUFFER-450; 
        this.buttonContainer.addChild(layersbox);

        layersbox.addChild(new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), -30, 0,true));
        layersbox.addChild(new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80, 0, true));

        layersbox.getChildByName("addlayer").on('click', function(e){
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

        for (var i =0; i<slide.slideNet.maxLayers; i++){
            this.buttonContainer.getChildByName("buttonNeuronAddContainer").addChild(new Button("addneuron",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),layout.NEURON_UPPERLIM-80, false));
            this.buttonContainer.getChildByName("buttonNeuronRemContainer").addChild(new Button("remneuron",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.NEURON_LEFTLIM+ (i*layout.NEURON_X_DIF),layout.NEURON_UPPERLIM-50, false));
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
    
        this.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(layernum).on('click', function(e){
            if(slide.slideNet.getLayer(layernum).neurons.length>1){

                slide.slideNet.getLayer(layernum).removeNeuron();
                slide.slideNet.update();
                slide.draw_init(slide.slideNet);
            }
        });
    }

    drawStyleButtons(){

        var slide=this;
        var stylebox = new PIXI.Sprite(PIXI.Texture.from('images/algorithmbox.png'));

            stylebox.name="stylebox";
            stylebox.x= 0;
            stylebox.y= 160//layout.BOTTOMBUFFER-250; 
        this.buttonContainer.addChild(stylebox);

        stylebox.addChild(new Button("stochastic",PIXI.Texture.from('images/buttons/stochastic.png'), 75, 70, true));
        stylebox.addChild(new Button("vanilla",PIXI.Texture.from('images/buttons/vanilla.png'), 75, 115,true));

        stylebox.getChildByName("stochastic").press=false;

        stylebox.getChildByName("stochastic").on('click', function(e){
            this.press=true; 
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").pressCount=0;       
            stylebox.getChildByName("vanilla").press=false;

            this.setTint(tintDown);
            stylebox.getChildByName("vanilla").tint=0xFFFFFF;
            stylebox.getChildByName("vanilla").tintDefault();

            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van_step").visible=false;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").visible=false;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("pause").visible=false;

        });

        stylebox.getChildByName("vanilla").press=true;
        stylebox.getChildByName("vanilla").setTint(tintDown);

        stylebox.getChildByName("vanilla").on('click', function(e){
            this.press=true;   
            stylebox.getChildByName("stochastic").press=false;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_stoch").pressCount=0;
     
            this.setTint(tintDown);
            stylebox.getChildByName("stochastic").tint=0xFFFFFF;
            stylebox.getChildByName("stochastic").tintDefault();
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van_step").visible=true;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").visible=true;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("pause").visible=false;
        });
    }

    drawRateButtons(){
        var slide=this;
        var ratebox = new PIXI.Sprite(PIXI.Texture.from('images/ratebox.png'));
            ratebox.name="ratebox";
            ratebox.x= 0;
            ratebox.y= layout.BOTTOMBUFFER-220; 
        this.buttonContainer.addChild(ratebox);
        
        ratebox.addChild(new Button("inc_rate",PIXI.Texture.from('images/buttons/plus.png'),60,95,true));
        ratebox.addChild(new Button("dec_rate",PIXI.Texture.from('images/buttons/minus.png'),90,95,true));
        
        var rateText = new PIXI.Text(slide.slideNet.learnRate.toFixed(4));
            rateText.name="rateText";
            rateText.x=35;
            rateText.y=45;
            ratebox.addChild(rateText);

        
        var rates= [0.0001, 0.001, 0.01, 0.03, 0.1, 0.3, 0.5, 1.0, 10.0];
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
                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);//slide.slideNet.learnRate*10);
                console.log(slide.slideNet.learnRate);
                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4)//"hi"//slide.slideNet.learnRate;
            }
        });

        ratebox.getChildByName("dec_rate").on('click', function(e){
            if(rates[rate_start+clickcount-1] !==undefined){
                clickcount--;

                slide.slideNet.setLearnRate(rates[rate_start+clickcount]);//slide.slideNet.learnRate*10)
                console.log(slide.slideNet.learnRate);

                ratebox.getChildByName("rateText").text=slide.slideNet.learnRate.toFixed(4)//"hi"//slide.slideNet.learnRate;
            }
                });


    }


    drawLearnButtons(graph){

        
        var slide=this;
        var pauselearn=0;
        this.loopcount=0;

        var learnbox = new PIXI.Sprite(PIXI.Texture.from('images/learnbox.png'));
            learnbox.name="learnbox";
            learnbox.x= 6;
            learnbox.y= 50; 
        this.buttonContainer.addChild(learnbox);

        var epoch = new PIXI.Text("0");
            epoch.name="epoch"

            epoch.x=window.innerWidth-200;
            epoch.y=layout.BOTTOMBUFFER-280;
        slide.costLabel.addChild(epoch);    

        learnbox.addChild(new Button("learn_stoch_step",PIXI.Texture.from('images/buttons/step.png'),212.5,60,true));
        learnbox.getChildByName("learn_stoch_step").on('click', function(e){
            slide.slideNet.learn();
            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

        });
        

        learnbox.addChild(new Button("learn_stoch",PIXI.Texture.from('images/buttons/learn.png'),125,60,true));
        learnbox.getChildByName("learn_stoch").pressCount=0;
        learnbox.getChildByName("learn_stoch").on('click', async function(e){
            this.pressCount++;
            pauselearn = 0;

            if(pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
            }

            //no double clicks
            if(this.pressCount==1){
            while(pauselearn==0){
                slide.slideNet.learn();
                slide.draw_update(slide.slideNet);
                
                if(graph){graph.updateGraph(slide.slideNet,graph);}
                await slide.sleep(100); //pause to see updates - 100 seems good

                slide.loopcount=slide.loopcount+1;

                slide.costLabel.getChildByName("epoch").text=slide.loopcount;
                // so you cant do both at the same time
                if(slide.buttonContainer.getChildByName("stylebox").getChildByName("vanilla").press==true){
                break;
                }

            }
        }
        });

        learnbox.addChild(new Button("learn_van_step",PIXI.Texture.from('images/buttons/step.png'),212.5,60,true));
        learnbox.getChildByName("learn_van_step").on('click', async function(e){
           
            slide.slideNet.learn_batch();
            await slide.sleep(100);

            slide.slideNet.update();

            slide.draw_update(slide.slideNet);
            if(graph){graph.updateGraph(slide.slideNet,graph);}

        });

        learnbox.addChild(new Button("learn_van",PIXI.Texture.from('images/buttons/learn.png'), 125,60,true));
        learnbox.getChildByName("learn_van").pressCount=0;

        learnbox.getChildByName("learn_van").on('click', async function(e){
            this.pressCount++;
            pauselearn=0;

            if(pauselearn==0){
                learnbox.getChildByName("pause").visible=true;
                console.log("pause should be vis")
            }

            if(this.pressCount==1){

                while(pauselearn==0){

                    await slide.sleep(100);
                    slide.slideNet.learn_batch();
                   // console.log(slide.slideNet.costTot);

                    slide.slideNet.update();
                    slide.draw_update(slide.slideNet);   
            
                    if(graph){graph.updateGraph(slide.slideNet,graph);}
        
                    slide.loopcount=slide.loopcount+1;
                    slide.costLabel.getChildByName("epoch").text=slide.loopcount;


                    if(slide.buttonContainer.getChildByName("stylebox").getChildByName("stochastic").press==true){
                        console.log("stoc press")
                        break;
                    }
                }
            }
        });

        learnbox.addChild(new Button("pause",PIXI.Texture.from('images/buttons/pause.png'),125,60,false));
        var pauselearn=0;
        learnbox.getChildByName("pause").on('click', function(e){
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_stoch").pressCount=0;
            slide.buttonContainer.getChildByName("learnbox").getChildByName("learn_van").pressCount=0;

            pauselearn=1;
            this.visible=false;
        });

        learnbox.addChild(new Button("reset",PIXI.Texture.from('images/buttons/reset.png'),38,60,true));        
        learnbox.getChildByName("reset").on('click', function(e){
            slide.loopcount=0;
            slide.costLabel.getChildByName("epoch").text=slide.loopcount;
            graph.clearGraphBg();

            for(var i=0;i<slide.slideNet.layers.length;i++){
                slide.buttonContainer.getChildByName("buttonNeuronAddContainer").getChildAt(i).visible=false;
                slide.buttonContainer.getChildByName("buttonNeuronRemContainer").getChildAt(i).visible=false;
            }

            var newnet = new Net();
            
            newnet.setNetData(slide.slideNet.data);
            newnet.setNetActFn(slide.slideNet.netActFn);
            newnet.getLayer(0).addNeuron();
            newnet.getLayer(0).addNeuron();
            newnet.setOutLayer();
            newnet.update();
            slide.slideNet=newnet;
            slide.draw_init(newnet);
        });
    }

    
    drawDataButtons(graph){

        var newdatax=window.innerWidth-260;
        var newdatay= 50
        var slide=this;
        
        var databox= new PIXI.Sprite(PIXI.Texture.from('images/databox.png'));
        databox.name="databox"
            databox.x=newdatax
            databox.y=newdatay
        this.buttonContainer.addChild(databox);//new Button("newdata_circle",PIXI.Texture.from('images/buttons/datacircle1.png'),newdatax,newdatay,true));   


        databox.addChild(new Button("newdata",PIXI.Texture.from('images/buttons/datalin.png'),100,60,true));   
        databox.getChildByName("newdata").on('click', function(e){
            graph.clearGraph_all(slide.slideNet.data);
            slide.loopcount=0;
            slide.costLabel.getChildByName("epoch").text=0;    

            graph.posAxis();
            graph.axis.texture=PIXI.Texture.from('images/axis.png');

            

            var newdata = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
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


        });

        databox.addChild(new Button("newdata_circle",PIXI.Texture.from('images/buttons/datacircle.png'),195,60,true));   
        databox.getChildByName("newdata_circle").on('click', function(e){
            graph.clearGraph_all(slide.slideNet.data);
            slide.loopcount=0;
            slide.costLabel.getChildByName("epoch").text=0;    


            graph.negAxis();
            graph.axis.texture=PIXI.Texture.from('images/axis_neg.png');

            var newdata = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
                newdata.large=true;

            newdata.makefruits_circle_newaxis();
            newdata.shuffle();
            slide.slideNet.setNetData(newdata);
            slide.slideNet.setNetInput(newdata.points[0]);
            slide.slideNet.update();
            slide.draw_update(slide.slideNet);
            graph.populateGraph(newdata);

        });

    }


    draw_init(net){
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
    //    this.drawInputs_update(net);
      //  this.drawLabels_update(net);
    }
        
    drawWeights_init(net){
        var slide = this;

        if(!this.backprop){
            this.weightsContainer.removeChildren();
        }

        var addedlabels=0;
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

                    if(this.backprop && addedlabels==0){
                        addedlabels=1;
                        var x= layout.NEURON_LEFTLIM -layout.NEURON_X_DIF/2 +20;
                        var y= layout.NEURON_UPPERLIM;
            
                        var w1=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w1.png'));
                            w1.anchor.set(0.5)
                            w1.x=x;
                            w1.y=y-5;
                        var w2=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w2.png'));
                            w2.anchor.set(0.5)
                            w2.x=x;
                            w2.y=y+40
                        var w3=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w3.png'));
                            w3.anchor.set(0.5)
                            w3.x=x +20;
                            w3.y=y+100;
                        var w4=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w4.png'));
                            w4.anchor.set(0.5)
                            w4.x=x;
                            w4.y=y+150;
            
                        var w5=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w54.png'));
                            w5.anchor.set(0.5)
                            w5.x=x+180;
                            w5.y=y+5;
                        var w6=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w6.png'));
                            w6.anchor.set(0.5)
                            w6.x=x+180;
                            w6.y=y+50;
                        var w7=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w7.png'));
                            w7.anchor.set(0.5)
                            w7.x=x+210;
                            w7.y=y+120;
                        var w8=new PIXI.Sprite(PIXI.Texture.from('images/backprop/w8.png'));
                            w8.anchor.set(0.5)
                            w8.x=x+180;
                            w8.y=y+160;
                        
                        this.weightsContainer.addChild(w1,w2,w3,w4,w5,w6,w7,w8)
            
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


                    var addweight = new Button("+",PIXI.Texture.from('images/buttons/plus.png'),(startx+endx)/2,(starty+endy)/2,false);
                    var loseweight = new Button("-",PIXI.Texture.from('images/buttons/minus.png'),((startx+endx)/2)-25,(starty+endy)/2,false);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){
                        var xbuffer=Math.max(0,(window.innerWidth-viewst.startwidth)/6);
                        var ybuffer=Math.max(0,(window.innerHeight-viewst.startheight)/4);

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
                      console.log(net.dataIdx)
                      console.log(net.netInput)
                      //this.parent.getChildByName("weightText").text=net.getLayer(this.parent.idx[0]).getNeuron(this.parent.idx[1]).getWeight(this.parent.idx[2]).toFixed(2);
                        //console.log(this.parent.getChildByName("weightText"))
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
                    var endy = layout.NEURON_UPPERLIM_LARGE + (k*layout.NEURON_LARGE_Y_DIF);
                    
                    var hitbuffer = 10;
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

                                

                    var addweight = new Button("+",PIXI.Texture.from('images/buttons/plus.png'),(startx+endx)/2,(starty+endy)/2,false);
                    var loseweight = new Button("-",PIXI.Texture.from('images/buttons/minus.png'),((startx+endx)/2)-25,(starty+endy)/2,false);
                    weightSprite.addChild(addweight,loseweight);
                                        
                    weightSprite.on('mouseover', function(e){
                        var xbuffer=Math.max(0,(window.innerWidth-viewst.startwidth)/6);
                        var ybuffer=Math.max(0,(window.innerHeight-viewst.startheight)/4);

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
                    ///    console.log(this);
                  
                    });
  
                    loseweight.on('click', function(e){
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
                        color = 0xFF5733;
                    } else if(net.getLayer(i).neurons[j].weights[k] > 0){
                        color = 0x344EE8;
                    }

                    this.weightsContainer.getChildByName(name).updateLineStyle(thickness, color, 1);
                    this.weightsContainer.getChildByName(name).getChildByName("weightTextBox").getChildByName("weightText").text=
                    net.getLayer(i).getNeuron(j).getWeight(k).toFixed(2);

                    if(this.backprop_steps){
                        this.slideNet.backprop();
                        this.textContainer.getChildByName("dzdw_form").text= this.slideNet.getLayer(this.layernum-1).getNeuron(this.neuronnum).output.toFixed(5);
                        this.textContainer.getChildByName("dzdw_num").text=this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dz_dw[this.weightsnum].toFixed(5);
                        
                        this.textContainer.getChildByName("dadz_form").text=this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(5) + 
                        " x " + "(1-" +this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).output.toFixed(5) +")";
                        this.textContainer.getChildByName("dadz_num").text=this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).da_dz.toFixed(5)
                        
                        this.textContainer.getChildByName("dcda_form").text="("+this.slideNet.getLayer(this.layernum-1).getNeuron(this.neuronnum).output.toFixed(5)+
                        "-"+this.slideNet.target[this.neuronnum]+")";
                        this.textContainer.getChildByName("dcda_num").text=this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_da.toFixed(5);
                        
                        
                        this.textContainer.getChildByName("dcdw_num").text=this.slideNet.getLayer(this.layernum).getNeuron(this.neuronnum).dc_dw[this.weightsnum].toFixed(5);
                        this.textContainer.getChildByName("dcdw_form").text=this.textContainer.getChildByName("dzdw_num").text + " × " +
                                this.textContainer.getChildByName("dadz_num").text + " × " +
                                this.textContainer.getChildByName("dcda_num").text;
                        //dzdw_num.text+" × "+dadz_num.text+" × "+dcda_num.text;

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
      
        for(var i = 0; i<net.layers.length; i++){
          for(var j = 0; j<net.getLayer(i).neurons.length; j++){


                var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron2.png'));
            
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
            str=str+formatter.format(net.getLayer(i).neurons[j].bias)+"\n  ━━━━━";//+"\n   "+formatter.format(net.getLayer(i).neurons[j].output_nofn)

            var overText0 = new PIXI.Text(str,textstyles.small);
            overText0.anchor.set(0,0.5);
            overText0.x=-69;

            var overneuron_small =   new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: 15,
                fill:  0x00ad09
            });

            var overneuron_large=   new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 400,
                fontSize: 24,
                fill:  0x7c00ad
            });

            var overText1 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),overneuron_small)
            overText1.anchor.set(0,0.5);
            overText1.x=-50;
            overText1.y=35;

            var overText15 = new PIXI.Text("𝑓(      )=",textstyles.default);
            overText15.anchor.set(0,0.5);
            overText15.x=2;
              
            var overText2 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output_nofn),overneuron_small);
            overText2.anchor.set(0,0.5);
            overText2.x=20;

            var overText3 = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output),overneuron_large)
            overText3.anchor.set(0,0.5);
            overText3.x=10;
            overText3.y=25;
            

            var neuronOver = new PIXI.Sprite(PIXI.Texture.from('images/overneuron1.png'));
                neuronOver.anchor.set(0.5);
                neuronOver.scale.set(1.5);
                neuronOver.name = neuronBase.name;
                neuronOver.x=neuronBase.x;
                neuronOver.y=neuronBase.y;
                neuronOver.alpha=0;
            neuronOver.addChild(overText0,overText1,overText15,overText2,overText3);



            
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
            

            // backprop neuron bases have both z and a showing
            if(this.backprop){
                neuronBase.texture=PIXI.Texture.from('images/neuron_backprop.png');
                neuronBase.tint=0xFFFFFF;

                if(this.backprop_steps){
                    neuronText.text=formatter.format(net.getLayer(i).neurons[j].output_nofn)+"  "+formatter.format(net.getLayer(i).neurons[j].output);
                } else {
                    neuronText.text="";     

                    if(i==0 && j==0){
                        var z1=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z1.png'));
                        z1.anchor.set(0.5)
                        z1.x=-26;
                        z1.y=10;    
                        neuronText.addChild(z1);

                        var a1=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a1.png'));
                        a1.anchor.set(0.5)
                        a1.x=35;
                        a1.y=10;    
                        neuronText.addChild(a1);
                
                    } else if(i==1 && j==0){

                        var z3=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z3.png'));
                        z3.anchor.set(0.5)
                        z3.x=-28;
                        z3.y=10;    
                        neuronText.addChild(z3);

                        var a3=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a3.png'));
                        a3.anchor.set(0.5)
                        a3.x=32;
                        a3.y=10;    
                        neuronText.addChild(a3);
                        

                    } else if(i==0 && j==1){
                        var z2=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z2.png'));
                        z2.anchor.set(0.5)
                        z2.x=-28;
                        z2.y=10;    
                        neuronText.addChild(z2);

                        var a2=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a2.png'));
                        a2.anchor.set(0.5)
                        a2.x=32;
                        a2.y=10;    
                        neuronText.addChild(a2);

                    } else if(i==1 && j==1){
                        var z4=new PIXI.Sprite(PIXI.Texture.from('images/backprop/z4.png'));
                        z4.anchor.set(0.5)
                        z4.x=-26;
                        z4.y=10;    
                        neuronText.addChild(z4);

                        var a4=new PIXI.Sprite(PIXI.Texture.from('images/backprop/a4.png'));
                        a4.anchor.set(0.5)
                        a4.x=32;
                        a4.y=10;    
                        neuronText.addChild(a4);

                    }

                    /*
                    neuronText.scale.set(1.5)
                    neuronText.anchor.set(0,0)
                    neuronText.text="a";     
                    neuronText.style.fill = 0x6903a3;

                    neuronText.x=5;
                    neuronText.y=-18;

                    var anum = new PIXI.Text(1, new PIXI.TextStyle({
                        fontFamily: 'Helvetica',
                        fontWeight: 400,
                        fontSize: 15,
                        fill: 0x6903a3

                    }),);
                    
                    anum.x=15;
                    anum.y=15;

                    var neuronText2=new PIXI.Text("z");
                        neuronText2.anchor.set(0,0)
                        neuronText2.style.fill = 0x009603;
                        neuronText2.x=-30;
                        neuronText2.y=0;

                    neuronText.addChild(neuronText2,anum)

                    var znum = new PIXI.Text(1, new PIXI.TextStyle({
                        fontFamily: 'Helvetica',
                        fontWeight: 400,
                        fontSize: 15,
                        fill: 0x009603
                    }),);
                    
                    znum.x=15;
                    znum.y=15;

                    if(i==0 && j==1){
                        znum.text=2;
                    } else if(i==1 && j==0){
                        znum.text=3;
                    } else if(i==1 && j==1){
                        znum.text=4;
                    }
                    anum.text=znum.text;
                    neuronText2.addChild(znum);
                    */
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
            var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron_large1.png'));
            
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

            var overText_paren= new PIXI.Text("(           ) =", new PIXI.TextStyle({
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
            overText_actfn.anchor.set(1,0.5);
            overText_actfn.x=115;
            overText_actfn.y=-5;

            var overText_actfn_out = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output), new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontWeight: 500,
                fontSize: 40,
                fill: 0x7c00ad,
            }));
            overText_actfn_out.anchor.set(1,0.5);
            overText_actfn_out.x=105;
            overText_actfn_out.y=50;
               
            neuronBase.addChild(overText_weights,overText_outnofn);
            neuronBase.addChild(overText_f,overText_paren,overText_actfn,overText_actfn_out);

            var neuronOver_large=new PIXI.Sprite(PIXI.Texture.from('images/neuronovertest.png'));
                neuronOver_large.anchor.set(0.5);

                neuronOver_large.x=layout.NEURON_LARGE_X;
                neuronOver_large.y=layout.NEURON_LARGE_Y;
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
                    //  neuronBase.texture=PIXI.Texture.from('images/neuron_backprop.png');
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
                
                currBase.getChildAt(4).text=formatter.format(net.getLayer(i).neurons[j].output_nofn);
                currBase.getChildAt(5).text=formatter.format(net.getLayer(i).neurons[j].output);

                console.log(currBase.getChildAt(5).text);
                var currOver = this.neuronContainer.getChildByName("neuronOvers").getChildAt(0);
                currOver.getChildAt(0).text=formatter.format(net.getLayer(i).neurons[j].output)//formatter.format(net.getLayer(i).neurons[j].output);

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

            var inputBase = new PIXI.Sprite(PIXI.Texture.from('images/inputbase.png'));
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_Y_DIF) + layout.NEURON_UPPERLIM + layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputContainer.addChild(inputBase);

            if(this.backprop_labels){
                if(i==0){
                    var inputText = new PIXI.Sprite(PIXI.Texture.from('images/backprop/in1.png'));
                } else if(i==1){
                    var inputText = new PIXI.Sprite(PIXI.Texture.from('images/backprop/in2.png'));

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

            var inputBase = new PIXI.Sprite(PIXI.Texture.from('images/inputBase.png'));
                inputBase.scale.set(1.2);
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LARGE_LEFTLIM //- layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_LARGE_Y_DIF) + layout.NEURON_UPPERLIM_LARGE; //+ layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
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

            targetLabel0.text="y = "+net.target[0];
            typeLabel0.text="";
            targetLabel0.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF +60;
            targetLabel0.y=layout.NEURON_UPPERLIM //+ (layout.NEURON_Y_DIF);

            /*
            var cost1=new PIXI.Text("C1 = 1/2 (a3 - y1)^2",textstyles.default)
            cost1.x=0;
            cost1.y=25;
            targetLabel0.addChild(cost1);
*/
            var targetLabel1= this.labelsContainer.getChildByName("targetLabel1");
            var typeLabel1= this.labelsContainer.getChildByName("typeLabel1");

            targetLabel1.text="y = "+net.target[1];
            typeLabel1.text="";
            targetLabel1.x=layout.NEURON_LEFTLIM + (net.layers.length-1)*layout.NEURON_X_DIF +60;
            targetLabel1.y=layout.NEURON_UPPERLIM + (layout.NEURON_Y_DIF);
/*
            var cost2=new PIXI.Text("C2 = 1/2 (a4 - y2)^2",textstyles.default)
            cost2.x=0;
            cost2.y=25;
            targetLabel1.addChild(cost2);
*/
            if(this.backprop_labels){
                targetLabel0.text="     = target";
                
                var y1 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/y1.png'));
                var c1 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/c1.png'));
                c1.scale.set(0.55)
                c1.x=-10;
                c1.y=10;
                targetLabel0.addChild(y1,c1);

                targetLabel1.text="     = target";

                var y2 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/y2.png'));
                var c2 = new PIXI.Sprite(PIXI.Texture.from('images/backprop/c2.png'));
                c2.scale.set(0.55)
                c2.x=-10;
                c2.y=10;
                targetLabel1.addChild(y2,c2);
            } else if (this.backprop_labels1){
                targetLabel0.text="";
                targetLabel1.text="";

            }
            
        }


        if(!this.backprop_labels){

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
        
        var target = new PIXI.Sprite(PIXI.Texture.from('images/strawberrycard.png'));

        target.anchor.set(0.5)
        target.name="target";

        if (net.targetText=="blueberry"){
            target.texture=PIXI.Texture.from('images/blueberrycard.png');
        } else if (net.targetText=="strawberry"){
            target.texture=PIXI.Texture.from('images/strawberrycard.png');
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
        this.labelsContainer.addChild(target);

        if(this.backprop_labels){
            target.visible=false;
        }

    }
/*
    this.dataIdx=(this.dataIdx+1)%this.data.points.length;
        this.setNetInput(this.data.points[this.dataIdx]);
        this.update();*/

    drawLabels_init_large(net){
        for(var i=0; i<net.data.labels.length; i++){
            // input types ex. length, roundness
            var inputLabel = new PIXI.Text(net.data.labels[i],textstyles.default);
                inputLabel.anchor.set(0.5);
                inputLabel.x = layout.NEURON_LARGE_LEFTLIM;
                inputLabel.y = layout.NEURON_UPPERLIM_LARGE + (i*layout.NEURON_LARGE_Y_DIF) +50;
            this.labelsContainer.addChild(inputLabel);
        }

    }

    drawCost_steps(){

        var costBox = new PIXI.Sprite(PIXI.Texture.from('images/cost.png'));
            costBox.name= "costBox";
            costBox.anchor.set(0.5)
            costBox.x=layout.NEURON_LEFTLIM +330;//window.innerWidth-170;
            costBox.y=layout.BOTTOMBUFFER-80;          
        this.labelsContainer.addChild(costBox);

        var costText= new PIXI.Text("",textstyles.cost);
            costText.text=formatter_long.format(this.slideNet.costTot)
            costText.name = "costText";
            costText.anchor.set(0.5)
            costText.y=15;
        costBox.addChild(costText);

        if(!this.backprop){
        var cost1box=  new PIXI.Sprite(PIXI.Texture.from('images/cost1box.png'));
            cost1box.name="cost1box";
            cost1box.x=layout.NEURON_LEFTLIM +155;
            cost1box.y=layout.NEURON_UPPERLIM -40;
        this.labelsContainer.addChild(cost1box);

        var cost1= new PIXI.Text(this.slideNet.netOut[0].toFixed(2)+" - "+this.slideNet.target[0],textstyles.cost)
            cost1.name="cost1"
            cost1.x=130;
            cost1.y=54;
        cost1box.addChild(cost1);

        var cost2box=  new PIXI.Sprite(PIXI.Texture.from('images/cost2box.png'));
            cost2box.name="cost2box";
            cost2box.x=layout.NEURON_LEFTLIM +155;
            cost2box.y=layout.NEURON_UPPERLIM +90;
        this.labelsContainer.addChild(cost2box);

        var cost2= new PIXI.Text(this.slideNet.netOut[1].toFixed(2)+" - "+this.slideNet.target[1],textstyles.cost)
            cost2.name="cost2"
            cost2.x=130;
            cost2.y=54;
        cost2box.addChild(cost2);

        var costplus= new PIXI.Sprite(PIXI.Texture.from('images/costplus.png'));
            costplus.name="costplus";
            costplus.x=layout.NEURON_LEFTLIM +80;
            costplus.y=layout.BOTTOMBUFFER-120;
        this.labelsContainer.addChild(costplus);
        }

        if (this.backprop_labels){
            var cplus = new PIXI.Sprite(PIXI.Texture.from('images/backprop/cplus2.png'));
            cplus.anchor.set(0.5)
            cplus.scale.set(0.5)
            cplus.x=0;
            cplus.y=10;
        
        
            this.labelsContainer.getChildByName("costBox").getChildAt(0).visible=false;
            this.labelsContainer.getChildByName("costBox").addChild(cplus);
            this.labelsContainer.getChildByName("costBox").y=layout.NEURON_UPPERLIM + layout.NEURON_Y_DIF/2 +30;
        }

    }

    drawCost(){
        var costBox = new PIXI.Sprite(PIXI.Texture.from('images/cost.png'));
            costBox.name= "costBox";
            costBox.anchor.set(0.5)
            costBox.x=window.innerWidth-80;
            costBox.y=layout.BOTTOMBUFFER-280;          
        this.costLabel.addChild(costBox);
    
        var costText= new PIXI.Text("",textstyles.large);

        if(this.buttonContainer.getChildByName("stylebox") !== null){
            if(this.buttonContainer.getChildByName("stylebox").getChildByName("vanilla").press==true){
                if(this.slideNet.costTot_batch!=undefined){
                costText.text=formatter_long.format(this.slideNet.costTot_batch)
                } else {
                    costText.text=formatter_long.format(this.slideNet.costTot)

                }
            } else if(this.buttonContainer.getChildByName("stylebox").getChildByName("stochastic").press==true){
                costText.text=formatter_long.format(this.slideNet.costTot)
            }
        }
        costText.name = "costText";
        costText.anchor.set(0.5)
        costText.y=15;
            
        costBox.addChild(costText);
    }

    drawLabels_update(net){

        var targetimg = this.labelsContainer.getChildByName("target");
        var random = Math.floor(Math.random() * (4) + 1);
       // console.log(target.texture)


            if (net.targetText=="blueberry"){
                targetimg.texture=PIXI.Texture.from('images/blueberrycard.png');
            } else if (net.targetText=="strawberry"){
            targetimg.texture=PIXI.Texture.from('images/strawberrycard.png');
            }


        
        if (this.slideContainer.getChildAt(1).getChildByName("targetLabel0") !== null){
        this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="target: "+this.slideNet.target[0]
        this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="target: "+this.slideNet.target[1]

        }

        if(this.backprop){
            this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="y = "+net.target[0];
            this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="y = "+net.target[1];
            this.slideContainer.getChildAt(1).getChildByName("targetLabel0").getChildAt(0).text="C1 = "+net.cost[0].toFixed(2)
            this.slideContainer.getChildAt(1).getChildByName("targetLabel1").getChildAt(0).text="C2 = "+net.cost[1].toFixed(2)

        }

        if(this.backprop_labels){
            this.slideContainer.getChildAt(1).getChildByName("targetLabel0").text="     = target";
            this.slideContainer.getChildAt(1).getChildByName("targetLabel1").text="     = target";
        }

    }

    drawCost_update(net){
        if (this.costLabel.getChildByName("costBox") !== null){

            this.costLabel.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot);

            if(this.buttonContainer.getChildByName("stylebox") !== null){
                if(this.buttonContainer.getChildByName("stylebox").getChildByName("vanilla").press==true){
                    if(net.costTot_batch !== undefined ){
                        this.costLabel.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot_batch);
                    } else {
                        this.costLabel.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot);
                    }
                }  
            }
        }

        if (this.costSteps && !this.backprop_labels){
            this.labelsContainer.getChildByName("cost1box").getChildByName("cost1").text=this.slideNet.netOut[0].toFixed(2)+" - "+this.slideNet.target[0]
            this.labelsContainer.getChildByName("cost2box").getChildByName("cost2").text=this.slideNet.netOut[1].toFixed(2)+" - "+this.slideNet.target[1]
            
            if(this.labelsContainer.getChildByName("costbox") !== undefined){
                this.labelsContainer.getChildByName("costBox").getChildByName("costText").text=formatter_long.format(net.costTot);

            }
        
        }
       
    }

    drawBackprop(layernum,neuronnum,weightnum){

        var x = 850;

        //dz_dw
        var dzdw= new PIXI.Text("dzdw=");
            dzdw.x=x;
            dzdw.y=100;
        this.textContainer.addChild(dzdw);

        var dzdw_num= new PIXI.Text("",textstyles.label_med);
            dzdw_num.anchor.set(1,0)
            dzdw_num.name="dzdw_num";
            dzdw_num.x=dzdw.x+180;
            dzdw_num.y=dzdw.y;
        this.textContainer.addChild(dzdw_num);

        var dzdw_form= new PIXI.Text("",textstyles.label_med);
            dzdw_form.name="dzdw_form";
            dzdw_form.x=dzdw.x;
            dzdw_form.y=dzdw.y+30;
        this.textContainer.addChild(dzdw_form);

        //da_dz
        var dadz= new PIXI.Text("dadz=");
            dadz.x=x;
            dadz.y=180;
        this.textContainer.addChild(dadz);

        var dadz_num= new PIXI.Text("",textstyles.label_med);
            dadz_num.anchor.set(1,0)
            dadz_num.name="dadz_num";
            dadz_num.x=dadz.x+180;
            dadz_num.y=dadz.y;
        this.textContainer.addChild(dadz_num);

        var dadz_form= new PIXI.Text("",textstyles.label_med);
            dadz_form.name="dadz_form";
            dadz_form.x=dadz.x;
            dadz_form.y=dadz.y+30;
        this.textContainer.addChild(dadz_form);

        //dc_da
        var dcda= new PIXI.Text("dcda=");
            dcda.x=x;
            dcda.y=280;
        this.textContainer.addChild(dcda);

        var dcda_num= new PIXI.Text("",textstyles.label_med);
            dcda_num.anchor.set(1,0)

            dcda_num.name="dcda_num";
            dcda_num.x=dcda.x+180;
            dcda_num.y=dcda.y;
        this.textContainer.addChild(dcda_num);

        var dcda_form= new PIXI.Text("",textstyles.label_med);
            dcda_form.name="dcda_form";
            dcda_form.x=dcda.x;
            dcda_form.y=dcda.y+30;
        this.textContainer.addChild(dcda_form);

        //DC_DW
        var dcdw= new PIXI.Text("dcdw=");
            dcdw.x=x;
            dcdw.y=400;
        this.textContainer.addChild(dcdw);

        var dcdw_num= new PIXI.Text("",textstyles.label_med);
            dcdw_num.anchor.set(1,0)
            dcdw_num.name="dcdw_num";
            dcdw_num.x=dcdw.x+180;
            dcdw_num.y=dcdw.y;
        this.textContainer.addChild(dcdw_num);

        var dcdw_form= new PIXI.Text("",textstyles.label_med);
            dcdw_form.name="dcdw_form";
            dcdw_form.x=dcdw.x;
            dcdw_form.y=dcdw.y+30;
        this.textContainer.addChild(dcdw_form);


        this.slideNet.backprop();

       // console.log(this.slideNet.getLayer(layernum).getNeuron(neuronnum))
        dzdw_form.text= this.slideNet.getLayer(layernum-1).getNeuron(neuronnum).output.toFixed(5);
        dzdw_num.text=this.slideNet.getLayer(layernum).getNeuron(neuronnum).dz_dw[weightnum].toFixed(5);

        dadz_form.text=this.slideNet.getLayer(layernum).getNeuron(neuronnum).output.toFixed(5) + 
            " × " + "(1-" +this.slideNet.getLayer(layernum).getNeuron(neuronnum).output.toFixed(5) +")";
        dadz_num.text=this.slideNet.getLayer(layernum).getNeuron(neuronnum).da_dz.toFixed(5);

        dcda_form.text="("+this.slideNet.getLayer(layernum-1).getNeuron(neuronnum).output.toFixed(5)+
                        "-"+this.slideNet.target[neuronnum]+")";
        dcda_num.text=this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_da.toFixed(5);

        dcdw_form.text=dzdw_num.text+" × "+dadz_num.text+" × "+dcda_num.text;
        dcdw_num.text=this.slideNet.getLayer(layernum).getNeuron(neuronnum).dc_dw[weightnum].toFixed(5);

        
          

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
        for (var i =0; i<this.textContainer.children.length; i++){
            this.textContainer.getChildAt(i).visible=false;
        }
        this.textContainer.getChildAt(0).visible=true;
        */
    }
}