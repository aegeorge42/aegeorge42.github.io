
export const datatypes = {
	STRAWBERRY: "strawberry", 
    BLUEBERRY: "blueberry", 
}

export class data{
    
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

    point_front(expected_text, input, expected){
        var dp = {
            input: input,
            expected: expected,
            expected_text: expected_text

        }
        this.points.unshift(dp);
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


    makefruits_linear(){
        var x = 0;
        var y = 0;
        var minLength=0;
        var maxLength=0;
        var minRound=0;
        var maxRound=0;

        //blueberry
        minLength=0;
        maxLength=4;
        minRound=6;
        maxRound=10;
    
        for(var i =0; i<30; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }

        minLength=0;
        maxLength=2.5;
        minRound=2.5;
        maxRound=6;
    
        for(var i =0; i<10; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }

        minLength=4;
        maxLength=6;
        minRound=7.5;
        maxRound=10;
    
        for(var i =0; i<10; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("blueberry", [x, y], [0,1]);
        }

        //strawberry
        minLength=6;
        maxLength=10;
        minRound=0;
        maxRound=4;

        for(var i =0; i<30; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=4.8;
        maxLength=6;
        minRound=0;
        maxRound=2.5;

        for(var i =0; i<10; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("strawberry", [x, y], [1,0]);
        }

        minLength=7.5;
        maxLength=10;
        minRound=2.5;
        maxRound=5;

        for(var i =0; i<10; i++){
            x=Math.random() * (maxLength - minLength) + minLength;
            y=Math.random() * (maxRound - minRound) + minRound;
            this.point("strawberry", [x, y], [1,0]);
        }

    }





}


export const fruits = new data(0,["strawberry","blueberry"],["length", "roundness"]);
fruits.makefruits_linear();
fruits.shuffle();
fruits.point_front("blueberry", [2, 10], [0,1]);

export const fruits_single = new data(0,["strawberry","blueberry"],["length", "roundness"]);
fruits_single.point("blueberry", [2, 10], [0,1]);


export const fruits_circle = new data(0, ["strawberry","blueberry"],["length","roundness"]);
fruits_circle.makefruits_circle_newaxis();
fruits_circle.shuffle();

//fruits_circle.makefruitslarge_test();
    
