//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {SlideHome,
    SlideInstruct1,
    SlideInstruct2,
    SlideIntro1,
    SlideIntro1b,
    SlideIntro2,
    SlideIntro3,
    SlideIntro3a,
    SlideIntro4a,
    SlideNeuronA,
    SlideNeuronA2,
    SlideNeuron1b,
    SlideNeuron2,
    SlideNeuron2b,
    SlideNeuron2c,
    SlideNeuron2d,
    SlideNeuron2d2,
    SlideNeuron2e,
    SlideNet1,
    SlideNet1b,
    SlideNet1b2,
    SlideNet1c,
    SlideNet1d,
    SlideNet1d2,
    SlideError1,
    SlideError3,
    SlideError4,
    SlideError5,
    SlideError6,
    SlideError6a,
    SlideError6b,
    SlideError7,
    SlideNet1e,
    SlideBackCalc0,
    SlideBackCalc1,
    SlideBackCalc2,
    SlideBackCalc2b,
    SlideBackCalc3,
    SlideBackCalc3a,
    SlideBackCalc4,
    SlideBackCalc5,
    SlideBackCalc6,
    SlideBackCalc6a,
    SlideBackCalc7,
    SlideBackCalc8,
    SlideBackCalc9,
    SlideBackCalc9a,
    SlideBackCalc9a2,
    SlideBackCalc9b,
    SlideBackCalc9c,
    SlideBackCalc10,
    SlideSandbox,
    SlideCredit,

} from "./allSlides.js"
import { Slide } from "./Slide.js";
import { textstyles } from "./textstyles.js";



export class View{
    slideList;
    currentSlide;

