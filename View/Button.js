export class Button extends PIXI.Sprite{

    constructor(name,texture,x,y){
        super(texture)
        this.name=name;
        this.x=x;
        this.y=y;
        this.tint=tintNone;
        this.anchor.set(0.5);
        this.interactive=true;
        this.buttonMode=true;

        //set tints for when button is hovered over
        //might make this variable in the future for 
        //different buttons?
        this.on('mouseover', function(e){
            this.tint=tintOver;
        })

        this.on('mouseout', function(e){
            this.tint=tintNone;
        })

        this.on('mousedown', function(e){
            this.tint=tintDown;
        })

        this.on('mouseup', function(e){
            this.tint=tintOver;
        })
    }
}

const tintNone = 0xFFFFFF;
const tintOver = 0xFFA500;
const tintDown = 0x00FF00;
