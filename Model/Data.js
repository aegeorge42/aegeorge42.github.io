export class Data{

    constructor(type, input_labels){
        this.inputs=[];
        this.type=type;
        this.input_labels=input_labels;
    }

    createDatapoint(input, expected, expected_text){
        var dp = {
            input: input,
            expected: expected,
            expected_text: expected_text

        }
        this.inputs.push(dp);
    }
    
}

const fruits = new Data(["strawberry","blueberry"],["length", "roundness"]);

const train_input11 = {
    input: [0.99,0.01],
    expected: [1,0],
    expected_text: ["strawberry"]
}

const train_data1 = {
   inputs: [train_input11],
   input_labels: ["length", "roundness"],
   type: ["strawberry", "blueberry"]
}