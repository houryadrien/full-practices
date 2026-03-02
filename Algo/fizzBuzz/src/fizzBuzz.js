import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FIZZ_BUZZ = 'FizzBuzz';
const FIZZ = 'Fizz';
const BUZZ = 'Buzz';

export function initFizzBuzz() {
    console.log("Hello, wolcome to the FuzzBuzz game");
    rl.question("Give me your limit, please :", (answer) => {
    const limit = parseInt(answer);

    if (isNaN(limit)) {
        console.log("Give me a valide number please");
    } else {
        fizzBuzz(limit);
    }

    rl.close();
    console.log("Thanks.");
    });
}

function fizzBuzz(limit) {
    const numbers = Array.from({ length: limit }, (_, i) => i + 1);
    numbers.forEach((i) => {
        if (i % 3 === 0 && i % 5 === 0) {
        console.log(FIZZ_BUZZ);
        } else if (i % 3 === 0) {
        console.log(FIZZ);
        } else if (i % 5 === 0) {
        console.log(BUZZ);
        } else {
        console.log(i);
        }
    });
}

