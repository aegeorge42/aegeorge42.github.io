//import {Button} from "./Button.js"
import {layout} from "../View/Slide.js"
import {Button} from "../View/Button.js"

export const layerbuttons = [];
layerbuttons[0] = new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,layout.UPPERLIM +50,true);
layerbuttons[1] = new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,layout.UPPERLIM +120,true);

var maxLayers = 10;

export const neuronbuttons_add = [];
for (var i =0; i<maxLayers; i++){
    neuronbuttons_add[i] = new Button("addneuron",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + (layout.WEIGHTS_WIDTH*(i+1)), layout.UPPERLIM, false);
}

export const neuronbuttons_rem = [];
for (var i =0; i<maxLayers; i++){
    neuronbuttons_rem[i] = new Button("remneuron",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + (layout.WEIGHTS_WIDTH*(i+1)), layout.UPPERLIM+20, false);
}

export function setButtonFunctions(slide,net){

    //list all functions
    layerbuttons[0].on('click', function(e){
        if(net.layers.length<maxLayers){
            net.addLayer();
            slide.updateDraw(net);
        }
    });

    

}