import {Slide} from "../Slide.js"

export const SlideTest0 = new Slide();

var opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
    opener.anchor.set(0.5);
    opener.x=(window.innerWidth)/2;
    opener.y=(window.innerHeight)/3;
SlideTest0.slideContainer.addChild(opener);        

window.addEventListener('resize', resize);     

function resize(){
    opener.x=(window.innerWidth)/2;
    opener.y=(window.innerHeight)/3;
}
