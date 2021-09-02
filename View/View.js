//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {SlideHome,
    SlideInstruct,
    SlideIntro1,
    SlideIntro1a,
    SlideIntro1b,
    SlideIntro1c,
    SlideIntro2,
    SlideIntro3,
    SlideIntro3a,
    SlideIntro4,
    SlideNeuronA,
    SlideNeuron1,
    SlideNeuron2,
    SlideNeuron2b,
    SlideNeuron2b2,
    SlideNeuron2c,
    SlideNeuron2d,
    SlideNeuron2d2,

    SlideNet1,
    SlideNet1b,
    SlideNet1c,
    SlideNet1d,
    SlideNet1e,
    SlideNet2,
    SlideNet3,
    SlideSandbox,
SlideGraphTest,
SlideNeuron2e} from "./allSlides.js"



export class View{
    slideList;
    currentSlide;

    constructor(){
        
        var vst=this;
        const app = new PIXI.Application({
          autoResize: true,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xe7e9ff
        });

        this.app=app;

        window.addEventListener('resize', resize); 

        this.w= window.innerWidth;    
        var w=window.innerWidth;    
        this.h=window.innerHeight;
        var h=window.innerHeight;
        this.bufferx=0;
        var buffery=0;
       // console.log(window.innerHeight)  
        function resize(){
            this.bufferx=(window.innerWidth-w)/6;
            buffery=(window.innerHeight-h)/4;            
            
            app.renderer.resize(window.innerWidth, window.innerHeight);

            if(vst.currentSlide!=0){
                app.stage.getChildAt(0).position.set(Math.max(this.bufferx,0),Math.max(buffery,-50));
                app.stage.getChildAt(0).getChildByName("header").x=Math.min(0,0-this.bufferx);
                app.stage.getChildAt(0).getChildByName("header").y=Math.min(50,0-buffery);

                app.stage.getChildAt(0).getChildByName("footer").x=Math.min(0,0-this.bufferx);
                app.stage.getChildAt(0).getChildByName("footer").y=(buffery*4)-buffery;

           
                app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
                app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

                app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100,
                app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);

            } else {
                app.stage.getChildAt(0).getChildByName("opener").x=window.innerWidth/2;
                app.stage.getChildAt(0).getChildByName("opener").y=((window.innerHeight)/3)+50;

                app.stage.getChildByName("button_start").x=window.innerWidth/2;
                app.stage.getChildByName("button_start").y=((window.innerHeight)/3) +350;
            }
        }

        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
        this.slideList.push(SlideHome,SlideInstruct, //1
                            SlideIntro1,SlideIntro1a,SlideIntro1b,SlideIntro1c,SlideIntro2,SlideIntro3, SlideIntro4,SlideIntro3a, //9
                            SlideNeuronA, SlideNeuron1,SlideNeuron2,SlideNeuron2b,SlideNeuron2b2,SlideNeuron2c,SlideNeuron2d,SlideNeuron2d2,SlideNeuron2e, //16
                            SlideNet1, SlideNet1b,SlideNet1c, SlideNet1d, SlideNet1e,SlideNet2, SlideNet3, SlideSandbox,SlideGraphTest);

        const opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
        opener.name="opener";
        opener.anchor.set(0.5);
        opener.x=((window.innerWidth)/2);
        opener.y=((window.innerHeight)/3)+50;
        this.slideList[0].slideContainer.addChild(opener);



        this.currentSlide=21;



