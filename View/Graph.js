import {data} from "../Model/data.js";
import { layout } from "./layout.js";
import { loader } from "./View.js";
export class Graph extends PIXI.Sprite{

    constructor(datap){
        super();

        this.axis=new PIXI.Sprite(loader.resources["images/graph/axis.png"].texture);
        this.axis.x=window.innerWidth-240;
        this.axis.y=layout.BOTTOMBUFFER-230;
        this.axis.scale.set(0.8);
        this.axis.name="axis";

        this.bg = new PIXI.Sprite(loader.resources["images/graph/graph.png"].texture);
        this.bg.height=200;
        this.bg.width=200;

        this.bg.x=67;
        this.bg.y=15;
        
        this.pointslength = datap.points.length;
        

        this.axis.addChild(this.bg)

        this.fakedata=new data(0, ["strawberry","blueberry"],["length","roundness"]);

        this.bgpointsize = 20;
        this.numbgpoints = 200/this.bgpointsize;


        this.posAxis()

        this.populateGraph(datap);
    }

    getGraph(){
        return this.axis;
    }

    posAxis(){

        this.fakedata=new data(0, ["strawberry","blueberry"],["length","roundness"]);

        for(var i =1; i<this.numbgpoints+1;i++){
            for(var j =1; j<this.numbgpoints+1;j++){        

                this.fakedata.createSingleDatapoint_test([(i*10/this.numbgpoints),j*10/this.numbgpoints]);
            
                var bgp = new PIXI.Sprite(loader.resources["images/graph/bgtest.png"].texture);
                bgp.anchor.set(0.5);
                bgp.x=(i*this.bgpointsize) 
                bgp.y=(-j*this.bgpointsize)+this.bg.width; 
                bgp.name= i.toString()+j.toString();

                this.bg.addChild(bgp);
                }
            }
            

    }

    negAxis(){
        this.fakedata=new data(0, ["strawberry","blueberry"],["length","roundness"]);

        for(var i =-4; i<(this.numbgpoints/2)+1;i++){
            for(var j =-4; j<(this.numbgpoints/2)+1;j++){        

                this.fakedata.createSingleDatapoint_test([(i*10/this.numbgpoints),j*10/this.numbgpoints]);
                var bgp = new PIXI.Sprite(loader.resources["images/graph/bgtest.png"].texture);
                bgp.anchor.set(0.5);
                bgp.x=(i*this.bgpointsize)+ (5*this.bgpointsize)
                bgp.y=(-j*this.bgpointsize)+this.bg.width-(5*this.bgpointsize); 
                bgp.name= i.toString()+j.toString();

                this.bg.addChild(bgp);
            }
        }
    }

    // remove points but not bg
    clearGraph(data){
        for(var i=0;i<this.fakedata.points.length;i++){
            this.bg.getChildAt(i).tint=0xFFFFFF;
        }
        for(var j =0; j<data.points.length;j++){
            this.bg.removeChildAt(100);
        }
    }

    clearGraphBg(){
        for(var i=0;i<this.fakedata.points.length;i++){
            this.bg.getChildAt(i).tint=0xFFFFFF;
        }
    }

    clearGraph_all(data){
        for(var j =0; j<data.points.length;j++){
            this.bg.removeChildAt(100);
        }

        for(var i=0; i<100; i++){
            this.bg.removeChildAt(0);
        }    
    }

    populateGraph(data){
        for(var i =0; i<data.points.length;i++){
            var p = new PIXI.Sprite(loader.resources["images/graph/point.png"].texture);
            p.anchor.set(0.5);
           

            if (data.large){
                p.x=(((data.points[i].input[0])*this.bg.height/10)) +this.bg.height/2 ;
                p.y=this.bg.width-((data.points[i].input[1])*this.bg.width/10) -this.bg.width/2 ;
            } else{
                p.x=((data.points[i].input[0])*this.bg.height/10);
                p.y=this.bg.width-((data.points[i].input[1])*this.bg.width/10);
            }


            if(data.points[i].expected_text=="strawberry"){
                p.tint=0xff121a;

            } else if(data.points[i].expected_text=="blueberry"){
                p.tint=0x3e1fcc;
            }
            this.bg.addChild(p);
        }
    }

    // feed in each point from the graph and calculate results
    updateGraph(net){

        net.setNetInput_test(this.fakedata.points[0]);
        net.update();

        for(var i=0;i<this.fakedata.points.length;i++){
            net.setNetInput_test(this.fakedata.points[i]);
            net.update();

            //this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff0000;
            //strawberry
    

            if(net.netOut[0]>0.5 && net.netOut[1]<=0.5){

                if(net.netOut[0]>0.9){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff0000;

                }else if(net.netOut[0]>0.8){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff4c3f;

                }else if(net.netOut[0]>0.7){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff756c;

                }else if(net.netOut[0]>0.6){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xff9995;

                } else{
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xffbbbb;
                }
            }

            //blueberry
            if(net.netOut[1]>0.5 && net.netOut[0]<=0.5){

               if(net.netOut[1]>0.9){
                this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x0000ff;

                }else if(net.netOut[1]>0.8){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x5149ff;

                }else if(net.netOut[1]>0.7){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x7a75ff;

                }else if(net.netOut[1]>0.6){
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0x9f9dff;

                } else{
                    this.bg.getChildByName(net.netInput[0].toString() + net.netInput[1].toString()).tint=0xc4c4ff;

                }

            }
            
            
        }

        net.setNetInput(net.data.points[0]);
        
    }
    
} 