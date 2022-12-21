import './styles.css';
import { Command, Calculator } from './command';

const ac = document.querySelector('.ac');
const numbers = document.querySelectorAll('.itemNumber');
const basicOperations = document.querySelectorAll('.itemOperation');
const percent = document.querySelector('.percent');
const square = document.querySelector('.square');
const cube = document.querySelector('.cube');
const factorial = document.querySelector('.factorial');
const powerOfY = document.querySelector('.powerOfY');
const squareRoot = document.querySelector('.squareRoot');
const cubeRoot = document.querySelector('.cubeRoot');
const yRoot = document.querySelector('.yRoot');
const oneDivideX = document.querySelector('.oneDivideX');
const plusMinus = document.querySelector('.plusMinus');
const comma = document.querySelector('.comma');
const mc = document.querySelector('.mc');
const mPlus = document.querySelector('.mPlus');
const mMinus = document.querySelector('.mMinus');
const mr = document.querySelector('.mr');

const leftOperand = document.querySelector('.left');
const rightOperand = document.querySelector('.right');
const currentSign = document.querySelector('.sign');

let currentRightValue = '';
let currentLeftValue = '';
let currentOperation;
let isOperatorActive = false;

let memory = '';

const isNumberUnfit = (num) => {
  if (+num < 1000000 && num.toString().length >= 7) {
    return true;
  }
  return false;
};

const solve = (operator, operandLeft, operandRight) => {
  const command = new Command(new Calculator(+operandLeft, +operandRight));
  return command.execute([operator]);
};

const solveSingleOperand = (operation) => {
  if (rightOperand.textContent) {
    currentRightValue = solve(operation, rightOperand.textContent);

    if (isNumberUnfit(currentRightValue)) {
      currentRightValue = currentRightValue.toString().substring(0, 6);
    }

    rightOperand.textContent = currentRightValue;
    return;
  }

  if (leftOperand.textContent) {
    currentLeftValue = solve(operation, leftOperand.textContent);

    if (isNumberUnfit(currentLeftValue)) {
      currentLeftValue = currentLeftValue.toString().substring(0, 6);
    }

    leftOperand.textContent = currentLeftValue;
  }
};

const resetAfterSolving = (sign = '', isClearAll = false) => {
  isOperatorActive = !!sign;
  currentSign.textContent = sign;
  currentRightValue = '';
  rightOperand.textContent = currentRightValue;
  if (isClearAll) {
    currentLeftValue = '';
    leftOperand.textContent = currentLeftValue;
    currentSign.textContent = '';
    isOperatorActive = false;
  }
};

const handleNumberClick = (e) => {
  // if 'Bad operation' happened, clear it before inserting a new number
  if (
    leftOperand.textContent === 'Bad operation' ||
    (leftOperand.textContent === '0' && !isOperatorActive) ||
    leftOperand.textContent === 'NaN'
  ) {
    resetAfterSolving('', true);
  }

  if (isOperatorActive) {
    currentRightValue += e.currentTarget.textContent;
    rightOperand.textContent = currentRightValue;
    return;
  }

  currentLeftValue += e.target.textContent;
  leftOperand.textContent = currentLeftValue;
};

const handleOperationClick = (e) => {
  const eventSign = e.target.textContent;

  if (!leftOperand.textContent) return;

  // multiply by 2 if '=' pressed w/o 2-nd operand
  if (eventSign === '=' && !rightOperand.textContent) {
    currentLeftValue = solve(
      'sum',
      leftOperand.textContent,
      leftOperand.textContent
    );
    leftOperand.textContent = currentLeftValue;
    resetAfterSolving();
    return;
  }

  // add/change sign if no 2-nd operand
  if (!rightOperand.textContent) {
    if (eventSign === 'y√') {
      currentSign.textContent = '√';
    } else if (eventSign === 'xy') {
      currentSign.textContent = '^';
    } else {
      currentSign.textContent = eventSign;
    }

    isOperatorActive = true;
  }

  // solve a problem before inserting a new sign (+, -, /, *, =, ^)
  if (isOperatorActive && rightOperand.textContent) {
    currentLeftValue = solve(
      currentOperation,
      leftOperand.textContent,
      rightOperand.textContent
    );

    if (isNumberUnfit(currentLeftValue)) {
      currentLeftValue = currentLeftValue.toString().substring(0, 6);
    }

    leftOperand.textContent = currentLeftValue;

    // reset right operand
    if (eventSign === '=') {
      resetAfterSolving();
    } else {
      resetAfterSolving(eventSign);
    }
  }

  // word-like operation name for calculator class and solve() func
  switch (eventSign) {
    case '÷':
      currentOperation = 'divide';
      break;

    case '×':
      currentOperation = 'multiply';
      break;

    case '-':
      currentOperation = 'subtract';
      break;

    case '+':
      currentOperation = 'sum';
      break;

    case 'xy':
      currentOperation = 'powerOfY';
      break;

    case 'y√':
      currentOperation = 'yRoot';
      break;

    default:
      break;
  }
};

const handlePercentClick = () => {
  solveSingleOperand('percent');
};

const handleSquareClick = () => {
  solveSingleOperand('square');
};

const handleCubeClick = () => {
  solveSingleOperand('cube');
};

const handleFactorialClick = () => {
  solveSingleOperand('factorial');
};

const handleSquareRootClick = () => {
  solveSingleOperand('squareRoot');
};

const handleCubeRootClick = () => {
  solveSingleOperand('cubeRoot');
};

const handleOneDivideXClick = () => {
  solveSingleOperand('oneDivideX');
};

const handlePlusMinusClick = () => {
  solveSingleOperand('plusMinus');
};

const handleAcClick = () => {
  resetAfterSolving('', true);
};

const handleMcClick = () => {
  memory = '';
};

const handleMPlusClick = () => {
  if (!memory) {
    memory = currentRightValue || currentLeftValue;
  } else {
    memory = currentRightValue
      ? solve('sum', memory, currentRightValue)
      : solve('sum', memory, currentLeftValue);
  }
};

const handleMMinusClick = () => {
  memory = currentRightValue
    ? solve('subtract', memory, currentRightValue)
    : solve('subtract', memory, currentLeftValue);
};

const handleMrClick = () => {
  if (currentRightValue || isOperatorActive) {
    currentRightValue = memory;
    rightOperand.textContent = currentRightValue;
  } else {
    currentLeftValue = memory;
    leftOperand.textContent = currentLeftValue;
  }
};

basicOperations.forEach((n) => n.addEventListener('click', handleOperationClick));
numbers.forEach((n) => n.addEventListener('click', handleNumberClick));
percent.addEventListener('click', handlePercentClick);
square.addEventListener('click', handleSquareClick);
cube.addEventListener('click', handleCubeClick);
factorial.addEventListener('click', handleFactorialClick);
powerOfY.addEventListener('click', handleOperationClick);
squareRoot.addEventListener('click', handleSquareRootClick);
cubeRoot.addEventListener('click', handleCubeRootClick);
yRoot.addEventListener('click', handleOperationClick);
oneDivideX.addEventListener('click', handleOneDivideXClick);
plusMinus.addEventListener('click', handlePlusMinusClick);
comma.addEventListener('click', handleNumberClick);
ac.addEventListener('click', handleAcClick);
mc.addEventListener('click', handleMcClick);
mPlus.addEventListener('click', handleMPlusClick);
mMinus.addEventListener('click', handleMMinusClick);
mr.addEventListener('click', handleMrClick);
