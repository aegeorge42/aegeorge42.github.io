import {Button} from "./Button.js"

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,      
  maximumFractionDigits: 2,
});

const textStyle = new PIXI.TextStyle({
  //fill: '#DD3366',
  fontFamily: 'Open Sans',
  fontWeight: 300,
  fontSize: 15
});

export class View{
  input2draw = [];
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
    //add layer
    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_layer.png'),100,100)
    );

    //add neuron
    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_neuron.png'),300,100)
    );

    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_neuron.png'),420,100)
    );

    this.buttonDrawList.push(
      new Button(PIXI.Texture.from('images/button_neuron.png'),540,100)
    );
  }

  //add a single button
  addButton(textureimg, x, y){
    var b = new Button(PIXI.Texture.from(textureimg),x,y)
    this.buttonDrawList.push(
      b
     // new Button(PIXI.Texture.from(textureimg),x,y)
    );
    this.app.stage.addChild(b);
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

  //check if this rounds
  formatList(list){
    var nums2print =[];
    for(var n=0; n<list.length; n++){
      nums2print.push(formatter.format(list[n]));
    }
    return nums2print;
  }

  //TODO this should be in a container
  drawInputs(inputs){
    for(var i = 0; i<inputs.length; i++){
      const inputSprite = new PIXI.Sprite(PIXI.Texture.from('images/input.png'));
      //inputSprite.scale.x=0.75;
      //inputSprite.scale.y=0.75;

      inputSprite.x=160;
      inputSprite.y=i*120 + 200;
      this.app.stage.addChild(inputSprite);

      const inputSpriteText = new PIXI.Text(inputs[i]);
    inputSpriteText.x=160 + 10;
    inputSpriteText.y=i*120 + 200 + 10;
    this.app.stage.addChild(inputSpriteText);
    }
  }

  drawNeurons(net){
    //clear old stuff
    //this.clearContainer(layers2draw);
    for(var i = 0; i<this.layers2draw.length; i++){
      this.clearContainer(this.layers2draw[i]);
    }
    
    // for each layer
    for(var i = 0; i<net.layers.length; i++){
      //for each neuron
      for(var j=0; j<net.getLayer(i).neurons.length; j++){
        //create a sprite
        console.log("layer: " + i + " neuron: " +j+ " weights " + net.getLayer(i).neurons[j].weights)
        const neuronSprite = new PIXI.Sprite(PIXI.Texture.from('images/neuron.png'));
          neuronSprite.x=(i*120)+250;
          neuronSprite.y=j*120+150;

        const text = new PIXI.Text(
          "i: " + this.formatList(net.getLayer(i).neurons[j].inputs) + '\n'
         + "w: " + this.formatList(net.getLayer(i).neurons[j].weights) + '\n'
         + "o: " + formatter.format(net.getLayer(i).neurons[j].output_nofn) + '\n'
         + formatter.format(net.getLayer(i).neurons[j].output),
          textStyle)
          text.x=(i*120)+250 + 20;
          text.y=j*120 + 150 + 20;
        
        console 
        //add it to appropriate layer container
        this.layers2draw[i].addChild(neuronSprite);
        this.layers2draw[i].addChild(text);

        //console.log("LAYER 2draw: " + i + " sprites: " + this.layers2draw[i].length)

      }
      this.app.stage.addChild(this.layers2draw[i]);
    }
  }

  drawVals(net){}


  clearContainer(container){
    for(var i = 0; i<container.length; i++){
      container.removeChild(container[i]);
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
  


  /*
  drawNet(net){
    // clear before readding
    //this.layers2draw = [];
    // create container for each layer

    this.clearContainer(net);
    for(var i = 0; i<net.layers.length; i++){
      const layerContainer = new PIXI.Container();
      this.layers2draw.push(layerContainer);
    }
    console.log("layers: " + net.layers.length);
    console.log("layers2draw: " + this.layers2draw.length);
  }
  */
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
  
