//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {Slide} from "./Slide.js"
import {Slide0} from "./Slides/Slide0.js"
import {Slide1} from "./Slides/Slide1.js"

export class ViewSlideTest{
    slideList;
    currentSlide;

    constructor(){
        this.app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xFFBDD4
        });
        document.body.appendChild(this.app.view);
       
        //add premade slides
        this.slideList = [];
        this.slideList.push(Slide0,Slide1);
        this.currentSlide=0;

        //next, prev slide buttons never move
        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/button_nextslide.png'),80,40)
            this.app.stage.addChild(button_nextslide);
            console.log("children " +this.app.stage.children.length);
            var vst = this;
            
            this.app.stage.getChildByName("button_nextslide").on('click', function(e){ 
                if(vst.currentSlide+1<vst.slideList.length){
                    vst.currentSlide=vst.currentSlide+1;
                    vst.draw();
                    console.log("slds" +vst.slideList.length);
                    console.log("current: " +vst.currentSlide);
                } else console.log("FINAL SLIDE");
            })

        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/button_prevslide.png'),80,80)
            this.app.stage.addChild(button_prevslide);
            console.log("children " +this.app.stage.children.length);
            var vst = this;
            
            this.app.stage.getChildByName("button_prevslide").on('click', function(e){ 
                if(vst.currentSlide>0){
                vst.currentSlide=vst.currentSlide-1;
                vst.draw();
                } else console.log("1st SLIDE");
            })

        this.draw();
    }

    //remove slide, leave buttons
    //I know it's ugly but it works
    draw(){
        try{
            this.app.stage.removeChildAt(2);
        } catch {}
   
        this.app.stage.addChild(this.slideList[this.currentSlide].slideContainer);
    }
}