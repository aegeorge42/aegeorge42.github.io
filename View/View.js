//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {SlideHome,
    SlideInstruct,
    SlideIntro1,
    SlideIntro2,
    SlideIntro3,
    SlideIntro3a,
    SlideIntro4,
    SlideNeuron1,
    SlideNeuron2,
    SlideNeuron2b,
    SlideNeuron2c,
    SlideNeuron2d,
    SlideNet1,
    SlideSandbox,
SlideGraphTest} from "./allSlides.js"



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

        //console.log(window.innerWidth,layout.INNERHEIGHT);
        //console.log((window.innerWidth)/(layout.INNERHEIGHT)/2.269503546099291)
        //resize canvas when window is resized
        window.addEventListener('resize', resize); 
        var w=window.innerWidth;    
        var h=window.innerHeight;  
        console.log(window.innerHeight)  
        //app.stage.getChildAt(0).getChildAt(4).pivot.set(window.innerWidth/2,window.innerHeight/2);


        function resize(){
           // app.stage.getChildAt(0).getChildAt(4).x=0//window.innerWidth/2//-w;
           // app.stage.getChildAt(0).getChildAt(4).y=0//window.innerHeight/2//-h;
            var resize_w = window.innerWidth/w;
            var resize_h = window.innerHeight/h;
            var resizef=Math.min(resize_h,resize_w);
            //console.log(app.stage.getChildAt(0).get);
            

            app.stage.getChildAt(0).getChildAt(0).position.set(Math.max(window.innerWidth-w,-50),Math.max(window.innerHeight-h,-50));
            app.stage.getChildAt(0).getChildAt(1).position.set(Math.max(window.innerWidth-w,-50),Math.max(window.innerHeight-h,-50));
            app.stage.getChildAt(0).getChildAt(2).position.set(Math.max(window.innerWidth-w,-50),Math.max(window.innerHeight-h,-50));
            app.stage.getChildAt(0).getChildAt(3).position.set(Math.max(window.innerWidth-w,-50),Math.max(window.innerHeight-h,-50));
            app.stage.getChildAt(0).getChildAt(4).position.set(Math.max(window.innerWidth-w,-50),Math.max(window.innerHeight-h,-50));



            //app.stage.getChildAt(0).getChildAt(4).position.set(0,0);

           // app.stage.getChildAt(0).getChildAt(4).pivot.set(app.stage.getChildAt(0).getChildAt(4).width,app.stage.getChildAt(0).getChildAt(4).height);
            

           // app.stage.getChildAt(0).getChildAt(4).scale.set(resizef);
            //app.stage.getChildAt(0).getChildAt(4).pivot.set(w,h);



            app.renderer.resize(window.innerWidth, window.innerHeight);
        
            app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
            app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100,
            app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);

            if(vst.currentSlide==0){

                app.stage.getChildAt(0).getChildByName("opener").x=((window.innerWidth)/2);
                app.stage.getChildAt(0).getChildByName("opener").y=((window.innerHeight)/3)+50;

                app.stage.getChildByName("button_start").x=window.innerWidth/2;
                app.stage.getChildByName("button_start").y=((window.innerHeight)/3) +350;
            }
        }

        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
        this.slideList.push(SlideHome,SlideInstruct,SlideIntro1,SlideIntro2,SlideIntro3,
                            SlideIntro4,SlideIntro3a,SlideNeuron1,SlideNeuron2,SlideNeuron2b,SlideNeuron2c,SlideNeuron2d,
                            SlideNet1,SlideSandbox,SlideGraphTest);

        const opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
        opener.name="opener";
        opener.anchor.set(0.5);
        opener.x=((window.innerWidth)/2);
        opener.y=((window.innerHeight)/3)+50;
        this.slideList[0].slideContainer.addChild(opener);



        this.currentSlide=9;



        this.drawSlide_init();
        this.createButtons();
        this.app.stage.addChild(this.slideList[this.currentSlide].textbuttonContainer);
        this.caveats();
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
        


    }
}
