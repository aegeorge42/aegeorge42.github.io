
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

    shuffle(){}

    makefruits_linear(){
        var x = 0;
        var y = 0;
        var set = Math.floor(Math.random() * 4);
        console.log(set);
        
        /*
            //blueberry
            var minLength=0.1;
            var maxLength=0.35;
            var minRound=0.5;
            var maxRound=1.0;
        
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
        */












































            

        
    }













   /* makefruits_circle(){

    //blueberries

        
        //blueberries
        var x = 0;
        var y = 0;
    
        var minLength=0.4;
        var maxLength=0.6;
        var minRound=0.4;
        var maxRound=0.6;
    
        var numblue=100;
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
    }
    */
}


export const fruits = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
fruits.makefruits_linear();

//export const fruits_circle = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
//fruits_circle.makefruits_circle();
    