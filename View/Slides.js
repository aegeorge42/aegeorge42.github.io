import {Slide} from "./Slide.js"


export const SlideHome = new Slide();
    var opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
        opener.anchor.set(0.5);
        opener.x=(window.innerWidth)/2;
        opener.y=(window.innerHeight)/3;
    SlideHome.slideContainer.addChild(opener);        

    window.addEventListener('resize', resize);     

    function resize(){
        opener.x=(window.innerWidth)/2;
        opener.y=(window.innerHeight)/3;
    }

export const SlideInstruct = new Slide();
var text = [    ["This is the tool that I needed when I was learning about neural networks", 50, 50],
                [".", 100, 100],
                [".", 200,200]       
            ];

SlideInstruct.drawText(text);
SlideInstruct.drawTextButtons();

export const SlideIntro = new Slide();
var text = [    ["instructions", 50, 50],
                [".", 100, 100],
                [".", 200,200]       ];

SlideIntro.drawText(text);
SlideIntro.drawTextButtons();

export const SlideData1 = new Slide();

export const SlideData2 = new Slide();
export const SlideData3 = new Slide();
