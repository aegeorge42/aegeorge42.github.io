export class Data{

    constructor(type, labels){
        this.points=[];
        this.type=type;
        this.labels=labels;
    }

    createDatapoint(input, expected, expected_text){
        var dp = {
            input: input,
            expected: expected,
            expected_text: expected_text

        }
        this.points.push(dp);
    }
    
}

const fruits = new Data(["strawberry","blueberry"],["length", "roundness"]);

const train_input11 = {
    input: [0.99,0.01],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_data1 = {
   points: [train_input11],
   labels: ["length", "roundness"],
   type: ["strawberry", "blueberry"]
}