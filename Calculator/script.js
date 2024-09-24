const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            handleInput(value);
        }
    });
});

function handleInput(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    } else {
        currentInput += value;
    }
    updateDisplay(currentInput);
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.value = value;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('');
}
