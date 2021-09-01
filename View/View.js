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
    SlideNeuron1,
    SlideNeuron2,
    SlideNeuron2b,
    SlideNeuron2b2,
    SlideNeuron2c,
    SlideNeuron2d,
    SlideNet1,
    SlideNet1b,
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
        var h=window.innerHeight;
        var buffer=0;
       // console.log(window.innerHeight)  
        function resize(){
            buffer=(window.innerWidth-w)/2;
            console.log(buffer)
            app.stage.getChildAt(0).position.set(buffer,0);
            app.stage.getChildAt(0).getChildByName("header").x=0-buffer;
            app.stage.getChildAt(0).getChildByName("footer").x=0-buffer;

            app.renderer.resize(window.innerWidth, window.innerHeight);
        
            app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
            app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100,
            app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);

            if(vst.currentSlide==0){
                app.stage.getChildByName("button_start").x=window.innerWidth/2;
            }
        }

        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
        this.slideList.push(SlideHome,SlideInstruct, //1
                            SlideIntro1,SlideIntro1a,SlideIntro1b,SlideIntro1c,SlideIntro2,SlideIntro3, SlideIntro4,SlideIntro3a, //9
                            SlideNeuron1,SlideNeuron2,SlideNeuron2b,SlideNeuron2b2,SlideNeuron2c,SlideNeuron2d,SlideNeuron2e, //16
                            SlideNet1, SlideNet1b,SlideNet2, SlideNet3, SlideSandbox,SlideGraphTest);

        const opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
        opener.name="opener";
        opener.anchor.set(0.5);
        opener.x=((window.innerWidth)/2);
        opener.y=((window.innerHeight)/3)+50;
        this.slideList[0].slideContainer.addChild(opener);



        this.currentSlide=1;



        this.drawSlide_init();
        this.createButtons();
        this.app.stage.addChild(this.slideList[this.currentSlide].textbuttonContainer);
        this.caveats();
    }

    resize(){
        console.log(window.innerWidth);                

       var buffer2=(window.innerWidth-this.w)/2;
           // app.stage.getChildAt(0).position.set(Math.max(buffer2,0),0);
     //   } else {
           this.app.stage.getChildAt(0).position.set(buffer2,0);
           this.app.stage.getChildAt(0).getChildByName("header").x=0-buffer2;
           this.app.stage.getChildAt(0).getChildByName("footer").x=0-buffer2;

       // }*/
    }

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

        var gotodata = new Button("gotodata",PIXI.Texture.from('images/buttons/gotodata.png'),350,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotodata);
        this.app.stage.getChildByName("gotodata").on('click', function(e){ 
            
            if (vst.currentSlide!=6){
                vst.app.stage.removeChild(vst.slideList[vst.currentSlide].textbuttonContainer);

                vst.currentSlide=6;
                vst.drawSlide();
            }
        });
        


    }
}
