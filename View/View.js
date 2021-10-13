//import { defaultInput } from "../Model/net.js";
import {Button} from "./Button.js"
import {layout} from "./layout.js"
import {SlideHome,
    SlideInstruct1,
    SlideInstruct2,

    SlideIntro1,
    SlideIntro2,
    SlideIntro3,
    SlideIntro4,
    SlideIntro5,
    SlideIntro6,
    SlideIntro7,
    SlideIntro8,

    SlideNeuron1,
    SlideNeuron2,
    SlideNeuron3,
    SlideNeuron4,
    SlideNeuron5,
    SlideNeuron6,
    SlideNeuron7,

    SlideNet1,
    SlideNet2,
    SlideNet3,
    SlideNet4,

    SlideBackIntro1,
    SlideBackIntro2,

    SlideCost1,
    SlideCost2,
    SlideCost3,
    SlideCost4,
    SlideCost5,
    SlideCost6,
    SlideCost7,


    SlideCost10,
    SlideCost8,
    SlideCost9,

    SlideBack1,
    SlideBack2,
    SlideBack3,
    SlideBack4,
    SlideBack5,
    SlideBack6,
    SlideBack7,
    SlideBack8,
    SlideBack9,
    SlideBack10,
    SlideBack11,
    SlideBack12,
    SlideBack13,
    SlideBackCalc8,
    SlideBackCalc9,
    SlideBackCalc9a,
    SlideBackCalc9a2,
    SlideBackCalc9b,
    SlideBackCalc9c,
    SlideBackCalc10,
    SlideSandbox,
    SlideCredit,
    makeSlides,
} from "./allSlides.js"
import { Slide } from "./Slide.js";
import { textstyles } from "./textstyles.js";

export var openerloader = PIXI.loader;
export var loader = PIXI.loader;

