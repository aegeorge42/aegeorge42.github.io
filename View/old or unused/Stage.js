// Main file for setup for PIXI

class Stage{

    //Aliases
    Application = PIXI.Application;
    loader = PIXI.loader;
    resources = PIXI.loader.resources;
    Sprite = PIXI.Sprite;
    texture = PIXI.Texture;

    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    constructor(){
        console.log("stage constructor");
        this.app= new PIXI.Application({
            width: 800,         // default: 800
            height: 600,        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1
        });
        document.body.appendChild(this.app.view);

        this.app.renderer.backgroundColor = 0xBDBEFF;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        
        this.loader
        .add("images/cat.png")
        .add("images/button.png")
        .load(this.setup);
    }

    setup(){
      //  alert("setup but this time in stage :)");
    }
    
    button
}
export {Stage}