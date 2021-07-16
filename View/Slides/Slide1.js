import { Net } from "../../Model/net.js";
import {layerbuttons,neuronbuttons_add,neuronbuttons_rem,setButtonFunctions} from "../../View/Buttons.js"

import {Slide, layout} from "../Slide.js"

import {net} from "./Slide0.js"

export const Slide1 = new Slide();
//export const net = new Net();


Slide1.drawBig(net);

//add buttons
/*
Slide1.addButton("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,layout.UPPERLIM +50,true);
Slide1.addButton("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,layout.UPPERLIM +100 +20,true);
Slide1.addButton("addn0",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM, false);
Slide1.addButton("remn0",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM+20,false);
Slide1.addButton("addn1",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM,false);
Slide1.addButton("remn1",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM +20,false);
Slide1.addButton("addn2",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM);
Slide1.addButton("remn2",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM+20);
*/
Slide1.buttonLayerContainer.addChild(layerbuttons[0]);
Slide1.buttonLayerContainer.addChild(layerbuttons[1]);

setButtonFunctions(Slide1,net);