export class View{
    constructor(){
        
        var vst=this;
        const app = new PIXI.Application({
          autoResize: true,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0xf5f6ff
        });

        this.app=app;
        document.body.appendChild(this.app.view);

        var opener = new PIXI.Sprite(PIXI.Texture.from('images/opener.png'));
            opener.name="opener";
            opener.anchor.set(0.5);
            opener.x=window.innerWidth/2;
            opener.y=window.innerHeight/2;
        this.app.stage.addChild(opener);

        var loading = new PIXI.Sprite(PIXI.Texture.from('images/loading.png'));
        loading.name="loading";
        loading.anchor.set(0.5);
        loading.x=window.innerWidth/2;
        loading.y=window.innerHeight/2+250 -30;
        this.app.stage.addChild(loading );

        //lol
        loader
            .add([
                //SLIDE IMAGES
                "images/interactive.png",
                "images/net/neuron.png",
                "images/net/overneuron2.png",
                "images/net/neuron_backprop.png",
                "images/net/neuron_large.png",
                "images/net/inputbase.png",
                "images/backprop/in1.png",
                "images/backprop/in2.png",
                "images/backprop/y1.png",
                "images/backprop/y2.png",
                "images/backprop/c1form.png",
                "images/backprop/c2form.png",
                "images/net/strawberrycard.png",
                "images/net/blueberrycard.png",
                "images/cost/cost1box.png",
                "images/cost/cost2box.png",
                "images/cost/costplus.png",
                "images/backprop/cplus2.png",

                //ALL SLIDES IMAGES
                //view buttons
                "images/buttons/back.png",
                "images/buttons/next.png",
                "images/buttons/start.png",
                "images/buttons/gotoneuron.png",
                "images/buttons/gotoforward.png",
                "images/buttons/gotobackprop.png",
                "images/buttons/gotocalc.png",
                "images/buttons/sand.png",
                "images/buttons/home.png",


                //slide buttons
                "images/boxes/learnbox.png",
                "images/boxes/actfnsbox.png",
                "images/boxes/layersbox.png",
                "images/boxes/epochbox.png",
                "images/boxes/ratebox.png",
                "images/boxes/databox.png",
                "images/boxes/cost.png",

                "images/buttons/step.png",
                "images/buttons/learn.png",
                "images/buttons/reset.png",
                "images/buttons/pause.png",
                "images/buttons/sigmoid.png",
                "images/buttons/relu.png",
                "images/buttons/button_layer.png",
                "images/buttons/button_removelayer.png",
                "images/buttons/button_addneuron.png",
                "images/buttons/button_removeneuron.png",
                "images/buttons/plus.png",
                "images/buttons/minus.png",
                "images/buttons/datalin.png",
                "images/buttons/datacircle.png",

                //graph
                "images/graph/axis.png",
                "images/graph/axis_neg.png",
                "images/graph/bgtest.png",
                "images/graph/point.png",
                "images/graph/graph.png",


                

                //intro
                "images/arrows/arrow1.png",

                "images/intro/sandbox.png",
                "images/intro/sorter.png",
                "images/intro/examples_labels.png",
                "images/intro/captcha.png",
                "images/intro/percep_blank1.png",
                "images/intro/singleblue.png",
                "images/intro/singlestraw.png",
                "images/intro/percep_blue1.png",
                "images/intro/percep_straw1.png",
                "images/intro/input_example.png",
                "images/intro/percep_labels.png",
                "images/intro/percep_layers.png",

                //neuron
                "images/intro/neuron_example3.png",
                "images/net/neuronOver_large.png",
                "images/net/neuron_large_actfncover.png",
                "images/intro/sigmoid_graph.png",
                "images/intro/relu_graph.png",
                "images/arrows/targetarrow.png",

                //cost
                "images/cost/percep_forward.png",
                "images/cost/percep_cost.png",
                "images/cost/percep_update.png",
                "images/cost/costformwb2.png",
                "images/cost/costgraph.png",
                "images/cost/costgraph_point.png",
                "images/cost/nablaC.png",
                "images/cost/costgraph_slope1.png",
                "images/cost/minnablaC.png",
                "images/cost/lr.png",
                "images/cost/wnewform.png",
                "images/cost/costgraph_slope2.png",
                "images/cost/costgraph_lrsmall.png",
                "images/cost/costgraph_lrlarge.png",
                "images/arrows/gotocalcarrow.png",
                "images/buttons/calculus.png",
                "images/arrows/learnboxarrows.png",
                "images/backprop/dxdy/dadz21.png",
                "images/backprop/dxdy/dcda21.png",
                "images/backprop/dxdy/dcdw3.png",
                "images/backprop/dxdy/w3_new.png",

                "images/backprop/dxdy/dzdw1.png",
                "images/backprop/dxdy/dadz11.png",
                "images/backprop/dxdy/dcda11.png",
                "images/backprop/dxdy/dcdw1.png",
                "images/backprop/dxdy/w1_new.png",

                //backprop
                "images/backprop/w2.png",
                "images/backprop/w4_teal.png",
                "images/backprop/a21.png",
                "images/backprop/y.png",
                "images/backprop/C.png",
                "images/backprop/arrows/w3toc.png",
                "images/backprop/dctot.png",
                "images/backprop/w3_teal.png",
                "images/backprop/w3new.png",
                "images/backprop/arrows/w3all.png",
                "images/backprop/dxdy/dzdw3.png",       
                "images/backprop/z21.png",
                "images/backprop/dadz21.png",
                "images/backprop/dcda21.png",
                "images/backprop/ctot.png",
                "images/backprop/dcdw3.png",
                "images/backprop/dz21dw3_form.png",
                "images/backprop/b21.png",
                "images/backprop/arrows/w3toz.png",
                "images/backprop/arrows/ztoa.png",
                "images/backprop/da21dz_form.png",
                "images/backprop/arrows/a21toc.png",
                "images/backprop/dcda12_form.png",
                "images/backprop/dctotfinal_form.png",

                "images/backprop/arrows/biasarrow.png",
                "images/backprop/dcdb.png",
                "images/backprop/dcdb_final.png",
                "images/backprop/dzdb.png",
                "images/backprop/w1_teal.png",
                "images/backprop/dcdw1.png",
                "images/backprop/dz1dw1.png",
                "images/backprop/da1dz1.png",
                "images/backprop/arrows/w1all.png",
                "images/backprop/dcda11.png",
                "images/backprop/a11.png",
                "images/backprop/z11.png",
                "images/backprop/a22.png",
                "images/backprop/z22.png",
                "images/backprop/c1.png",
                "images/backprop/c2.png",
                "images/backprop/arrows/w1toc2.png",
                "images/backprop/dcda1_form1.png",
                "images/backprop/arrows/w1toc_expand1.png",
                "images/backprop/dcda_form2.png",
                "images/backprop/w1arrows_all.png",
                "images/backprop/dcda1.png",
                "images/backprop/arrows/w1toc_expand2.png",
                "images/backprop/dcda_form3.png",
                "images/backprop/formulas/dcda1_full.png",
                "images/backprop/formulas/dcda1_full2.png",
                "images/backprop/dc1da21.png",
                "images/backprop/arrows/w1toc_expand3.png",
                "images/backprop/formulas/dcdw1_full.png",


            ])
        .load(setup);

        function setup() {
            vst.currentSlide=0;
            makeSlides();

            vst.slideList = [];
            vst.slideList.push(SlideHome,SlideInstruct1, SlideInstruct2,

                SlideIntro1,SlideIntro2,SlideIntro3, SlideIntro4,
                SlideIntro5, SlideIntro6,SlideIntro7, SlideIntro8,
                
                SlideNeuron1,SlideNeuron2,SlideNeuron3,
                SlideNeuron4,SlideNeuron5,SlideNeuron6,SlideNeuron7,
                
                SlideNet1, SlideNet2, SlideNet3, SlideNet4, 
                
                SlideBackIntro1,SlideBackIntro2,
                
                SlideCost1,SlideCost2,SlideCost3,SlideCost4,SlideCost5,
                SlideCost6,SlideCost7,SlideCost8,SlideCost9,SlideCost10,
                
                SlideSandbox,SlideCredit,
                
                SlideBack1,SlideBack2,SlideBack3,SlideBack4,SlideBack5,
                SlideBack6,SlideBack7,SlideBack8,SlideBack9,SlideBack10,
                
                SlideBack11,
                SlideBack12,SlideBack13,SlideBackCalc8,SlideBackCalc9,SlideBackCalc9b,SlideBackCalc9a,SlideBackCalc9a2,SlideBackCalc9c,SlideBackCalc10,   
                );
            vst.drawSlide_init();

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


            vst.createButtons();

            vst.caveats();
            app.stage.getChildByName("button_start").visible=true;
            app.stage.getChildByName("loading").visible=false;

            /* numbers slides - helpful for debugging
            for(var i=0; i<vst.slideList.length;i++){
                var currText=new PIXI.Text(i);
                currText.x=0;
                    currText.y=45;
                vst.slideList[i].slideContainer.addChild(currText);
            }
            */

        }

        window.addEventListener('resize', resize);


        this.startwidth = window.innerWidth;
        this.startheight = window.innerHeight;
        this.startheight_nochange = window.innerHeight;
        this.startwidth_nochange = window.innerWidth;

        var win = this;

        function resize(){
            app.renderer.resize(window.innerWidth, window.innerHeight);
            var changeY=window.innerHeight-win.startheight;
            var changeX=window.innerWidth-win.startwidth;

            app.stage.getChildByName("opener").x=window.innerWidth/2;
            app.stage.getChildByName("opener").y=window.innerHeight/2;

            app.stage.getChildByName("header").width=window.innerWidth;
            app.stage.getChildByName("footer").width=window.innerWidth;
            app.stage.getChildByName("footer").y=changeY;

            app.stage.getChildByName("button_start").x=window.innerWidth/2;
            app.stage.getChildByName("button_start").y=window.innerHeight/2 -20 +250,

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
            app.stage.getChildByName("gotoneuron").x=window.innerWidth-720;
            app.stage.getChildByName("gotoforward").x=window.innerWidth-570;
            app.stage.getChildByName("gotobackprop").x=window.innerWidth-420;
            app.stage.getChildByName("gotocalc").x=window.innerWidth-270;
            app.stage.getChildByName("gotosand").x=window.innerWidth-100;


            if(vst.currentSlide!=34){

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
    }

    createButtons(){
        var vst=this;

        var startx=layout.CX;
        var starty=layout.CY+250;

        var button_nextslide = new Button("button_nextslide",loader.resources["images/buttons/next.png"].texture,layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_prevslide = new Button("button_prevslide",loader.resources["images/buttons/back.png"].texture,layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_start = new Button("button_start",loader.resources["images/buttons/start.png"].texture,startx,starty,true);
  
        var button_backfromcalc = new Button("button_backfromcalc",loader.resources["images/buttons/back.png"].texture,layout.PREVSLIDE_X,layout.NEXTSLIDE_Y,true);
        var button_calc2sand = new Button("button_calc2sand",loader.resources["images/buttons/next.png"].texture,layout.NEXTSLIDE_X,layout.NEXTSLIDE_Y,true);
        var text_calc2sand = new PIXI.Text("Click next to go"+'\n'+ "to sandbox mode!", textstyles.default)
            text_calc2sand.name="text_calc2sand";
            text_calc2sand.x=layout.NEXTSLIDE_X+100;
            text_calc2sand.y=layout.NEXTSLIDE_Y-20;

        var homebutton = new Button("homebutton",loader.resources["images/buttons/home.png"].texture,30,layout.HEADER_HEIGHT/2,false)
        var gotoneuron = new Button("gotoneuron",loader.resources["images/buttons/gotoneuron.png"].texture,window.innerWidth-720,layout.HEADER_HEIGHT/2,false)
        var gotoforward = new Button("gotoforward",loader.resources["images/buttons/gotoforward.png"].texture,window.innerWidth-570,layout.HEADER_HEIGHT/2,false)
        var gotobackprop = new Button("gotobackprop",loader.resources["images/buttons/gotobackprop.png"].texture,window.innerWidth-420,layout.HEADER_HEIGHT/2,false)
        var gotocalc = new Button("gotocalc",loader.resources["images/buttons/gotocalc.png"].texture,window.innerWidth-270,layout.HEADER_HEIGHT/2,false)
        var gotosand = new Button("gotosand",loader.resources["images/buttons/sand.png"].texture,window.innerWidth-100,layout.HEADER_HEIGHT/2 +1,false,0xcdff94)



        this.app.stage.addChild(button_nextslide, button_prevslide, button_start, button_backfromcalc,button_calc2sand,
             text_calc2sand, homebutton,gotoneuron,gotoforward,gotobackprop,gotocalc,gotosand);

        this.app.stage.getChildByName("homebutton").on('click', function(e){ 
                vst.currentSlide=0;
                vst.drawSlide();
                    
        });

        this.app.stage.getChildByName("homebutton").on('tap', function(e){ 
            vst.currentSlide=0;
            vst.drawSlide();
                
    });

        this.app.stage.getChildByName("button_start").on('click', function(e){ 
            if(vst.currentSlide+1<vst.slideList.length){
                vst.currentSlide=vst.currentSlide+1;
                vst.drawSlide();
            }
        });

       this.app.stage.getChildByName("button_start").on('tap', function(e){ 
            if(vst.currentSlide+1<vst.slideList.length){
                vst.currentSlide=vst.currentSlide+1;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("button_nextslide").on('click', function(e){ 

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

        this.app.stage.getChildByName("button_nextslide").on('tap', function(e){ 

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
            if(vst.currentSlide>0){

                vst.currentSlide=vst.currentSlide-1;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("button_prevslide").on('tap', function(e){ 
            if(vst.currentSlide>0){

                vst.currentSlide=vst.currentSlide-1;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("button_backfromcalc").on('click', function(e){ 
            vst.currentSlide=32;
            vst.drawSlide();
        
        });

        this.app.stage.getChildByName("button_backfromcalc").on('tap', function(e){ 
            vst.currentSlide=32;
            vst.drawSlide();
        
        });

        this.app.stage.getChildByName("button_calc2sand").on('click', function(e){ 
            vst.currentSlide=34;
            vst.drawSlide();
        });

        this.app.stage.getChildByName("button_calc2sand").on('tap', function(e){ 
            vst.currentSlide=34;
            vst.drawSlide();
        });


        this.app.stage.getChildByName("gotoforward").on('click', function(e){ 
            if (vst.currentSlide!=18){
                vst.currentSlide=18;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotoforward").on('tap', function(e){ 
            if (vst.currentSlide!=18){
                vst.currentSlide=18;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotoneuron").on('click', function(e){ 
            if (vst.currentSlide!=11){
                vst.currentSlide=11;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotoneuron").on('tap', function(e){ 
            if (vst.currentSlide!=11){
                vst.currentSlide=11;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotobackprop").on('click', function(e){ 
            if (vst.currentSlide!=23){
                vst.currentSlide=23;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotobackprop").on('tap', function(e){ 
            if (vst.currentSlide!=23){
                vst.currentSlide=23;
                vst.drawSlide();
            }
        });


        this.app.stage.getChildByName("gotocalc").on('click', function(e){ 
            if (vst.currentSlide!=36){
                vst.currentSlide=36;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotocalc").on('tap', function(e){ 
            if (vst.currentSlide!=36){
                vst.currentSlide=36;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotosand").on('click', function(e){ 
            if (vst.currentSlide!=34){
                vst.currentSlide=34;
                vst.drawSlide();
            }
        });

        this.app.stage.getChildByName("gotosand").on('tap', function(e){ 
            if (vst.currentSlide!=34){
                vst.currentSlide=34;
                vst.drawSlide();
            }
        });
    }


    caveats(){    
        if (this.currentSlide==0){
           for(var i = 0; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=false;
            }    
        
            this.app.stage.getChildByName("button_start").visible=true;
            this.app.stage.getChildByName("opener").visible=true;

        } else {
            for(var i = 0; i<this.app.stage.children.length; i++){
                this.app.stage.getChildAt(i).visible=true;
            }                

            this.app.stage.getChildByName("button_start").visible=false;
            this.app.stage.getChildByName("opener").visible=false;
            this.app.stage.getChildByName("loading").visible=false;
            
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
    
    drawSlide_init(){
        this.app.stage.addChildAt(this.slideList[this.currentSlide].slideContainer,0);
    }

    drawSlide(){
        this.app.stage.removeChildAt(0);
        this.app.stage.addChildAt(this.slideList[this.currentSlide].slideContainer,0);
        this.caveats();
        this.resize2();
    }


    // when window is resized, gotta resize all the other slides
    // but only some stuff
    resize2(){

        layout.CX= window.innerWidth/2;
        layout.CY= window.innerHeight/2 -50;

        var changeY=window.innerHeight-this.startheight_nochange;
        var changeX=window.innerWidth-this.startwidth_nochange;

        this.app.stage.getChildByName("opener").x=window.innerWidth/2;
        this.app.stage.getChildByName("opener").y=window.innerHeight/2;

        if(this.currentSlide!=34){

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

        }
    }

}