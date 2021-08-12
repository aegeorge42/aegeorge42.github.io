
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

    createSingleDatapoint(expected_text, input, expected){
        var dp = {
            input: input,
            expected: expected,
            expected_text: expected_text

        }
        this.points.push(dp);
    }

    createDataPoints(amount, start, expected_type){

        if(expected_type == datatypes.STRAWBERRY){
            var maxLength=1;
            var minLength=0.5;

            var maxRound=0.8;
            var minRound=0;

            for (var i =0; i<amount; i++){

                var strawb = {
                    input: [ Math.random() * (maxLength - minLength) + minLength,  Math.random() * (maxRound - minRound) + minRound],
                    expected: [1,0],
                    expected_text: "strawberry"
                }

                this.points[start+i]=strawb;
            } 

        } else if (expected_type == datatypes.BLUEBERRY){
            var maxLength=0.9;
            var minLength=0.05;

            var maxRound=1.0;
            var minRound=0.6;

            for (var i =0; i<amount; i++){

                var blueb = {
                    input: [ Math.random() * (maxLength - minLength) + minLength,  Math.random() * (maxRound - minRound) + minRound],
                    expected: [0,1],
                    expected_text: "blueberry"
                }

                this.points[start+i]=blueb;
            }
        }
    }
}

export const fruits_small = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
    fruits_small.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);


export const fruits_test = new Data(0, ["strawberry","blueberry"],["length","roundness"]);

    fruits_test.createSingleDatapoint("blueberry", [0.1, 0.9], [0,1]);
        fruits_test.createSingleDatapoint("strawberry", [0.9, 0.1], [1,0]);
    fruits_test.createSingleDatapoint("blueberry", [0.1, 0.8], [0,1]);
        fruits_test.createSingleDatapoint("strawberry", [0.8, 0.2], [1,0]);
    fruits_test.createSingleDatapoint("blueberry", [0.1, 0.7], [0,1]);
        fruits_test.createSingleDatapoint("strawberry", [0.7, 0.3], [1,0]);


export const fruits = new Data(100,["strawberry","blueberry"],["length", "roundness"]);
    fruits.createDataPoints(50,0,datatypes.STRAWBERRY);
    fruits.createDataPoints(50,50,datatypes.BLUEBERRY);
   // console.log(fruits.points)