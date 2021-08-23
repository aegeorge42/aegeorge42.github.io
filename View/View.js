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
    SlideData3,
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

        //resize canvas when window is resized
        window.addEventListener('resize', resize); 
        var h=window.innerHeight;    
        function resize(){
            app.renderer.resize(window.innerWidth, window.innerHeight);
            header.width=window.innerWidth;
            footer.width=window.innerWidth;
            footer.y=window.innerHeight-h;

            app.stage.getChildByName("button_nextslide").x=window.innerWidth/2 +100;
            app.stage.getChildByName("button_nextslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_prevslide").x=window.innerWidth/2 -100,
            app.stage.getChildByName("button_prevslide").y=window.innerHeight-(75/2);

            app.stage.getChildByName("button_start").x=window.innerWidth/2 -25;
            app.stage.getChildByName("button_start").y=window.innerHeight*(7/8);
        }
        document.body.appendChild(this.app.view);

        //add premade slides
        this.slideList = [];
        this.slideList.push(SlideHome,SlideInstruct,SlideIntro1,SlideIntro2,SlideIntro3,
                            SlideIntro3a,SlideIntro4,SlideNeuron1,SlideNeuron2,SlideSandbox,SlideGraphTest);

        this.currentSlide=9;

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
       // console.log("INNERHEIGHT:" + layout.INNERHEIGHT + "INNERWIDTH:" + window.innerWidth);

      //  console.log(footer.x +" "+ footer.y +" "+ footer.width +" "+ footer.height);
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
        console.log(layout.INNERHEIGHT, window.innerWidth)
        var vst = this;

        //START
        var startx=window.innerWidth/2 -25;
        var starty=window.innerHeight*(7/8);

        var button_start = new Button("button_start",PIXI.Texture.from('images/buttons/start.png'),startx,starty,true,0xFFA500);
        button_start.setTint(0xcc5801,'mouseover');
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
        var button_nextslide = new Button("button_nextslide",PIXI.Texture.from('images/buttons/next.png'),layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,false)
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
        var button_prevslide = new Button("button_prevslide",PIXI.Texture.from('images/buttons/back.png'),layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true)
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

        // HOME
        var homebutton = new Button("homebutton",PIXI.Texture.from('images/home.png'),30,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(homebutton);
        this.app.stage.getChildByName("homebutton").on('click', function(e){ 
        
                vst.currentSlide=0;
                vst.drawSlide();
                vst.caveats();
        });

        // GO TO INTRO
        var gotointro = new Button("gotointro",PIXI.Texture.from('images/buttons/gotointro.png'),250,layout.HEADER_HEIGHT/2,false)
        this.app.stage.addChild(gotointro);
        this.app.stage.getChildByName("gotointro").on('click', function(e){ 
            if (vst.currentSlide!=2){
                vst.currentSlide=2;
                vst.drawSlide();
                vst.caveats();
            }
        });

        // GO TO DATA
        var goto1 = new Button("goto1",PIXI.Texture.from('images/buttons/gotodata.png'),400,layout.HEADER_HEIGHT/2,false,0x2c2c33)
        this.app.stage.addChild(goto1);
        this.app.stage.getChildByName("goto1").on('click', function(e){ 
            if (vst.currentSlide!=3){
                vst.currentSlide=3;
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
