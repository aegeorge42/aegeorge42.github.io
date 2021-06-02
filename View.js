//Aliases
let Application = PIXI.Application;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;
let texture = PIXI.Texture;

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

let app = new PIXI.Application({ 
  width: 800,         // default: 800
  height: 600,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
  }
);
document.body.appendChild(app.view);

//resize to fullscreen
app.renderer.backgroundColor = 0xF3F3F3;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

loader
  .add("images/cat.png")
  .add("images/button.png")
  .load(setup);

//runs on load
function setup() {
  //TODO: stuff to do before running
  //loading bar?
  //some sort of launch screen
  run();
}

function run(){
  addCat();
  setButton();
}

function addCat(){
  let cat = new Sprite(resources["images/cat.png"].texture);

  cat.anchor.set(0.5);
  cat.x = winWidth/2;
  cat.y = winHeight/2;
  app.stage.addChild(cat);

  //note 2 self - use this when weights are changing in backprop
  cat.scale.set(0.5, 0.5);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (winWidth*2));
}

function addRandomCat(x,y){
  let cat = new Sprite(resources["images/cat.png"].texture);

  cat.anchor.set(0.5);
  cat.x = x;
  cat.y = y;
  app.stage.addChild(cat);

  //note 2 self - use this when weights are changing in backprop
  cat.scale.set(0.5, 0.5);
}

const textureButton = PIXI.Texture.from('images/button.png');
const textureButtonDown = PIXI.Texture.from('images/button_down.png');
const textureButtonOver = PIXI.Texture.from('images/button_over.png');

function setButton(){
  let button = new Sprite(resources["images/button.png"].texture);
  button.x=800;
  button.y=100;
  app.stage.addChild(button);

  button.interactive = true;
  button.buttonMode = true;

  button
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);
  } 

  var randpos = randomInt(0, winWidth);

  function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;

    addRandomCat(Math.floor(Math.random() * (winHeight*2)),Math.floor(Math.random() * (winHeight*2)));
  }
  
  function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver;
    } else {
        this.texture = textureButton;
    }
  }
  
  function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.texture = textureButtonOver;
  }
  
  function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
  this.texture = textureButton;
}