        this.drawSlide_init();
        this.createButtons();
        this.app.stage.addChild(this.slideList[this.currentSlide].textbuttonContainer);
        this.caveats();
    }

    // when window is resized, gotta resize all the other slides
    resize(){
        var bufferx2=(window.innerWidth-this.w)/6;
        var buffery2=(window.innerHeight-this.h)/4;            
            
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        if(this.currentSlide!=0){
            this.app.stage.getChildAt(0).position.set(Math.max(bufferx2,0),Math.max(buffery2,-50));

            this.app.stage.getChildAt(0).getChildByName("header").x=Math.min(0,0-bufferx2);
            this.app.stage.getChildAt(0).getChildByName("header").y=Math.min(50,0-buffery2);

            this.app.stage.getChildAt(0).getChildByName("footer").x=Math.min(0,0-bufferx2);
            this.app.stage.getChildAt(0).getChildByName("footer").y=(buffery2*4)-buffery2;

            this.app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
            this.app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

            this.app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100,
            this.app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);
            
            //e.data.global.x=e.data.global.x+100;

            } else {
                this.app.stage.getChildAt(0).getChildByName("opener").x=window.innerWidth/2;
                this.app.stage.getChildAt(0).getChildByName("opener").y=((window.innerHeight)/3)+50;

                this.app.stage.getChildByName("button_start").x=window.innerWidth/2;
                this.app.stage.getChildByName("button_start").y=((window.innerHeight)/3) +350;
            }
    }

    // handle 1st and last slide diff formats
    caveats(){
        if (this.currentSlide==0){
            for(var i = 1; i<this.app.stage.children.length-1; i++){
                this.app.stage.getChildAt(i).visible=false;
            }      

            this.app.stage.getChildAt(0).getChildByName("footer").visible=false;
            this.app.stage.getChildAt(0).getChildByName("header").visible=false;
            this.app.stage.getChildByName("button_start").visible=true;

        } else {
            for(var i = 1; i<this.app.stage.children.length-1; i++){
                this.app.stage.getChildAt(i).visible=true;
            }

            this.app.stage.getChildAt(0).getChildByName("footer").visible=true;
            this.app.stage.getChildAt(0).getChildByName("header").visible=true;
            this.app.stage.getChildByName("button_start").visible=false;
        }
    }


    setVis(idx,bool){
        if(bool==false){this.app.stage.getChildAt(idx).visible=false;}
        else if(bool==true){this.app.stage.getChildAt(idx).visible=true;}
    }

    drawSlide_init(){
        
        this.app.stage.addChild(this.slideList[this.currentSlide].slideContainer);

    }

    drawSlide_init_test(){
        this.app.stage.addChild(this.slideList[this.currentSlide].slideContainer);
    };

    drawSlide(){
        this.app.stage.removeChildAt(0);
        this.app.stage.addChildAt(this.slideList[this.currentSlide].slideContainer,0);
        this.app.stage.addChild(this.slideList[this.currentSlide].textbuttonContainer);
        this.caveats();
        this.resize();
    }

    createButtons(){
        var vst=this;

        var startx=window.innerWidth/2;
        var starty=((window.innerHeight)/3) +350;

        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/back.png'),layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_start = new Button("button_start",PIXI.Texture.from('images/buttons/start.png'),startx,starty,true,0xFFFFFF);
        this.app.stage.addChild(button_nextslide,button_prevslide,button_start);

        this.app.stage.getChildByName("button_start").on('click', function(e){ 
            vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

            if(vst.currentSlide+1<vst.slideList.length){

                vst.currentSlide=vst.currentSlide+1;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("button_nextslide").on('click', function(e){ 
            vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

            if(vst.currentSlide+1<vst.slideList.length){
                vst.currentSlide=vst.currentSlide+1;
                vst.drawSlide();
            }

            if(vst.slideList[vst.currentSlide].slideNet !== undefined && vst.slideList[vst.currentSlide].largenet==1){//&& vst.currentSlide == 9){
                console.log(vst.slideList[vst.currentSlide].slideNet)
                vst.slideList[vst.currentSlide].slideNet.update();
                vst.slideList[vst.currentSlide].draw_update_large(vst.slideList[vst.currentSlide].slideNet)
                vst.drawSlide();
            }

            if(vst.slideList[vst.currentSlide].slideNet !== undefined && vst.slideList[vst.currentSlide].largenet!=1){//&& vst.currentSlide == 9){
                console.log(vst.slideList[vst.currentSlide].slideNet)
                vst.slideList[vst.currentSlide].slideNet.update();
                vst.slideList[vst.currentSlide].draw_update(vst.slideList[vst.currentSlide].slideNet)
                vst.drawSlide();
            }
            
        });

        this.app.stage.getChildByName("button_prevslide").on('click', function(e){ 
            vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

            if(vst.currentSlide>0){

                vst.currentSlide=vst.currentSlide-1;
                vst.drawSlide();
            }
        });

        //GO TO BUTTONS
        var homebutton = new Button("homebutton",PIXI.Texture.from('images/home.png'),30,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(homebutton);
        this.app.stage.getChildByName("homebutton").on('click', function(e){ 
            vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

                vst.currentSlide=0;
                vst.drawSlide();
                
        });

        var gotointro = new Button("gotointro",PIXI.Texture.from('images/buttons/gotointro.png'),250,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotointro);
        this.app.stage.getChildByName("gotointro").on('click', function(e){ 
            
            if (vst.currentSlide!=2){
                vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

                vst.currentSlide=2;
                vst.drawSlide();
            }
        });

        var gotoneuron = new Button("gotoneuron",PIXI.Texture.from('images/buttons/gotoneuron.png'),375,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotoneuron);
        this.app.stage.getChildByName("gotoneuron").on('click', function(e){ 
            
            if (vst.currentSlide!=10){
                vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

                vst.currentSlide=10;
                vst.drawSlide();
            }
        });
        


    }
}
