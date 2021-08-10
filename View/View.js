//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {SlideTest0} from "./Slides/SlideTest0.js"
import {SlideTest1} from "./Slides/SlideTest1.js"
import {SlideTest2} from "./Slides/SlideTest2.js"
import {SlideTest3} from "./Slides/SlideTest3.js"
import {SlideTest4} from "./Slides/SlideTest4.js"



import {layout} from "./layout.js"

import {SlideTestX} from "./Slides/SlideTestX.js"

/*
import {Slide0} from "./Slides/Slide0.js"
import {Slide1} from "./Slides/Slide1.js"
import {Slide2} from "./Slides/Slide2.js"
import {SlideX} from "./Slides/SlideX.js"

*/

export class View{
    slideList;
    currentSlide;

    constructor(){
        
        var vst=this;
        const app = new PIXI.Application({
          autoResize: true,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xdee0ff
        });

        this.app=app;

        //resize canvas when window is resized
        window.addEventListener('resize', resize); 
        var h=window.innerHeight;    
        function resize(){
            app.renderer.resize(window.innerWidth, window.innerHeight);
            header.width=window.innerWidth;
            footer.width=window.innerWidth;
            footer.y=window.innerHeight-h;

            app.stage.getChildByName("button_nextslide").x=window.innerWidth-100;
            app.stage.getChildByName("button_nextslide").y=window.innerHeight-25;

            app.stage.getChildByName("button_prevslide").x=100;
            app.stage.getChildByName("button_prevslide").y=window.innerHeight-25;

            app.stage.getChildByName("button_start").x=window.innerWidth/2;
            app.stage.getChildByName("button_start").y=window.innerHeight*(3/4);
        }
        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
//        this.slideList.push(Slide0,Slide1,Slide2,SlideX);
        this.slideList.push(SlideTest0,SlideTest1,SlideTest2,SlideTest4,SlideTest3,SlideTestX);

        this.currentSlide=2;

        //this.drawSlide();

        //header bar
        const header=new PIXI.Graphics();
        header.name="header";
        header.beginFill(0xbfbfbf);
        header.drawRect(0,0,window.innerWidth,layout.HEADER_HEIGHT);
        header.endFill();

        const footer=new PIXI.Graphics();
        footer.name="footer";
        footer.beginFill(0xbfbfbf);
        //footer.drawRect(0,window.innerHeight-80,window.innerWidth,80);
        footer.drawRect(0,window.innerHeight,window.innerWidth,-layout.FOOTER_HEIGHT);

        console.log(footer.x +" "+ footer.y +" "+ footer.width +" "+ footer.height);
        footer.endFill();

        //console.log(f)
        this.app.stage.addChild(header);
        this.app.stage.addChild(footer);


        this.createButtons();
        this.drawSlide_init();

        this.caveats();
    }

    setVis(idx,bool){
        if(bool==false){this.app.stage.getChildAt(idx).visible=false;}
        else if(bool==true){this.app.stage.getChildAt(idx).visible=true;}
    }

    drawSlide_init(){
        this.app.stage.addChild(this.slideList[this.currentSlide].slideContainer);
    }

    drawSlide(){
        this.app.stage.removeChildAt(this.app.stage.children.length-1);
        this.app.stage.addChild(this.slideList[this.currentSlide].slideContainer);


    }

    createButtons(){

        var vst = this;

        //START
        var startx = window.innerWidth/2;
        var starty = window.innerHeight*(3/4);
        var button_start = new Button("button_start",PIXI.Texture.from('images/buttons/start.png'),startx,starty,true);
        this.app.stage.addChild(button_start);
            
            this.app.stage.getChildByName("button_start").on('click', function(e){ 
                if(vst.currentSlide+1<vst.slideList.length){
                    vst.currentSlide=vst.currentSlide+1;
                    vst.drawSlide();
                    vst.caveats();

                    // gotta update net at switch over, if slide has a net
                  //  if (vst.slideList[vst.currentSlide].slideNet !== undefined){
                        //vst.slideList[vst.currentSlide].updateDraw(vst.slideList[vst.currentSlide].slideNet);
                 //   }
                }
            });

        // NEXT SLIDE
        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/button_nextslide.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true)
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
        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/button_prevslide.png'),layout.PREVSLIDE_X,layout.PREVSLIDE_Y,true)
        this.app.stage.addChild(button_prevslide);

        this.app.stage.getChildByName("button_prevslide").on('click', function(e){ 
            if(vst.currentSlide>0){
                vst.currentSlide=vst.currentSlide-1;
                vst.drawSlide();
                vst.caveats();

                if (vst.slideList[vst.currentSlide].slideNet !== undefined){
                   // vst.slideList[vst.currentSlide].updateDraw(vst.slideList[vst.currentSlide].slideNet);
                }
            }
        })

        
        // GO TO 0 (LAUNCH PAGE)
        var goto0 = new Button("goto0",PIXI.Texture.from('images/buttons/gotointro.png'),250,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(goto0);
        this.app.stage.getChildByName("goto0").on('click', function(e){ 
            if (vst.currentSlide!=0){
                vst.currentSlide=0;
                vst.drawSlide();
                vst.caveats();
            }
        });

        // GO TO 1 (LAUNCH PAGE)
        var goto1 = new Button("goto1",PIXI.Texture.from('images/buttons/gotodata.png'),400,layout.HEADER_HEIGHT/2,false)
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
            for(var i = 0; i<this.app.stage.children.length-1; i++){
                this.app.stage.getChildAt(i).visible=false;
                this.app.stage.getChildByName("button_start").visible=true;
            }
        
        } else {
            for(var i = 0; i<this.app.stage.children.length-1; i++){
                this.app.stage.getChildAt(i).visible=true;
                this.app.stage.getChildByName("button_start").visible=false;
            }
        }
        
    }
    
}
