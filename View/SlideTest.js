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

export class SlideTest{
    constructor(){
        this.buttonContainer  = new PIXI.Container();

        this.inputContainer = new PIXI.Container();
            this.inputBases = new PIXI.Container();
                this.inputBases.name = "inputBases";
            this.inputTexts = new PIXI.Container();
                this.inputTexts.name = "inputTexts";
        this.inputContainer.addChild(this.inputBases, this.inputTexts);

        this.neuronContainer = new PIXI.Container();
            this.neuronBases = new PIXI.Container();
                this.neuronBases.name = "neuronBases";
            this.neuronTexts = new PIXI.Container();
                this.neuronTexts.name = "neuronTexts";
            this.neuronOvers = new PIXI.Container();
                this.neuronOvers.name = "neuronOvers";
            this.neuronOverTexts = new PIXI.Container();
                this.neuronOverTexts.name = "neuronOverTexts";
            this.neuronSensors = new PIXI.Container();
                this.neuronSensors.name = "neuronSensors";
        this.neuronContainer.addChild(this.neuronBases, this.neuronTexts, this.neuronOvers, this.neuronOverTexts, this.neuronSensors);

        this.slideContainer = new PIXI.Container();
        this.slideContainer.addChild(this.buttonContainer, this.inputContainer, this.neuronContainer);
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
            slide.drawNeurons_init(net);
            console.log(net.layers.length)
        });

        // REMOVE LAYER
        this.buttonContainer.addChild(new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), layout.BUTTONS_X, 200, true));
        this.buttonContainer.getChildByName("remlayer").on('click', function(e){
            if(net.layers.length>1){
                net.removeLayer();
                net.update();
                slide.drawNeurons_init(net);
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
        this.drawInputs_init(net);
        this.drawNeurons_init(net);
    }

    draw_update(net){
        this.drawInputs_update(net);
        this.drawNeurons_update(net);
    }

    drawInputs_init(net){
        for(var i = 0; i<net.netInput.length; i++){

            var inputBase = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
                inputBase.anchor.set(0.5);
                inputBase.name = i.toString();
                inputBase.x= layout.NEURON_LEFTLIM - layout.NEURON_X_DIF;//leftlim;
                inputBase.y= (i * layout.NEURON_Y_DIF) + layout.NEURON_UPPERLIM + layout.NEURON_NUDGE;//(i*(inputHeight+buffer))+upperlim+buffer;
            this.inputBases.addChild(inputBase);

            var inputText = new PIXI.Text(net.netInput[i]);
                inputText.anchor.set(0.5);
                inputText.name = inputBase.name;

                console.log("text: "+inputBase.name);

                inputText.x = inputBase.x;
                inputText.y = inputBase.y;
            this.inputTexts.addChild(inputText);
        }
    }

    drawInputs_update(net){
        for(var i = 0; i<net.netInput.length; i++){

            var name = i.toString();
            this.inputContainer.getChildByName("inputTexts").getChildByName(name).text = net.netInput[i];
        }
    }


    drawNeurons_init(net){

        // for now, removing all neurons and redrawing whenever layers/neurons are added/removed
        // because it only happens on button clicks its not too taxing
        this.neuronBases.removeChildren();
        this.neuronTexts.removeChildren();
        this.neuronOvers.removeChildren();
        this.neuronOverTexts.removeChildren();
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
                    neuronText.name = neuronBase.name;
                    neuronText.x = neuronBase.x;
                    neuronText.y = neuronBase.y;
                this.neuronTexts.addChild(neuronText);

                var neuronOver = new PIXI.Sprite(PIXI.Texture.from('images/neuronOver.png'));
                    neuronOver.anchor.set(0.5);
                    neuronOver.name = neuronBase.name;
                    neuronOver.x = neuronBase.x;
                    neuronOver.y = neuronBase.y;
                    neuronOver.alpha = 0;
                    neuronOver.interactive = true;
                this.neuronOvers.addChild(neuronOver);

                var overText = new PIXI.Text(
                    "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                      + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                      + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
                      + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                      + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n',
                    small)
                    overText.anchor.set(0.5);
                    overText.name = neuronBase.name;
                    overText.x = neuronBase.x;
                    overText.y = neuronBase.y;
                    overText.alpha = 0;
                this.neuronOverTexts.addChild(overText);

                var sensor = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
                    sensor.anchor.set(0.5);
                    sensor.x = neuronBase.x;
                    sensor.y = neuronBase.y;
                    sensor.tint = 0xFFA500;
                    sensor.alpha = 0;
                    sensor.interactive = true;

                    var self = this;
                    sensor.on('mouseover', function(e){
                        self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=1;
                        self.neuronOverTexts.getChildAt(this.parent.getChildIndex(this)).alpha=1;
                    });

                    sensor.on('mouseout', function(e){
                        self.neuronOvers.getChildAt(this.parent.getChildIndex(this)).alpha=0;
                        self.neuronOverTexts.getChildAt(this.parent.getChildIndex(this)).alpha=0;
                    });
                this.neuronSensors.addChild(sensor);
            }
        }
    }

    drawNeurons_update(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){

                var name = i.toString() + j.toString();

                // update neuronText
                this.neuronContainer.getChildByName("neuronTexts").getChildByName(name).text = 
                    formatter.format(net.getLayer(i).neurons[j].output);
                
                // update tint
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
                
                // update overneuron
                this.neuronContainer.getChildByName("neuronOverTexts").getChildByName(name).text = 
                
                "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
                + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n' ;

            }
        }
    }
}