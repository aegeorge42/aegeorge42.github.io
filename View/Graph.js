export class Graph extends PIXI.Sprite{

    constructor(data){
        super();

        this.bg = new PIXI.Sprite(PIXI.Texture.from('images/graph.png'));
            this.bg.x=100;
            this.bg.y=100;
      
        for(var i =0; i<data.points.length;i++){
            var p = new PIXI.Sprite(PIXI.Texture.from('images/point.png'));
            p.x=(data.points[i].input[0])*300;
            p.y=(data.points[i].input[1])*300;
            if(data.points[i].expected_text=="strawberry"){
                p.tint=0xff0000;

            } else if(data.points[i].expected_text=="blueberry"){
                p.tint=0x0000ff;
            }
            this.bg.addChild(p);

        }
        return this.bg;
    }
}