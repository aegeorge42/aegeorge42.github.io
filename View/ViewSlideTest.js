//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {SlideTest0} from "./Slides/SlideTest0.js"
import {SlideTestX} from "./Slides/SlideTestX.js"


import {Slide0} from "./Slides/Slide0.js"
import {Slide1} from "./Slides/Slide1.js"
import {Slide2} from "./Slides/Slide2.js"
import {SlideX} from "./Slides/SlideX.js"



export class ViewSlideTest{
    slideList;
    currentSlide;

    constructor(){
        
        const app = new PIXI.Application({
          autoResize: true,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xdee0ff
        });

        this.app=app;

        

        //resize canvas when window is resized
        window.addEventListener('resize', resize);     
        function resize(){
            app.renderer.resize(window.innerWidth, window.innerHeight);
            header.width=window.innerWidth;
        }
        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
//        this.slideList.push(Slide0,Slide1,Slide2,SlideX);
        this.slideList.push(SlideTest0,SlideTestX);

        this.currentSlide=0;

        this.drawSlide();

        //header bar
        const header=new PIXI.Graphics();
        header.name="header";
        header.beginFill(0x7278d6);
        header.drawRect(0,0,window.innerWidth,50);
        header.endFill();

        //console.log(f)
        this.app.stage.addChild(header);

        this.createButtons();
        this.caveats();
    }

    setVis(idx,bool){
        if(bool==false){this.app.stage.getChildAt(idx).visible=false;}
        else if(bool==true){this.app.stage.getChildAt(idx).visible=true;}
    }

    drawSlide(){

        //remove slide, leave buttons
        //I know it's ugly but it works
        try{
            this.app.stage.removeChildAt(0);
        } catch {}
   
        //add next slide to screen
        this.app.stage.addChildAt(this.slideList[this.currentSlide].slideContainer,0);
    }

    createButtons(){

        var vst = this;

        // NEXT SLIDE
        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/button_nextslide.png'),80,40,false)
        this.app.stage.addChild(button_nextslide);
            
            this.app.stage.getChildByName("button_nextslide").on('click', function(e){ 
                if(vst.currentSlide+1<vst.slideList.length){
                    vst.currentSlide=vst.currentSlide+1;
                    vst.drawSlide();
                    vst.caveats();

                    // gotta update net at switch over, if slide has a net
                    if (vst.slideList[vst.currentSlide].slideNet !== undefined){
                        //vst.slideList[vst.currentSlide].updateDraw(vst.slideList[vst.currentSlide].slideNet);
                    }
                }
            })

        //PREVIOUS SLIDE
        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/button_prevslide.png'),80,80,true)
        this.app.stage.addChild(button_prevslide);

        this.app.stage.getChildByName("button_prevslide").on('click', function(e){ 
            if(vst.currentSlide>0){
            vst.currentSlide=vst.currentSlide-1;
            vst.drawSlide();
            vst.caveats();

            if (vst.slideList[vst.currentSlide].slideNet !== undefined){
                vst.slideList[vst.currentSlide].updateDraw(vst.slideList[vst.currentSlide].slideNet);
            }
            }
        })

        // GO TO 0 (LAUNCH PAGE)
        var goto0 = new Button("goto0",PIXI.Texture.from('images/neuron.png'),250,50,true)
        this.app.stage.addChild(goto0);
        this.app.stage.getChildByName("goto0").on('click', function(e){ 
            if (vst.currentSlide!=0){
                vst.currentSlide=0;
                vst.drawSlide();
                vst.caveats();
            }
        });

        // GO TO 1 (LAUNCH PAGE)
        var goto1 = new Button("goto1",PIXI.Texture.from('images/neuron.png'),350,50,true)
        this.app.stage.addChild(goto1);
        this.app.stage.getChildByName("goto1").on('click', function(e){ 
            if (vst.currentSlide!=1){
                vst.currentSlide=1;
                vst.drawSlide();
                vst.caveats();
            }
        });
    }

    //sometimes buttons and stuff have different behaviors than typical
    //here's where they get checked
    caveats(){

        if(this.currentSlide==0){
            for(var i = 1; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=false;
                this.app.stage.getChildByName("button_nextslide").visible=true;
                this.app.stage.getChildByName("button_nextslide").texture=PIXI.Texture.from('images/buttons/start.png');
                this.app.stage.getChildByName("button_nextslide").x=window.innerWidth/2;
                this.app.stage.getChildByName("button_nextslide").y=window.innerHeight*(3/4);

            }
        } else {
            for(var i = 1; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=true;
                this.app.stage.getChildByName("button_nextslide").visible=false;
                this.app.stage.getChildByName("button_nextslide").texture=PIXI.Texture.from('images/buttons/button_nextslide.png');
                this.app.stage.getChildByName("button_nextslide").x=80;
                this.app.stage.getChildByName("button_nextslide").y=40;
            }
        }
    }
}
