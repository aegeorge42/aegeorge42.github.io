
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

    createSingleDatapoint_train(expected_text, input, expected){
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

    createDatapoints_train(amount, start, expected_type){

        if(expected_type == datatypes.STRAWBERRY){
            var maxLength=1;
            var minLength=0.5;

            var maxRound=0.5;
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
            var maxLength=0.5;
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
    fruits_small.createSingleDatapoint_train("blueberry", [0.2, 1.00], [0,1]);
    fruits_small.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint_train("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint_train("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint_train("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);
    fruits_small.createSingleDatapoint_train("blueberry", [0.1, 0.9], [0,1]);
    fruits_small.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);


export const fruits_test = new Data(0, ["strawberry","blueberry"],["length","roundness"]);

    fruits_test.createSingleDatapoint_train("blueberry", [0.1, 0.9], [0,1]);
    fruits_test.createSingleDatapoint_train("blueberry", [0.15, 0.85], [0,1]);
    fruits_test.createSingleDatapoint_train("blueberry", [0.12, 0.92], [0,1]);

    fruits_test.createSingleDatapoint_train("strawberry", [0.9, 0.1], [1,0]);
    fruits_test.createSingleDatapoint_train("strawberry", [0.85, 0.15], [1,0]);
    fruits_test.createSingleDatapoint_train("strawberry", [0.99, 0.12], [1,0]);


export const fruits_test2 = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
    fruits_test2.createSingleDatapoint_train("blueberry", [0.1, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.2, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.3, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.4, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.5, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.6, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.7, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.8, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [0.9, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.0, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.1, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.2, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.3, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.4, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.5, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.6, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.7, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.8, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [1.9, 0.5], [0,1]);   
    fruits_test2.createSingleDatapoint_train("blueberry", [2.0, 0.5], [0,1]);   

    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.1], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.2], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.3], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.4], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.5], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.6], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.7], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.8], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 0.9], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [0.5, 1.0], [1,0]);


    export const fruits_test3 = new Data(0, ["strawberry","blueberry"],["length","roundness"]);
    fruits_test3.createSingleDatapoint_train("blueberry", [0.2, 0.4], [0,1]);   
    fruits_test3.createSingleDatapoint_train("strawberry", [0.5, 0.1], [1,0]);   


    fruits_test3.createSingleDatapoint_train("blueberry", [0.3, 0.5], [0,1]); 
    fruits_test3.createSingleDatapoint_train("strawberry", [0.6, 0.2], [1,0]);   

    fruits_test3.createSingleDatapoint_train("blueberry", [0.4, 0.6], [0,1]);  
    fruits_test3.createSingleDatapoint_train("strawberry", [0.7, 0.3], [1,0]);   

    fruits_test3.createSingleDatapoint_train("blueberry", [0.5, 0.7], [0,1]);   
    fruits_test3.createSingleDatapoint_train("strawberry", [0.8, 0.4], [1,0]);   

    fruits_test3.createSingleDatapoint_train("blueberry", [0.6, 0.8], [0,1]);   


    
    fruits_test3.createSingleDatapoint_train("strawberry", [0.9, 0.5], [1,0]);   
    

  /*  fruits_test2.createSingleDatapoint_train("strawberry", [1.0, 0.1], [1,0]);
    fruits_test2.createSingleDatapoint_train("strawberry", [1.8, 0.1], [1,0]);
*/



export const fruits = new Data(50,["strawberry","blueberry"],["length", "roundness"]);
    fruits.createDatapoints_train(25,0,datatypes.STRAWBERRY);
    fruits.createDatapoints_train(25,25,datatypes.BLUEBERRY);
   // console.log(fruits.points)