    constructor(){
        
        var vst=this;
        const app = new PIXI.Application({
          autoResize: true,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xf5f6ff
        });
        
        this.app=app;

        window.addEventListener('resize', resize);


        this.startwidth = window.innerWidth;
        this.startheight = window.innerHeight;
        this.startheight_nochange = window.innerHeight;
        this.startwidth_nochange = window.innerWidth;

        var win = this;
        var minX=1000;
        var minY=600;

        function resize(){
            app.renderer.resize(window.innerWidth, window.innerHeight);
            var changeY=window.innerHeight-win.startheight;
            var changeX=window.innerWidth-win.startwidth;

            header.width=window.innerWidth;
            footer.width=window.innerWidth;
            footer.y=changeY;

            app.stage.getChildByName("button_start").x=window.innerWidth/2;
            app.stage.getChildByName("button_start").y=(window.innerHeight/3) +350;

            app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
            app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_calc2sand").x=window.innerWidth/2 +100;
            app.stage.getChildByName("button_calc2sand").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100;
            app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_backfromcalc").x=window.innerWidth/2 -100;
            app.stage.getChildByName("button_backfromcalc").y=window.innerHeight-(75/2);

            app.stage.getChildByName("text_calc2sand").x=window.innerWidth/2 +100+100;
            app.stage.getChildByName("text_calc2sand").y=window.innerHeight-(75/2) -20;

            //GO TO BUTTONS
            app.stage.getChildByName("gotosand").x=window.innerWidth-100;
            app.stage.getChildByName("gotonet").x=window.innerWidth-250;
            app.stage.getChildByName("gotoneuron").x=window.innerWidth-375;

            if(vst.currentSlide!=33){

                app.stage.getChildAt(0).x=changeX/2;
                app.stage.getChildAt(0).y=changeY/2;
                app.stage.getChildAt(0).getChildAt(4).x=changeX/2;



            } else {
                app.stage.getChildAt(0).y=changeY/2;

                app.stage.getChildAt(0).getChildAt(2).getChildByName("databox").x=window.innerWidth-260;
                app.stage.getChildAt(0).getChildAt(2).getChildByName("databox").y=50 - changeY/2;

                app.stage.getChildAt(0).getChildAt(2).getChildByName("learnbox").y=50-changeY/2;
                app.stage.getChildAt(0).getChildAt(2).getChildByName("actfnsbox").y=155-changeY/2;
                app.stage.getChildAt(0).getChildAt(2).getChildByName("ratebox").y=315-changeY/2;



                app.stage.getChildAt(0).getChildAt(7).x=changeX;
                app.stage.getChildAt(0).getChildAt(7).y=-changeY/2 + changeY;

                app.stage.getChildAt(0).getChildAt(8).x=changeX;
                app.stage.getChildAt(0).getChildAt(8).y=-changeY/2+changeY;


                if(window.innerWidth>1280) {
                    app.stage.getChildAt(0).getChildAt(0).x=(window.innerWidth-1280)/2;
                    app.stage.getChildAt(0).getChildAt(1).x=(window.innerWidth-1280)/2;
                    app.stage.getChildAt(0).getChildAt(3).x=(window.innerWidth-1280)/2;
                    app.stage.getChildAt(0).getChildAt(6).x=(window.innerWidth-1280)/2;

                    app.stage.getChildAt(0).getChildAt(2).getChildByName("buttonNeuronAddContainer").x=(window.innerWidth-1280)/2;
                    app.stage.getChildAt(0).getChildAt(2).getChildByName("buttonNeuronRemContainer").x=(window.innerWidth-1280)/2;
                
                }
            }   
        }
        

        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
        this.slideList.push(SlideHome,SlideInstruct1, SlideInstruct2,

                            SlideIntro1,SlideIntro2,SlideIntro3, SlideIntro1b, SlideIntro3a, SlideIntro4a,
                            SlideNeuronA, SlideNeuronA2,SlideNeuron1b,SlideNeuron2,SlideNeuron2b,SlideNeuron2c,SlideNeuron2d,SlideNeuron2d2,SlideNeuron2e,
                            SlideNet1, SlideNet1b, SlideNet1b2,SlideNet1c, SlideNet1d,SlideNet1d2,
                            
                            SlideError1,SlideNet1e,SlideError3,SlideError4,SlideError5,SlideError6,SlideError6a,SlideError7,SlideError6b,
                            
                            SlideSandbox,SlideCredit,
                            
                            
                            SlideBackCalc0,SlideBackCalc1,SlideBackCalc2,SlideBackCalc2b,SlideBackCalc3,SlideBackCalc3a,SlideBackCalc4,SlideBackCalc5,SlideBackCalc6,SlideBackCalc6a,
                            SlideBackCalc7,SlideBackCalc8,SlideBackCalc9,SlideBackCalc9b,SlideBackCalc9a,SlideBackCalc9a2,SlideBackCalc9c,SlideBackCalc10,   
                            );

        /*TO DELETE*/
        for(var i=0; i<this.slideList.length;i++){
            var currText=new PIXI.Text(i);
            currText.x=0;
                currText.y=45;
            this.slideList[i].slideContainer.addChild(currText);
        }

        //maybe come back to this to cutdown on startup time
           
        var opener = new PIXI.Sprite(PIXI.Texture.from('images/intro/opener.png'));
        opener.name="opener";
        opener.anchor.set(0.5);
        opener.x=((window.innerWidth)/2);
        opener.y=((window.innerHeight)/3)+50;
        this.slideList[0].slideContainer.addChild(opener);
















        this.currentSlide=21;

















        this.drawSlide_init();

        var header = new PIXI.Graphics();
        header.name="header";
        header.beginFill(0xbfbfbf);
        header.drawRect(0,0,window.innerWidth,layout.HEADER_HEIGHT);
        app.stage.addChild(header);

        var footer=new PIXI.Graphics();
        footer.name="footer";
        footer.beginFill(0xbfbfbf);
        footer.drawRect(0,window.innerHeight,window.innerWidth,-layout.FOOTER_HEIGHT);
        app.stage.addChild(footer);

        this.createButtons();
        this.app.stage.addChild(this.slideList[this.currentSlide].textbuttonContainer);
        this.caveats();
        
    }

