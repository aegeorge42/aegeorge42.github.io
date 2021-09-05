import {Data} from "../Model/data.js";
import { layout } from "./layout.js";

export class Graph extends PIXI.Sprite{

    constructor(data){
        super();

        this.axis=new PIXI.Sprite(PIXI.Texture.from('images/axis2.png'));
        this.axis.x=window.innerWidth-290;
        this.axis.y=layout.BOTTOMBUFFER-280;

        this.bg = new PIXI.Sprite(PIXI.Texture.from('images/graph.png'));
        this.bg.height=200;
        this.bg.width=200;

        this.bg.x=67//60;
        this.bg.y=15;
        

        this.axis.addChild(this.bg)

        this.fakedata=new Data(0, ["strawberry","blueberry"],["length","roundness"]);

        var bgpointsize = 20;
        var numbgpoints = 200/bgpointsize;
        for(var i =1; i<numbgpoints+1;i++){
            for(var j =1; j<numbgpoints+1;j++){        
               // console.log((i/10)*2,j/10);

                this.fakedata.createSingleDatapoint_test([(i/numbgpoints)*2,j/numbgpoints]);
                //console.log(this.fakedata);
              
                var bgp = new PIXI.Sprite(PIXI.Texture.from('images/bgtest.png'));
                bgp.anchor.set(0.5);
                bgp.x=(i*20) 
                bgp.y=(-j*20)+200//0//(this.bg.height-bgpointsize)-(j*bgpointsize)
                bgp.name= ((i/numbgpoints)*2).toString() + (j/numbgpoints).toString();//[bgp.x,bgp.y];

                this.bg.addChild(bgp);

                var xname=(i/10)*2;
                var yname=j/10;

                var text = new PIXI.Text(yname,
                                    
                    new PIXI.TextStyle({
                        fontFamily: 'Helvetica',
                        fontWeight: 400,
                        fontSize: 12,
                        fill: 0x0000FF
                    }));

                    text.anchor.set(0.5)
                  //  bgp.addChild(text)
                }
        }


        for(var i =0; i<data.points.length;i++){
            var p = new PIXI.Sprite(PIXI.Texture.from('images/point.png'));
            p.anchor.set(0.5);
            p.x=((data.points[i].input[0])*this.bg.height)/2;
            p.y=this.bg.width-((data.points[i].input[1])*this.bg.width);
            if(data.points[i].expected_text=="strawberry"){
                p.tint=0xff0000;

            } else if(data.points[i].expected_text=="blueberry"){
                p.tint=0x0000ff;
            }
            this.bg.addChild(p);
        }


        /*
        super();

        this.axis=new PIXI.Sprite(PIXI.Texture.from('images/axis.png'));
            this.axis.x=window.innerWidth-280;
            this.axis.y=layout.BOTTOMBUFFER-280;
        this.bg = new PIXI.Sprite(PIXI.Texture.from('images/graph.png'));
            this.bg.height=200;
            this.bg.width=200;
            this.bg.x=63//window.innerWidth-250;
            this.bg.y=15//window.innerHeight-300;

        this.fakedata=new Data(0, ["strawberry","blueberry"],["length","roundness"]);

        // create mesh + fake data in order to plot decision boundaries
        var bgpointsize = 20;
        var numbgpoints = this.bg.height/bgpointsize;
        for(var i =0; i<numbgpoints;i++){
            for(var j =0; j<numbgpoints;j++){

            this.fakedata.createSingleDatapoint_test([(i/numbgpoints)*2,j/numbgpoints]);
            var bgp = new PIXI.Sprite(PIXI.Texture.from('images/bgtest.png'));
                bgp.anchor.set(0.5);
                bgp.x=i*bgpointsize;
                bgp.y=(this.bg.height-bgpointsize)-(j*bgpointsize) ;
                bgp.name= ((i/numbgpoints)*2).toString() + (j/numbgpoints).toString();//[bgp.x,bgp.y];
               
                var xname=((i/numbgpoints)*2);
                var yname=(j/numbgpoints);

               var text = new PIXI.Text(yname,
                    
                new PIXI.TextStyle({
                    fontFamily: 'Helvetica',
                    fontWeight: 400,
                    fontSize: 12,
                    fill: 0x0000FF
                  }));

                  text.anchor.set(0.5)
                  bgp.addChild(text)
                
            this.bg.addChild(bgp);
            }
        }

        // plot actual data points
        for(var i =0; i<data.points.length;i++){
            var p = new PIXI.Sprite(PIXI.Texture.from('images/point.png'));
            p.anchor.set(0.5);
            p.x=((data.points[i].input[0])*this.bg.height)/2;
            p.y=this.bg.width-((data.points[i].input[1])*this.bg.width);
            if(data.points[i].expected_text=="strawberry"){
                p.tint=0xff0000;

            } else if(data.points[i].expected_text=="blueberry"){
                p.tint=0x0000ff;
            }
            this.bg.addChild(p);
        }

        this.axis.addChild(this.bg)
        */
    }

    getGraph(){
        return this.axis;
    }

    updateGraph(net){
       // net.data=this.fakedata;
        net.setNetInput_test(this.fakedata.points[0]);
        net.update();
        //console.log(net.netOut);
    //    net.setNetInput_test(this.fakedata.points[80]);
    //    net.update();
     //   console.log(net.netOut);
        //console.log(net.netOut);


       // for(var i=0;i<3;i++){
        for(var i=0;i<this.fakedata.points.length;i++){
            net.setNetInput_test(this.fakedata.points[i]);
            net.update();

            //strawberry
            if(net.netOut[0]>0.5 && net.netOut[1]<=0.5){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff0000;
            }

            //probably strawberry
            if(net.netOut[0]>0.5 && net.netOut[1]>0.5 && net.netOut[0]>net.netOut[1] || 
                net.netOut[0]<=0.5 && net.netOut[1]<=0.5 && net.netOut[0]>net.netOut[1]){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xffcccb;
            }

            //blueberry
            if(net.netOut[1]>0.5 && net.netOut[0]<=0.5){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x0000ff;
            }

            //probably blueberry
            if(net.netOut[1]>0.5 && net.netOut[0]>0.5 && net.netOut[1]>net.netOut[0] || 
                net.netOut[1]<=0.5 && net.netOut[0]<=0.5 && net.netOut[1]>net.netOut[0]){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xadd8e6;
            }




           /*
            //blueberry
            if(net.netOut[0]<0.5 && net.netOut[1] >=0.5){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x0000ff;
            }

            if(net.netOut[0]<0.5 && net.netOut[0]<net.netOut[1]){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xADD8E6;
            }

            //strawberry
            if(net.netOut[1]<0.5 && net.netOut[0] >=0.5){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff0000;
            }

            if(net.netOut[1]<0.5 && net.netOut[1]<net.netOut[0]){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xFFCCCB;
            }
            */
        }
    }
} 