const screen = document.querySelector('.screen');
let screenContent = document.querySelector('.screenContent');
const buttons = document.querySelectorAll('.button');
let result = document.querySelector('.result');

let displayValue = '';

let firstNumber = null;
let secondNumber = null;
let sum = null;
let operator = '';


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}


function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'invalid';
    }
}



function populateDisplay(value) {
    screenContent.textContent += value.replace(/\D/g, '');

}

function getDisplayValue(value) {
    displayValue += value.replace(/\D/g, '');
    //console.log(displayValue);
}

buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        result.textContent = '';
        populateDisplay(e.target.id);
        getDisplayValue(e.target.id);
        if (e.target.id == 'clr') {
            firstNumber = null;
            secondNumber = null;
            sum = null;
            screenContent.textContent = '';
            result.textContent = '';
            displayValue = '';
            operator = null;
        }

        else if (e.target.id == '+' ||
            e.target.id == '-' ||
            e.target.id == '*' ||
            e.target.id == '/') {    
            if (operator == '=') {

                //After pressing the equals button, if I press the number buttons, reset everything and start again.
                if (displayValue != '') {
                    console.log(displayValue);
                    firstNumber = +displayValue;
                    operator = e.target.id;
                    result.textContent = '';
                    screenContent.textContent = '';
                    displayValue = '';

                 //If I press the operator buttons.   
                } else {
                    firstNumber = sum;
                    operator = e.target.id;
                }


            }
            else {
                //Set the first number if it's empty.
                if (firstNumber == null || firstNumber == '') {
                    firstNumber = +displayValue;
                    screenContent.textContent = "";
                    displayValue = '';
                    operator = e.target.id;
                } else {
                    const localOperator = e.target.id;
                    secondNumber = +displayValue;
                    if (secondNumber == 0 && operator == '/') {
                        result.textContent = 'Division by zero is undefined';
                        screenContent.textContent = '';
                        firstNumber = null;
                        secondNumber = null;
                        displayValue = '';
                        sum = null;
                    } else {
                        sum = operate(operator, firstNumber, secondNumber);
                        result.textContent = `The result is: ${sum}`;
                        operator = localOperator;
                        firstNumber = sum;
                        screenContent.textContent = "";
                        displayValue = '';
                    }

                }
            }
        }

        if (e.target.id == '=') {
            secondNumber = +displayValue;
            if (secondNumber == 0 && operator == '/') {
                result.textContent = 'Division by zero is undefined';
                screenContent.textContent = '';
                firstNumber = null;
                secondNumber = null;
                displayValue = '';
                sum = null;
            } else {
                sum = operate(operator, firstNumber, secondNumber);
                firstNumber = sum;
                result.textContent = `The result is: ${sum}`;
                screenContent.textContent = '';
                operator = '=';
                secondNumber = null;
                displayValue = '';
            }


        }




    })
})