    // when window is resized, gotta resize all the other slides
    // but only some stuff
    resize2(){

        layout.CX= window.innerWidth/2;
        layout.CY= window.innerHeight/2 -50;

        var changeY=window.innerHeight-this.startheight_nochange;
        var changeX=window.innerWidth-this.startwidth_nochange;

        if(this.currentSlide!=33){

            this.app.stage.getChildAt(0).x=changeX/2;
            this.app.stage.getChildAt(0).y=changeY/2;
            this.app.stage.getChildAt(0).getChildAt(4).x=changeX/2;
        } else {
            this.app.stage.getChildAt(0).y=changeY/2;

            this.app.stage.getChildAt(0).getChildAt(2).getChildByName("databox").x=window.innerWidth-260;
            this.app.stage.getChildAt(0).getChildAt(2).getChildByName("databox").y=50 - changeY/2;

            this.app.stage.getChildAt(0).getChildAt(2).getChildByName("learnbox").y=50-changeY/2;
            this.app.stage.getChildAt(0).getChildAt(2).getChildByName("actfnsbox").y=155-changeY/2;
            this.app.stage.getChildAt(0).getChildAt(2).getChildByName("ratebox").y=315-changeY/2;

            this.app.stage.getChildAt(0).getChildAt(7).x=changeX;
            this.app.stage.getChildAt(0).getChildAt(7).y=-changeY/2 + changeY;

            this.app.stage.getChildAt(0).getChildAt(8).x=changeX;
            this.app.stage.getChildAt(0).getChildAt(8).y=-changeY/2+changeY;
/*

            if(window.innerWidth>1280) {
                app.stage.getChildAt(0).getChildAt(0).x=(window.innerWidth-1280)/2;
                app.stage.getChildAt(0).getChildAt(1).x=(window.innerWidth-1280)/2;
                app.stage.getChildAt(0).getChildAt(3).x=(window.innerWidth-1280)/2;
                app.stage.getChildAt(0).getChildAt(6).x=(window.innerWidth-1280)/2;

                app.stage.getChildAt(0).getChildAt(2).getChildByName("buttonNeuronAddContainer").x=(window.innerWidth-1280)/2;
                app.stage.getChildAt(0).getChildAt(2).getChildByName("buttonNeuronRemContainer").x=(window.innerWidth-1280)/2;
            
            }
            */
        }
    }




