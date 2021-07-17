import {Slide, layout} from "../Slide.js"
import { Net } from "../../Model/net.js";
import {actFns} from "../../Model/actfns.js"
import {Button} from "../../View/Button.js"
//import {layerbuttons,neuronbuttons_add,neuronbuttons_rem,setButtonFunctions} from "../../View/Buttons.js"

export const Slide0 = new Slide();
var net = new Net();
Slide0.slideNet=net;

const testInput = {
    input: [5, 10],
    expected: [1, 2],
    expected_text: ["text1","text2"]
};

const maxLayers = 10;
const maxNeurons = 10;

net.setNetInput(testInput.input,testInput.expected,testInput.expected_text);
net.setNetActFn(actFns.SIGMOID);
net.setOutLayer();
Slide0.drawButtons(net);

var slidetext = new PIXI.Text("Slide 0");
slidetext.x=160;
slidetext.y=50;
Slide0.inputContainer.addChild(slidetext);

Slide0.saveNet=1;
/*net.getLayer(0).addNeuron();

net.update();
net.addLayer();
net.update();
net.addLayer();
*/
Slide0.updateDraw(net);
console.log("LAYER LENGTH:" + net.layers.length)
Slide0.net2save=net;
console.log("SLIDE 0 net:" + Slide0.net2save);

//Slide0.buttonLayerContainer.addChild(layerbuttons[0]);
//Slide0.buttonLayerContainer.addChild(layerbuttons[1]);

//setButtonFunctions(Slide0,net);


/** ADD ALL THE BUTTONS **/ 
// create all the buttons
//Slide0.addButtons(layerbuttons);
//Slide0.addButtons(neuronbuttons_add);
//Slide0.addButtons(neuronbuttons_rem);

/*
var addlayer= new Button("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,layout.UPPERLIM +50,true);
Slide0.addButtontemp(addlayer);
var remlayer=new Button("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,layout.UPPERLIM +100 +20,true);
Slide0.addButtontemp(remlayer);
*/


//ADD LAYER
//Slide0.addButton("addlayer",PIXI.Texture.from('images/buttons/button_layer.png'), 80,layout.UPPERLIM +50,true);
//Slide0.addButton("remlayer",PIXI.Texture.from('images/buttons/button_removelayer.png'), 80,layout.UPPERLIM +100 +20,true);

//add/remove neurons


/*
//Slide0.addButton("addn0",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM, false);
Slide0.addButton("remn0",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH, layout.UPPERLIM+20,false);
Slide0.addButton("addn1",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM,false);
Slide0.addButton("remn1",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*2, layout.UPPERLIM +20,false);
Slide0.addButton("addn2",PIXI.Texture.from('images/buttons/button_addneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM);
Slide0.addButton("remn2",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM+20);
*/
/*
for (var i=0; i<Slide0.buttonContainer.children.length; i++){
    console.log("IDX" + i+"NAME:"+Slide0.buttonContainer.children[i].name);
}

console.log(Slide0.buttonContainer)
Slide0.buttonContainer.getChildByName("addlayer").on('click', function(e){
    if(net.layers.length<maxLayers){
        net.addLayer();
        Slide0.updateDraw(net);
    }
    for (var i=0; i<net.layers.length; i++){
        if(Slide0.buttonContainer.children[i*2] !==undefined){
            Slide0.buttonContainer.children[i*2].visible=true
        }
        if(Slide0.buttonContainer.children[(i*2)+1] !==undefined){
            Slide0.buttonContainer.children[(i*2)+1].visible=true
        }
    }
});

//TODO: GRAYING OUT ONLY KINDA WORKS
//REMOVE LAYER

if(net.layers.length<=1){
Slide0.buttonContainer.getChildByName("remlayer").tintGray();
}
Slide0.buttonContainer.getChildByName("remlayer").on('click', function(e){
    if(net.layers.length>1){
      this.tintDefault();
      net.removeLayer();
      Slide0.updateDraw(net);
    } else this.tintGray();

    Slide0.buttonContainer.children[(net.layers.length*2)].visible=false;
    Slide0.buttonContainer.children[(net.layers.length*2)+1].visible=false;

});

//LAYER 0
/*
Slide0.buttonContainer.getChildAt(2).on('click', function(e){
    net.getLayer(0).addNeuron();
    Slide0.updateDraw(net);
});

Slide0.buttonContainer.getChildByName("remn0").on('click', function(e){
    if(net.getLayer(0).neurons.length != 1){
        net.getLayer(0).removeNeuron();
        Slide0.updateDraw(net);
    }
});


//LAYER 1
    Slide0.buttonContainer.getChildByName("addn1").visible == false;

Slide0.buttonContainer.getChildByName("addn1").on('click', function(e){
    net.getLayer(1).addNeuron();
    Slide0.updateDraw(net);
    console.log()
});

Slide0.buttonContainer.getChildByName("remn1").visible == false;
Slide0.buttonContainer.getChildByName("remn1").on('click', function(e){
    if(net.getLayer(1).neurons.length != 1){
        net.getLayer(1).removeNeuron();
        Slide0.updateDraw(net);
    }
});

//LAYER 2
Slide0.buttonContainer.getChildByName("addn2").visible == false;
Slide0.buttonContainer.getChildByName("addn2").on('click', function(e){
    net.getLayer(2).addNeuron();
    Slide0.updateDraw(net);
});

Slide0.addButton("remn2",PIXI.Texture.from('images/buttons/button_removeneuron.png'),layout.LEFTLIM + layout.WEIGHTS_WIDTH*3, layout.UPPERLIM+20);
Slide0.buttonContainer.getChildByName("remn2").visible == false;
Slide0.buttonContainer.getChildByName("remn2").on('click', function(e){
    if(net.getLayer(2).neurons.length != 1){
        net.getLayer(2).removeNeuron();
        Slide0.updateDraw(net);
    }
});
*/
for (var i=0; i<net.layers.length; i++){
//    Slide0.buttonContainer.children[i+2].visible=true
 }


export const buttons2keep = Slide0.buttonContainer;
export {net};

Slide0.net2save=net;
