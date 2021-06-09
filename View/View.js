import {Button} from "./Button.js"

export class View{
  buttonDrawList = [];  // all buttons to draw
  neuronDrawList = [];  // all neurons to draw
  layers2draw = [];

  constructor(){
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x6c7f50
    });
    document.body.appendChild(this.app.view);

    // load all images (it would be cool if this worked)
    /*
    PIXI.loader
    .add([
      "images/cat.png",
      "images/button.png",
      "images/treasure.png",
      "images/circle.png",
      "images/button_down.png"
    ])
    .load(this.setup);
    */
  }

  setup(){
    console.log("ready 2 go")
  }

  //add initial buttons to screen
  addButtons(){
    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_layer.png'),100,100)
    );

    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_neuron.png'),100,200)
    );

    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/treasure.png'),100,300)
    );
  }

  //add a single button
  addButton(textureimg, x, y){
    this.buttonDrawList.push(
      new Button(PIXI.Texture.from(textureimg),x,y)
    );
  }

  
  drawButtons(){
    for(var i =0;i<this.buttonDrawList.length;i++){
      this.app.stage.addChild(this.buttonDrawList[i]);
    }
  }

  draw_layerSetup(net){
    this.layers2draw = [];
    for(var i = 0; i<net.layers.length; i++){
      const layerContainer = new PIXI.Container();
      this.layers2draw.push(layerContainer);
    }
    //console.log("layers: " + net.layers.length);
    //console.log("layers2draw: " + this.layers2draw.length);
  }

  //layer2draw[i].addchild
  drawNeurons(net){
    // for each layer
    for(var i = 0; i<net.layers.length; i++){
      //for each neuron
      for(var j=0; j<net.getLayer(i).neurons.length; j++){
        //create a sprite
        const neuronSprite = new PIXI.Sprite(PIXI.Texture.from('images/cat.png'));
          neuronSprite.x=(i*100)+150;
          neuronSprite.y=j*100;
        //add it to appropriate layer container
        this.layers2draw[i].addChild(neuronSprite);

        //console.log("LAYER 2draw: " + i + " sprites: " + this.layers2draw[i].length)

      }
      this.app.stage.addChild(this.layers2draw[i]);
    }
  }


  /* this.neuronDrawList=[];
  console.clear();
  for(var i = 0; i<net.layers.length; i++){
    for(var j=0; j<net.getLayer(i).neurons.length; j++){
      console.log("layer: " + i + " neuron: " + j);
      this.neuronDrawList[i]=new Array([net.getLayer]);




      // const neuronSprite = new PIXI.Sprite(PIXI.Texture.from('images/cat.png'));
      this.neuronDrawList[i][j]=new PIXI.Sprite(PIXI.Texture.from('images/cat.png'));
      //this.neuronDrawList[i].push(neuronSprite);
    }
  }


  /*
  for(var i =0; i<layer.getNeurons().length; i++){
    const neuronSprite = new PIXI.Sprite(PIXI.Texture.from('images/cat.png'));
    console.log("sprite");
    
    //this.layers2draw[layer.layerNumber].addChild(neuronSprite);
  }
  //console.log(this.layers2draw[layer.layerNumber].length);
  */
  



  drawNet(net){
    // clear before readding
    this.layers2draw = [];
    // create container for each layer
    for(var i = 0; i<net.layers.length; i++){
      const layerContainer = new PIXI.Container();
      this.layers2draw.push(layerContainer);
    }
    console.log("layers: " + net.layers.length);
    console.log("layers2draw: " + this.layers2draw.length);
  }
}



    /*
    net.layers.forEach(function(layer) {
      const layerContainer = new PIXI.Container();
      //console.log("----------LAYER " + layer.layerNumber + "----------");
      layer.neurons.forEach(function(neuron) {
          //console.log("w: " +neuron.weights);
      });
  });

  thisapp.stage.addChild(layerContainer);

  */
  


    /*
    for(var i =0; i<layer.getNeurons().length; i++){
      this.neuronDrawList.push(
        new PIXI.Sprite(PIXI.Texture.from('images/cat.png'),{x: i*100, y:i*100})
      )
    }
    console.log("ndl:" + this.neuronDrawList.length);

    for(var i =0; i<this.neuronDrawList.length; i++){
      this.app.stage.addChild(this.neuronDrawList[i]);
      console.log("neuron" + i + this.neuronDrawList[i].x);

    }
    */


    /*
    //create sprite and add to draw list
    for(var i =0; i<layer.getNeurons().length; i++){
      //this.neuronDrawList.push(
      //  new Sprite(PIXI.Texture.from('images/cat.png'),{x: i*100, y:i*100})
      //)
    }

    //add draw list to stage
    for(var i =0; i<layer.getNeurons().length; i++){
      this.app.stage.addChild(this.neuronDrawList[i]);
    }
    */
  
