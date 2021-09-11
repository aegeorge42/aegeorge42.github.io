
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
        
        //blueberry
        var minLength=0;
        var maxLength=0.45;
        var minRound=0.45;
        var maxRound=1.0;
    
        for(var i =0; i<40; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }
    
        /*
        minLength=0.1
        maxLength=0.4
        minRound=0.4
        maxRound=0.6;
        for(var i =0; i<5; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }

        minLength=0.5;
        maxLength=1.0;
        minRound=0.8
        maxRound=1.0;
        for(var i =0; i<5; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }
        */


        //strawberry
        minLength=0.5;
        maxLength=1.0
        minRound=0.0
        maxRound=0.5;
    
        for(var i =0; i<40; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0.8;
        maxLength=1.0;
        minRound=0.1
        maxRound=0.2;
    
        /*
        for(var i =0; i<5; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=1.6;
        maxLength=2.0;
        minRound=0.4
        maxRound=0.7;
    
        for(var i =0; i<5; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }
        */
    }

    makefruits_circle(){
        //blueberries
        var x = 0;
        var y = 0;
    
        var minLength=0.9
        var maxLength=1.2
        var minRound=0.4;
        var maxRound=0.6;
    
        for(var i =0; i<80; i++){
            x=(Math.random() * (maxLength - minLength) + minLength)// + (Math.random() * (0.1 - -0.1) + -0.1)
            y=(Math.random() * (maxRound - minRound) + minRound)// + (Math.random() * (0.1 - -0.1) + -0.1)
            this.point("blueberry", [x, y], [0,1]);
        }

        minLength=0
        maxLength=0
        minRound=0;;
        maxRound=0;
    
        for(var i =0; i<80; i++){
            x=(Math.random() * (maxLength - minLength) + minLength)// + (Math.random() * (0.1 - -0.1) + -0.1)
            y=(Math.random() * (maxRound - minRound) + minRound)// + (Math.random() * (0.1 - -0.1) + -0.1)
            this.point("blueberry", [x, y], [0,1]);
        }
      
        //strawberries
        minLength=0;
        maxLength=0.4;
        minRound=0;
        maxRound=1.0;
    
        for(var i =0; i<20; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=1.6;
        maxLength=2.0;
        minRound=0;
        maxRound=1.0;
    
        for(var i =0; i<20; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0;
        maxLength=2.0;
        minRound=0.85;
        maxRound=1.0;
    
        for(var i =0; i<20; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=0;
        maxLength=2.0;
        minRound=0;
        maxRound=0.15;
    
        for(var i =0; i<20; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=(Math.random() * (maxRound - minRound) + minRound);
            this.point("strawberry", [x, y], [1,0]);
        }
    }
}


export const fruits = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
fruits.makefruits_linear();

export const fruits_circle = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
fruits_circle.makefruits_circle();
    