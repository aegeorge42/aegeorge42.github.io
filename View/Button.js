export class Button extends PIXI.Sprite{

    constructor(name,texture,x,y,vis,tint){
        super(texture)
        this.name=name;
        this.x=x;
        this.y=y;
        this.tint=tintNone;
        this.anchor.set(0.5);
        this.interactive=true;
        this.buttonMode=true;
        this.visible=vis;
        if(tint){
            this.tint=tint;
        } else this.tint=0xFFFFFF;
        //set tints for when button is hovered over
        //might make this variable in the future for 
        //different buttons?
        this.on('mouseover', function(e){
            this.tint=tintOver;
           // console.log(this.parent.app.renderer.plugins.interaction.mouse.global);

        })

        this.on('mouseout', function(e){
            if(tint){
            this.tint=tint;}
            else this.tint=0xFFFFFF;
        })

        this.on('mousedown', function(e){
            this.tint=tintDown;
        })

        this.on('mouseup', function(e){
            this.tint=tintOver;
        })
    }

    setTint(tint,event){
        if(event){
            this.on(event, function(e){
            this.tint=tint;
        })

        } else {

        this.tint=tint;
        this.on('mouseover', function(e){
            this.tint=tint;
        })

        this.on('mouseout', function(e){
            this.tint=tint;
        })

        this.on('mousedown', function(e){
            this.tint=tint;
        })

        this.on('mouseup', function(e){
            this.tint=tint;
        })
    }
    }

    tintGray(){
        this.setTint(tintGray);
    }

    tintDefault(){
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
export const tintOver = 0xFFE0A6;
export const tintDown = 0xFFA500;
const tintGray = 0x808080;