    caveats(){

        if (this.currentSlide==0){
            console.log(this.app.stage.children)
            for(var i = 1; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=false;
            }    

            this.app.stage.getChildByName("button_start").visible=true;

        } else {
            for(var i = 1; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=true;
                this.app.stage.getChildByName("button_start").visible=false;
            }
            
            if(this.slideList[this.currentSlide].backfromcalc){
                this.app.stage.getChildByName("button_backfromcalc").visible=true;
            } else {
                this.app.stage.getChildByName("button_backfromcalc").visible=false;
            }
    
            if(this.slideList[this.currentSlide].calc2sand){
                this.app.stage.getChildByName("button_calc2sand").visible=true;
                this.app.stage.getChildByName("text_calc2sand").visible=true;
    
            } else {
                this.app.stage.getChildByName("button_calc2sand").visible=false;
                this.app.stage.getChildByName("text_calc2sand").visible=false;

    
            }
    
            if(this.slideList[this.currentSlide].slidecredit){
                this.app.stage.getChildByName("button_nextslide").visible=false;
            } else {
                this.app.stage.getChildByName("button_nextslide").visible=true;
            }
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
        this.caveats();
        this.resize2();
    }

    createButtons(){

  //      ((window.innerWidth)/2);
//        opener.y=((window.innerHeight)/3)+50;

        var vst=this;

        var startx=window.innerWidth/2;
        var starty=(window.innerHeight/3) +350;

        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/back.png'),layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_start = new Button("button_start",PIXI.Texture.from('images/buttons/start.png'),startx,starty,true,0xFFFFFF);
        
        var button_backfromcalc = new Button("button_backfromcalc",PIXI.Texture.from('images/buttons/back.png'),layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_calc2sand = new Button("button_calc2sand",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true);

        var text_calc2sand = new PIXI.Text("Click next"+'\n'+"to go to sandbox mode!", textstyles.default)
        text_calc2sand.name="text_calc2sand";
        text_calc2sand.x=layout.NEXTSLIDE_X+100;
        text_calc2sand.y=layout.NEXTSLIDE_Y-20;


        this.app.stage.addChild(button_nextslide,button_prevslide,button_start,button_backfromcalc,button_calc2sand, text_calc2sand);

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

            if(vst.slideList[vst.currentSlide].slideNet !== undefined && vst.slideList[vst.currentSlide].largenet==1  && !vst.slideList[vst.currentSlide].fakenet){//&& vst.currentSlide == 9){
                vst.slideList[vst.currentSlide].slideNet.update();
                vst.slideList[vst.currentSlide].draw_update_large(vst.slideList[vst.currentSlide].slideNet)
                vst.drawSlide();
            }

            if(vst.slideList[vst.currentSlide].slideNet !== undefined && vst.slideList[vst.currentSlide].largenet!=1 && !vst.slideList[vst.currentSlide].fakenet){//&& vst.currentSlide == 9){
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

        this.app.stage.getChildByName("button_backfromcalc").on('click', function(e){ 
            vst.currentSlide=32;
            vst.drawSlide();
        });

        this.app.stage.getChildByName("button_calc2sand").on('click', function(e){ 
            vst.currentSlide=33;
            vst.drawSlide();
        });

        //GO TO BUTTONS
        var homebutton = new Button("homebutton",PIXI.Texture.from('images/home.png'),30,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(homebutton);
        this.app.stage.getChildByName("homebutton").on('click', function(e){ 

            vst.currentSlide=0;
            vst.drawSlide();
                
        });

        var gotoneuron = new Button("gotoneuron",PIXI.Texture.from('images/buttons/gotoneuron.png'),window.innerWidth-375,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotoneuron);
        this.app.stage.getChildByName("gotoneuron").on('click', function(e){ 
            if (vst.currentSlide!=11){
                vst.currentSlide=11;
                vst.drawSlide();
            }
        });

        var gotonet = new Button("gotonet",PIXI.Texture.from('images/buttons/gotoneuron.png'),window.innerWidth-250,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotonet);
        this.app.stage.getChildByName("gotonet").on('click', function(e){ 
            
            if (vst.currentSlide!=23){
                vst.currentSlide=23;
                vst.drawSlide();
            }
        });

        var gotoforward = new Button("gotoforward",PIXI.Texture.from('images/buttons/gotoneuron.png'),window.innerWidth-550,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotoforward);
        this.app.stage.getChildByName("gotoforward").on('click', function(e){ 
            
            if (vst.currentSlide!=18){
                vst.currentSlide=18;
                vst.drawSlide();
            }
        });

        var gotobackprop = new Button("gotobackprop",PIXI.Texture.from('images/buttons/gotoneuron.png'),window.innerWidth-650,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotobackprop);
        this.app.stage.getChildByName("gotobackprop").on('click', function(e){ 
            
            if (vst.currentSlide!=24){
                vst.currentSlide=24;
                vst.drawSlide();
            }
        });

        var gotocalc = new Button("gotocalc",PIXI.Texture.from('images/buttons/gotoneuron.png'),window.innerWidth-850,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotocalc);
        this.app.stage.getChildByName("gotocalc").on('click', function(e){ 
            
            if (vst.currentSlide!=35){
                vst.currentSlide=35;
                vst.drawSlide();
            }
        });

        var gotosand = new Button("gotosand",PIXI.Texture.from('images/buttons/sand.png'),window.innerWidth-100,layout.HEADER_HEIGHT/2 +1,false)
        this.app.stage.addChild(gotosand);
        this.app.stage.getChildByName("gotosand").on('click', function(e){ 
            if (vst.currentSlide!=33){
                vst.currentSlide=33;
                vst.drawSlide();
            }
        });
    }
}
