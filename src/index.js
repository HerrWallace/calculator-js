import './styles.scss';
import Command from './classes/command';
import EventsHandler from './classes/eventsHandler';

const calculator = document.querySelector('.calculator');

const leftOperand = document.querySelector('.left');
const rightOperand = document.querySelector('.right');
const currentSign = document.querySelector('.sign');

let statusData = {
  leftOperand: '',
  rightOperand: '',
  currentSign: '',
  currentRightValue: '',
  currentLeftValue: '',
  currentOperation: '',
  isOperatorActive: false,
  memory: '',
  memoryOperation: '',
};

const updateOutput = () => {
  leftOperand.textContent = statusData.leftOperand;
  rightOperand.textContent = statusData.rightOperand;
  currentSign.textContent = statusData.currentSign;
};

const numberClick = (e) => {
  const handler = new Command(new EventsHandler(statusData, e));

  statusData = handler.execute('numberClick');
  updateOutput();
};

const operationClick = (e) => {
  const handler = new Command(new EventsHandler(statusData, e));

  statusData = handler.execute('operationClick');
  updateOutput();
};

const oneOperandClick = (operation, e) => {
  statusData.oneOperandOperation = operation;
  const handler = new Command(new EventsHandler(statusData, e));

  statusData = handler.execute('solveSingleOperand');
  updateOutput();
};

const memoryClick = (operation, e) => {
  statusData.memoryOperation = operation;
  const handler = new Command(new EventsHandler(statusData, e));

  statusData = handler.execute('memoryClick');
  updateOutput();
};

const acClick = () => {
  const handler = new Command(new EventsHandler(statusData));

  statusData = handler.execute('reset');
  updateOutput();
};

const handleClick = (e) => {
  const arrayClassName = e.target.className.split(' ');

  if (arrayClassName[0] === 'ac') {
    acClick();
    return;
  }

  if (arrayClassName[1] === 'itemNumber') {
    numberClick(e);
    return;
  }

  if (arrayClassName[1] === 'itemOperation') {
    operationClick(e);
    return;
  }

  if (arrayClassName[1] === 'memory') {
    memoryClick(arrayClassName[2], e);
    return;
  }

  oneOperandClick(arrayClassName[1], e);
};

calculator.addEventListener('click', handleClick);
