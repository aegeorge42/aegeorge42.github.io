
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
}

//as much as i hate this, it would take me longer to automate
export const fruits_small = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
    fruits_small.point("blueberry", [0.2, 1.00], [0,1]);

export const fruits_test = new Data(0, ["strawberry","blueberry"],["length","roundness"]);

    fruits_test.point("blueberry", [0.1, 0.9], [0,1]);


export const fruits_test3 = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
    fruits_test3.point("blueberry", [0.2, 0.4], [0,1]);   

export const fruits_circle = new Data(0, ["strawberry","blueberry"],["length","roundness"]);

    var x = 0;
    var y = 0;

    var minLength=0
    var maxLength=0
    var minRound=0;;
    var maxRound=0;

    for(var i =0; i<20; i++){
        minLength=0.8
        maxLength=1.2;

        minRound=0.4;
        maxRound=0.6;

        x=Math.random() * (maxLength - minLength) + minLength;
        y=Math.random() * (maxRound - minRound) + minRound;
        fruits_circle.point("blueberry", [x, y], [0,1]);
    }

    fruits_circle.point("strawberry", [0.1, 0.5], [1,0]);   
    fruits_circle.point("strawberry", [1.0, 0.1], [1,0]);   
    fruits_circle.point("strawberry", [2.0, 0.5], [1,0]); 
    fruits_circle.point("strawberry", [1.0, 1.0], [1,0]);  

    fruits_circle.point("strawberry", [0.5, 0.2], [1,0]);   
    fruits_circle.point("strawberry", [0.5, 0.9], [1,0]);   
    fruits_circle.point("strawberry", [1.5, 0.9], [1,0]);   

    fruits_circle.point("strawberry", [1.5, 0.2], [1,0]);   
    fruits_circle.point("strawberry", [2.0, 0.5], [1,0]); 
    fruits_circle.point("strawberry", [1.0, 1.0], [1,0]); 

    fruits_circle.point("strawberry", [0.2, 0.3], [1,0]); 
    fruits_circle.point("strawberry", [1.8, 0.3], [1,0]); 
    fruits_circle.point("strawberry", [0.2, 0.7], [1,0]); 
    fruits_circle.point("strawberry", [1.8, 0.7], [1,0]); 

export const fruits = new Data(0,["strawberry","blueberry"],["length", "roundness"]);
    fruits.point("strawberry", [2.0, 0.5], [1,0]);   
    fruits.point("strawberry", [1.0, 0.3], [1,0]);   
    fruits.point("strawberry", [1.5, 0.8], [1,0]);   
    fruits.point("strawberry", [1.2, 0.6], [1,0]);   
    fruits.point("strawberry", [1.5, 0.35], [1,0]);   


    fruits.point("blueberry", [0.2, 0.9], [0,1]);
    fruits.point("blueberry", [0.2, 0.5], [0,1]);
    fruits.point("blueberry", [0.3, 0.8], [0,1]);
    fruits.point("blueberry", [0.5, 1.0], [0,1]);







   // fruits.createDatapoints_train(25,0,datatypes.STRAWBERRY);
  //  fruits.createDatapoints_train(25,25,datatypes.BLUEBERRY);
   // console.log(fruits.points)