export class Button extends PIXI.Sprite{
    constructor(texture,x,y){
        super(texture)

        this.x=x;
        this.y=y;
        this.interactive=true;
        this.buttonMode=true;

    }
}

