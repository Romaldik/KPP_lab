function calculate(num1, num2, operation) {
    let result;

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return "Помилка: ділення на нуль!";
            }
            result = num1 / num2;
            break;
        default:
            return "Помилка: Невідома операція";
    }

    return result;
}

const userNum1 = Number(prompt("Введіть перше число:"));
const userNum2 = Number(prompt("Введіть друге число:"));
const userOp = prompt("Введіть операцію (+, -, *, /):");

const finalResult = calculate(userNum1, userNum2, userOp);

console.log(`Перше число: ${userNum1}`);
console.log(`Друге число: ${userNum2}`);
console.log(`Операція: ${userOp}`);
console.log("-----------------------");
console.log("Результат:", finalResult);

alert("Результат: " + finalResult);