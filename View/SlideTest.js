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
        this.neuronBaseContainer  = new PIXI.Container();
        this.neuronOverContainer  = new PIXI.Container();
        this.neuronSensorContainer  = new PIXI.Container();

        this.slideContainer = new PIXI.Container();
        this.slideContainer.addChild(this.buttonContainer,
                                     this.neuronBaseContainer,
                                     this.neuronOverContainer,
                                     this.neuronSensorContainer
                                     );
    }

    formatList(list){
        var nums2print = new Array(list.length);
        for(var n=0; n<list.length; n++){
          nums2print[n]=formatter.format(list[n]);
        }
        return nums2print;
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
                console.log(net.layers.length)
            }
        });
    }

    drawNeurons_init(net){

        // for now, removing all neurons and redrawing whenever layers/neurons are added/removed
        // because it only happens on button clicks its not too taxing
        this.neuronBaseContainer.removeChildren();
        this.neuronOverContainer.removeChildren();
        this.neuronSensorContainer.removeChildren();



        for(var i = 0; i<net.layers.length; i++){

            for(var j = 0; j<net.getLayer(i).neurons.length; j++){
        
                var neuronBase = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
                    neuronBase.anchor.set(0.5);
                    neuronBase.name= i.toString() + j.toString();
                    neuronBase.x= layout.NEURON_LEFTLIM + (i * layout.NEURON_X_DIF);
                    neuronBase.y= layout.NEURON_UPPERLIM + (j * layout.NEURON_Y_DIF);

                var neuronText = new PIXI.Text(formatter.format(net.getLayer(i).neurons[j].output));
                    neuronText.anchor.set(0.5);
                    neuronText.name=neuronBase.name;
                    neuronText.x=neuronBase.x;
                    neuronText.y=neuronBase.y;

                var overNeuron = new PIXI.Sprite(PIXI.Texture.from('images/overneuron.png'));
                    overNeuron.anchor.set(0.5);
                    overNeuron.name=neuronBase.name;
                    overNeuron.x=neuronBase.x;
                    overNeuron.y=neuronBase.y;
                    overNeuron.alpha=0;
                    overNeuron.interactive=true;

                var overText = new PIXI.Text(
                    "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
                      + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
                      + "b: " + formatter.format(net.getLayer(i).neurons[j].bias) +'\n'
                      + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
                      + "   " + formatter.format(net.getLayer(i).neurons[j].output) + '\n',
                    small)
                    overText.anchor.set(0.5);
                    overNeuron.addChild(overText);

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
                this.neuronBaseContainer.addChild(neuronBase, neuronText);
            }
        }
    }

    drawNeurons_update(net){
        for(var i = 0; i<net.layers.length; i++){
            for(var j = 0; j<net.getLayer(i).neurons.length; j++){

                
            }
        }
    }
}