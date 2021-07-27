
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

    createDataPoints(amount, expected_type){
        if(expected_type == datatypes.STRAWBERRY){
            var maxLength=5;
            var minLength=0.5;

            var maxRound=0.8;
            var minRound=0;

            for (var i =0; i<amount; i++){

                var strawb = {
                    input: [ Math.random() * (maxLength - minLength) + minLength,  Math.random() * (maxRound - minRound) + minRound],
                    expected: [1,0],
                    expected_text: "strawberry"
                }

                this.points[i]=strawb;
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

                this.points[i]=blueb;
            }
        }
    }
}

const fruits = new Data(100,["strawberry","blueberry"],["length", "roundness"]);
    fruits.createDataPoints(50,datatypes.STRAWBERRY);