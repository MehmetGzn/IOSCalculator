const prevDisp = document.querySelector('.previousDisplay');
const currDisp = document.querySelector('.display');
const ac = document.querySelector('.ac');
const btnContainer = document.querySelector('.buttonsDiv');

let currentOperand = "";
let previousOperand = "";
let operation = "";

let pressedEqualOrPercent = false;

btnContainer.addEventListener('click',(e) =>{
    if(e.target.classList.contains('number')){
        appendNumber(e.target.textContent);
        updateDisplay()
        ac.textContent = "C"
    }
    if(e.target.classList.contains('operation')){
        choseOperator(e.target.textContent)
        updateDisplay()
    }
    if (e.target.classList.contains('equal')) {
        calculate();
        updateDisplay();
        ac.textContent = "AC";
        previousOperand = currentOperand.toString();
        pressedEqualOrPercent = true;
    }
    if (e.target.classList.contains('ac')) {
        previousOperand = "";
        currentOperand = "";
        operation = "";
        updateDisplay();
    }
    if (e.target.classList.contains('percent')) {
        if(!currentOperand) return;
        currentOperand = currentOperand / 100;
        updateDisplay();
        pressedEqualOrPercent = true;
    }
    if (e.target.classList.contains('pm')) {
        if(!currentOperand) return;
        currentOperand *= -1;
        updateDisplay();
    }
});

const appendNumber = (num) => {
    //to handle adding just one dot 
    if (num === "." && currentOperand.includes(".")) return
    
    if ( currentOperand === "0" && num !== ".") {
        currentOperand = num;
        return}
    //to handle not entring more then one zero at first
    if ( currentOperand === "0" && num === "0") return
    
    if( currentOperand.length > 10) return

    if (pressedEqualOrPercent) {
        currentOperand = num;
        pressedEqualOrPercent = false;
        return
    }

    currentOperand += num;
}

const updateDisplay = (num) => {
    if (currentOperand.toString().length > 11) {
        currentOperand = Number(currentOperand).toExponential(4)
    }
    currDisp.textContent = currentOperand;
    prevDisp.textContent = `${previousOperand} ${operation}`; 
}

const choseOperator = (op) => {
    if(previousOperand){
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = ""
}

const calculate = () => {
    let calculation = 0;
    const prev = Number(previousOperand);
    const current = Number(currentOperand);
    
    switch (operation) {
        case '+':
            calculation = prev + current
            break;
        case '-':
            calculation = prev - current
            break;
        case '×':
            calculation = prev * current
            break;
        case '÷':
            calculation = prev / current
            break;
        default:
            return;
    }
    currentOperand = calculation
    previousOperand = '';
    operation = '';
}