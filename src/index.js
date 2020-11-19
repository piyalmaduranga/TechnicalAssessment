const { getRandomWordSync, getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
function loopSync() {
    for (i = 1; i <= 100; i++) {
        console.log(i + ": " + getRandomWordSync({ withErrors: false }))
    }
}

function loopSyncWithFizzBuzz() {
    for (i = 1; i <= 100; i++) {
        var value = ""
        try {
            value = getRandomWordSync({ withErrors: true, slow: true })
            if (i % 15 == 0) {
                value = 'FizzBuzz'
            } else if (i % 3 == 0) {
                value = 'Fizz'
            } else if (i % 5 == 0) {
                value = 'Buzz'
            }
        }
        catch (err) {
            value = 'It shouldn\'t break anything!';
        }
        console.log(i + ": " + value)
    }
}

function getRerustWithFizzBuzz() {
    var data = {
        result: []
    };

    for (i = 1; i <= 100; i++) {
        var value = ""
        try {
            value = getRandomWordSync({ withErrors: true })
            if (i % 15 == 0) {
                value = 'FizzBuzz'
            } else if (i % 3 == 0) {
                value = 'Fizz'
            } else if (i % 5 == 0) {
                value = 'Buzz'
            }
        }
        catch (err) {
            value = 'It shouldn\'t break anything!';
        }
        data.result.push({
            "index": i,
            "value": value
        })
    }
    return data
}

function resultWithMinimumTime() {
    var t0 = new Date().getTime();
    var promises = [];
    for (i = 0; i < 100; i++) {
        var promise = getRandomWord({ withErrors: false, slow: true });
        promises.push(promise);
    }
    var results = Promise.all(promises);
    results.then((val) => {
        printValueListWithFizzBuzz(val)
        var t1 = new Date().getTime();
        console.log("Total time duration " + (t1 - t0) + " milliseconds.")
    }).catch((error) => {
        console.log("piyal " + error)
    });
}

// function printValueList(list) {
//     for (i = 0; i < list.length; i++) {
//         console.log((i + 1) + ": " + list[i])
//     }
// }

function printValueListWithFizzBuzz(list) {
    for (i = 0; i < list.length; i++) {
        var value = ""
        try {
            value = list[i]
            var key = i + 1
            if (key % 15 == 0) {
                value = 'FizzBuzz'
            } else if (key % 3 == 0) {
                value = 'Fizz'
            } else if (key % 5 == 0) {
                value = 'Buzz'
            }

        } catch (err) {
            value = 'It shouldn\'t break anything!'
        }

        console.log(key + ": " + value)

    }

}


async function loopAsync() {
    for (i = 1; i <= 100; i++) {
        var response = await getRandomWord({ withErrors: true, slow: false }).catch((error) => {
            return "It shouldn\'t break anything!"
        });;
        console.log(i + ": " + response)
    }
};

async function loopAsyncWithFizzBuzz() {
    var t0 = new Date().getTime();
    for (i = 1; i <= 100; i++) {
        var response = await getRandomWord({ withErrors: true, slow: false }).catch((error) => {
            return "It shouldn\'t break anything!"
        });;
        if (i % 15 == 0) {
            response = 'FizzBuzz'
        } else if (i % 3 == 0) {
            response = 'Fizz'
        } else if (i % 5 == 0) {
            response = 'Buzz'
        }
        console.log(i + ": " + response)
    }
    var t1 = new Date().getTime();
    console.log("Total time duration " + (t1 - t0) + " milliseconds.")
};

// file will be create in resource/data.json
// Node server run on http://localhost:5000
function uploadResult() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:5000/result";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
        }
    };
    var data = JSON.stringify(getRerustWithFizzBuzz());
    xhr.send(data);
}
console.log('1) Print numbers from 1 to 100 to the console, but for each number also print a random word using the function getRandomWordSync. E.g.')
loopSync();
console.log('2) Modify your code to be a "Fizz Buzz" program. That is, print the numbers as in the previous step, but for multiples of three, print "Fizz" (instead of the random word), for multiples of five, print "Buzz" and for numbers which are both multiples of three and five, print "FizzBuzz".')
loopSyncWithFizzBuzz()
console.log('3/4) Create a version of steps 1 and 2 using the asynchronous function, getRandomWord. This function returns a Promise, which resolves to a random word string.')
// loopAsync();
loopAsyncWithFizzBuzz().then(() => {
    console.log('5) Node developers: Instead of printing the console. Write the information to a file in the root of this project \n Frontend developers, send your result to an HTTP endpoint (since there is no running endpoint, this part of your solution does not need to actually run)')
    uploadResult()
    console.log('. Imagine getRandomWord\'s implementation is slow and takes 500ms to complete (call getRandomWord({ slow: true }) to emulate this). Can you make your solution run in less than 1000ms with the slow option turned on?')
    resultWithMinimumTime()
})


