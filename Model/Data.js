
export const datatypes = {
	STRAWBERRY: "strawberry", 
    BLUEBERRY: "blueberry", 
}

export class Data{
    
    constructor(size, type, labels){
        this.points=new Array(size);
        this.type=type;
        this.labels=labels;
    }

    point(expected_text, input, expected){
        var dp = {
            input: input,
            expected: expected,
            expected_text: expected_text

        }
        this.points.push(dp);
    }

    createSingleDatapoint_test(input){
        var dp = {
            input: input
        }
        this.points.push(dp);
    }

    shuffle(){
        for (var i = this.points.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.points[i];
            this.points[i] = this.points[j];
            this.points[j] = temp;
        }
    }

    


    makefruits_linearf(){
        this.point("blueberry", [0.5, 0.5], [0,1]);


        /*
    var x = 0;
    var y = 0;

    var minLength=0.6;
    var maxLength=1.0;
    var minRound=0.4;
    var maxRound=0.6;

    var numblue=80;
    for(var i =0; i<numblue; i++){
        x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.1 - -0.1) + -0.1)
        y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.1 - -0.1) + -0.1)
        this.point("blueberry", [x, y], [0,1]);
    }

    minLength=0;
    maxLength=0.4;
    minRound=0;
    maxRound=1;

    var numstraw=60;
    for(var i =0; i<numstraw; i++){
        x=(Math.random() * (maxLength - minLength) + minLength) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        y=(Math.random() * (maxRound - minRound) + minRound) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        this.point("strawberry", [x, y], [1,0]);
    }

    minLength=0.4;
    maxLength=1.0;
    minRound=0.8;
    maxRound=1;

    for(var i =0; i<numstraw/2; i++){
        x=(Math.random() * (maxLength - minLength) + minLength) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        y=(Math.random() * (maxRound - minRound) + minRound) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        this.point("strawberry", [x, y], [1,0]);
    }

    minLength=0.4;
    maxLength=1.0;
    minRound=0;
    maxRound=0.2;

    for(var i =0; i<numstraw/2; i++){
        x=(Math.random() * (maxLength - minLength) + minLength) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        y=(Math.random() * (maxRound - minRound) + minRound) //+ (Math.random() * (0.1 - -0.1) + -0.1)
        this.point("strawberry", [x, y], [1,0]);

        
    }
    */
    }

