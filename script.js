let brain;

brain = new NeuralNetwork([4, 8]);

var training_data = {}
var index = 0

function data(inputs, outputs) {
    return {inputs, outputs}
}

setInterval(() => {
    if (AI == false) return;
    if (document.getElementById("halt").innerText == "Pause: no") {
        let FinalArray = [current_po1 / 255, current_po2 / 255, current_po3 / 255, current_po4 / 255]

        var prediction = brain.predict(FinalArray)
        var left;
        var up;
        var down;
        var right;

        console.log(prediction)

        if (prediction[0] > prediction[1]) {
            var out = check(current_po1, true);
            left = out;
        } else {
            var out = check(current_po1, false);
            if (out[0] == 1 && out[1] == 0) {
                left = [1, 0]
            } else {
                left = [0, 1]
            }
        }

        if (prediction[2] > prediction[3]) {
            var out = check(current_po2, true);
            up = out;
        } else {
            var out = check(current_po2, false);
            if (out[0] == 1 && out[1] == 0) {
                up = [1, 0]
            } else {
                up = [0, 1]
            }
        }

        if (prediction[4] > prediction[5]) {
            var out = check(current_po3, true);
            down = out;
        } else {
            var out = check(current_po3, false);
            if (out[0] == 1 && out[1] == 0) {
                down = [1, 0]
            } else {
                down = [0, 1]
            }
        }

        if (prediction[6] > prediction[7]) {
            var out = check(current_po4, true);
            right = out;
        } else {
            var out = check(current_po4, false);
            if (out[0] == 1 && out[1] == 0) {
                right = [1, 0]
            } else {
                right = [0, 1]
            }
        }

        brain.train(FinalArray, left.concat(up, down, right));
        training_data[index] = data(FinalArray, left.concat(up, down, right))
        index++;
    }
}, 1)

function save() {
    console.log("Saved!")
    var output = document.getElementById("data");
    var str = JSON.stringify(training_data);
    output.value = str
}