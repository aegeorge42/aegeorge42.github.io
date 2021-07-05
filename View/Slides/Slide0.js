import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"

export const Slide0 = new Slide();
export const net = new Net();

const testInput = {
    input: [5, 10],
    expected: [1],
    expected_text: ""
};

const maxLayers = 3;
const maxNeurons = 4;

net.setNetInput(testInput.input,testInput.expected);
net.setNetActFn(actFns.LINEAR);

/*net.getLayer(0).addNeuron();

net.update();
net.addLayer();
net.update();
net.addLayer();
*/
Slide0.updateDraw(net);

/** ADD ALL THE BUTTONS **/ 

//ADD LAYER
Slide0.addButton("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,layout.UPPERLIM +50,true);
Slide0.buttonContainer.getChildByName("addlayer").on('click', function(e){
    if(net.layers.length<maxLayers){
        net.addLayer();
        Slide0.updateDraw(net);
    }

    if(!Slide0.isVis("addn1")){
        Slide0.setVis("addn1",true);
        Slide0.setVis("remn1",true);
    } else if(Slide0.isVis("addn1") && !Slide0.isVis("addn2")){
        Slide0.setVis("addn2",true);
        Slide0.setVis("remn2",true);
    }

});

//TODO: GRAYING OUT ONLY KINDA WORKS
//REMOVE LAYER
Slide0.addButton("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,layout.UPPERLIM +100 +20,true);
if(net.layers.length<=1){
Slide0.buttonContainer.getChildByName("remlayer").tintGray();
}
Slide0.buttonContainer.getChildByName("remlayer").on('click', function(e){
    if(net.layers.length>1){
      this.tintDefault();
      net.removeLayer();
      Slide0.updateDraw(net);
    } else this.tintGray();

    if(Slide0.isVis("addn2")){
        Slide0.setVis("addn2",false);
        Slide0.setVis("remn2",false);

    } else if(!Slide0.isVis("addn2") && Slide0.isVis("addn1")){
        Slide0.setVis("addn1",false);
        Slide0.setVis("remn1",false);

    }


});

//LAYER 0
Slide0.addButton("addn0",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM, true);
Slide0.buttonContainer.getChildByName("addn0").on('click', function(e){
    net.getLayer(0).addNeuron();
    Slide0.updateDraw(net);
});

Slide0.addButton("remn0",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM+20,true);
Slide0.buttonContainer.getChildByName("remn0").on('click', function(e){
    net.getLayer(0).removeNeuron();
    Slide0.updateDraw(net);
});


//LAYER 1
Slide0.addButton("addn1",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM,false);
Slide0.setVis("addn1",false);
Slide0.buttonContainer.getChildByName("addn1").on('click', function(e){
    net.getLayer(1).addNeuron();
    Slide0.updateDraw(net);
});

Slide0.addButton("remn1",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM +20,false);
Slide0.buttonContainer.getChildByName("remn1").visible == false;
Slide0.buttonContainer.getChildByName("remn1").on('click', function(e){
    net.getLayer(1).removeNeuron();
    Slide0.updateDraw(net);
});

//LAYER 2
Slide0.addButton("addn2",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM);
Slide0.buttonContainer.getChildByName("addn2").visible == false;
Slide0.buttonContainer.getChildByName("addn2").on('click', function(e){
    net.getLayer(2).addNeuron();
    Slide0.updateDraw(net);
});

Slide0.addButton("remn2",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM+20);
Slide0.buttonContainer.getChildByName("remn2").visible == false;
Slide0.buttonContainer.getChildByName("remn2").on('click', function(e){
    net.getLayer(2).removeNeuron();
    Slide0.updateDraw(net);
});