    makefruits_linear_old(){
        var x = 0;
        var y = 0;
        var set = Math.floor(Math.random() * 2);
        var minLength=0;
        var maxLength=0;
        var minRound=0;
        var maxRound=0;

        
      //  if(set==0){
            //blueberry
            minLength=0;
            maxLength=5;
            minRound=0;
            maxRound=5;
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=Math.random() * (maxRound - minRound) + minRound;
                this.point("blueberry", [x, y], [0,1]);
            }
        
            
            minLength=0.25
            maxLength=0.6
            minRound=0.75
            maxRound=1.0
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=Math.random() * (maxRound - minRound) + minRound;
                this.point("blueberry", [x, y], [0,1]);
            }

            //strawberry
            minLength=0.5;
            maxLength=1.0;
            minRound=0.0;
            maxRound=0.25;
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }

            minLength=0.75;
            maxLength=1.0;
            minRound=0.25;
            maxRound=0.6;
        
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
      /*  } else if(set==1){

            //blueberry
            minLength=0.75;
            maxLength=1.0;
            minRound=0.5;
            maxRound=1.0;
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=Math.random() * (maxRound - minRound) + minRound;
                this.point("blueberry", [x, y], [0,1]);
            }

            minLength=0.35
            maxLength=0.7
            minRound=0.75
            maxRound=1.0
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=Math.random() * (maxRound - minRound) + minRound;
                this.point("blueberry", [x, y], [0,1]);
            }

            //strawberry
            minLength=0;
            maxLength=0.35;
            minRound=0.0;
            maxRound=0.5;
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }

            minLength=0.35;
            maxLength=0.75;
            minRound=0;
            maxRound=0.25;
        
        
            for(var i =0; i<20; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
        //}*/
        
    }

    makefruits_circle_circle(){
        var cx = 5 
        var cy = 5 
        var x = 0
        var y = 0
        var radius=5;
        var points=10;

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = cx + Math.cos(t) * (radius)
            y = cy + Math.sin(t) * (radius)
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = 10-(cx + Math.cos(t) * (radius))
            y = cy + Math.sin(t) * (radius)
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = 10-(cx + Math.cos(t) * (radius))
            y = 10-(cy + Math.sin(t) * (radius))
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = cx + Math.cos(t) * (radius)
            y = 10-(cy + Math.sin(t) * (radius))
            this.point("strawberry", [x, y], [1,0]);
        }

        var x = 0;
        var y = 0;
        
        var minLength=4;
        var maxLength=6;
        var minRound=4;
        var maxRound=6;
    
        var numblue=60;
        for(var i =0; i<numblue; i++){
            x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.1 - -0.1) + -0.1)
            y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.1 - -0.1) + -0.1)
            this.point("blueberry", [x, y], [0,1]);
        }

    }


    makefruits_circle_newaxis(){
        var cx = 0 
        var cy = 0 
        var x = 0
        var y = 0
        var radius=5;
        var points=15;

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = cx + Math.cos(t) * (radius) + (Math.random() * (0.5 - -0.5) + -0.5)
            y = cy + Math.sin(t) * (radius) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = -(cx + Math.cos(t) * (radius)) + (Math.random() * (0.5 - -0.5) + -0.5)
            y = -(cy + Math.sin(t) * (radius))+ (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1)
            x = -(cx + Math.cos(t) * (radius)) + (Math.random() * (0.5 - -0.5) + -0.5)
            y = (cy + Math.sin(t) * (radius)) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("strawberry", [x, y], [1,0]);
        }

        for(var i=0; i<points; i++){
            var t = (Math.PI / 2) * (i / points - 1) 
            x = (cx + Math.cos(t) * (radius)) + (Math.random() * (0.5 - -0.5) + -0.5)
            y = -(cy + Math.sin(t) * (radius)) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("strawberry", [x, y], [1,0]);
        }

        var x = 0;
        var y = 0;
        
        var minLength=-2;
        var maxLength=2;
        var minRound=-2;
        var maxRound=2;
    
        var numblue=50;
        for(var i =0; i<numblue; i++){
            x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.5 - -0.5) + -0.5)
            y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("blueberry", [x, y], [0,1]);
        }


    }

    makefruits_circle2(){

        
        //blueberries
            
            //blueberries
            var x = 0;
            var y = 0;
        
            var minLength=0.4;
            var maxLength=0.6;
            var minRound=0.4;
            var maxRound=0.6;
        
            var numblue=60;
            for(var i =0; i<numblue; i++){
                x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.1 - -0.1) + -0.1)
                y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.1 - -0.1) + -0.1)
                this.point("blueberry", [x, y], [0,1]);
            }
            //strawberries
            //sides
            minLength=0;
            maxLength=0.1;
            minRound=0.1;
            maxRound=0.9;
            var numstraw=20;
        
            for(var i =0; i<numstraw; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0.9;
            maxLength=1.0;
            minRound=0.1;
            maxRound=0.9;
        
            for(var i =0; i<numstraw; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0.1;
            maxLength=0.9;
            minRound=0.9;
            maxRound=1.0;
        
            for(var i =0; i<numstraw; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0.1;
            maxLength=0.9;
            minRound=0;
            maxRound=0.1;
        
            for(var i =0; i<numstraw; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
           /*
            //corners
            minLength=0;
            maxLength=0.1;
            minRound=0.9;
            maxRound=1.0;
        
            for(var i =0; i<numstraw/2; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0;
            maxLength=0.1;
            minRound=0;
            maxRound=0.1;
        
            for(var i =0; i<numstraw/2; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0.9;
            maxLength=1.0;
            minRound=0;
            maxRound=0.1;
        
            for(var i =0; i<numstraw/2; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            minLength=0.9;
            maxLength=1.0;
            minRound=0.9;
            maxRound=1.0;
        
            for(var i =0; i<numstraw/2; i++){
                x=Math.random() * (maxLength - minLength) + minLength;
                y=(Math.random() * (maxRound - minRound) + minRound);
                this.point("strawberry", [x, y], [1,0]);
            }
            */
        }


    makefruits_linear(){
        var x = 0;
        var y = 0;
        var minLength=0;
        var maxLength=0;
        var minRound=0;
        var maxRound=0;

        //blueberry
        minLength=0;
        maxLength=5;
        minRound=5;
        maxRound=10;
    
        for(var i =0; i<50; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }

        //strawberry
        minLength=6;
        maxLength=10;
        minRound=0;
        maxRound=5;

        for(var i =0; i<50; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("strawberry", [x, y], [1,0]);
        }

    }

    makefruits_nonlin(){
        var x = 0;
        var y = 0;
    
        var minLength=0;
        var maxLength=5;
        var minRound=4;
        var maxRound=6;
    
        var numblue=50;
        for(var i =0; i<numblue; i++){
            x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.5 - -0.5) + -0.5)
            y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("blueberry", [x, y], [0,1]);
        }

        minLength=0;
        maxLength=8;
        minRound=0;
        maxRound=2;

        var numstraw=20;
        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=8;
        maxLength=10;
        minRound=0;
        maxRound=10;

        var numstraw=20;
        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0;
        maxLength=8;
        minRound=8;
        maxRound=10;

        var numstraw=20;
        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

    }

    makefruits_circle_neg(){
        var x = 0;
        var y = 0;
    
        var minLength=-3;
        var maxLength=3;
        var minRound=-3;
        var maxRound=3;
    
        var numblue=50;
        for(var i =0; i<numblue; i++){
            x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.5 - -0.5) + -0.5)
            y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("blueberry", [x, y], [0,1]);
        }

        //strawberries
        //sides
        minLength=-6;
        maxLength=6;
        minRound=6;
        maxRound=7;

        var numstraw=20;
        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=-7;
        maxLength=-6;
        minRound=-6;
        maxRound=6;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=7;
        maxLength=6;
        minRound=-6;
        maxRound=6;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=-6;
        maxLength=6;
        minRound=-7;
        maxRound=-6;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        
    }

    makefruits_circle(){
        var x = 0;
        var y = 0;
    
        var minLength=4;
        var maxLength=6;
        var minRound=4;
        var maxRound=6;
    
        var numblue=100;
        for(var i =0; i<numblue; i++){
            x=(Math.random() * (maxLength - minLength) + minLength) + (Math.random() * (0.5 - -0.5) + -0.5)
            y=(Math.random() * (maxRound - minRound) + minRound) + (Math.random() * (0.5 - -0.5) + -0.5)
            this.point("blueberry", [x, y], [0,1]);
        }

        //strawberries
        //sides
        minLength=1;
        maxLength=9;
        minRound=0;
        maxRound=1;

        var numstraw=20;
        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=1;
        maxLength=9;
        minRound=9;
        maxRound=10;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0;
        maxLength=1;
        minRound=1;
        maxRound=9;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=9;
        maxLength=10;
        minRound=1;
        maxRound=9;

        for(var i =0; i<numstraw; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        //corners
        minLength=0;
        maxLength=1;
        minRound=0;
        maxRound=1;
    
        for(var i =0; i<numstraw/2; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=9;
        maxLength=10;
        minRound=0;
        maxRound=1;
    
        for(var i =0; i<numstraw/2; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=9;
        maxLength=10;
        minRound=9;
        maxRound=10;
    
        for(var i =0; i<numstraw/2; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0;
        maxLength=1;
        minRound=9;
        maxRound=10;
    
        for(var i =0; i<numstraw/2; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }
    }




}


export const fruits = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
fruits.makefruits_linear();
fruits.shuffle();

export const fruits_circle = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
fruits_circle.makefruits_circle();
fruits_circle.shuffle();

//fruits_circle.makefruitslarge_test();
    