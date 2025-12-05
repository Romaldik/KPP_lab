const userInput = prompt("Введите число, до которого нужно найти кратные 5:");

const maxNumber = Number(userInput);

let hasNumbers = false;

for (let i = 0; i <= maxNumber; i++) {
    if (i % 5 === 0) {
        console.log(i); 
        hasNumbers = true; 
    }
}

if (!hasNumbers) {
    console.log('Sorry, no numbers');
}