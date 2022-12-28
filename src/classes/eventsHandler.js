/* eslint-disable class-methods-use-this */
import Command from './command';
import Calculator from './calculator';

class EventsHandler {
  constructor(statusData, event) {
    this.leftOperand = statusData.leftOperand;
    this.rightOperand = statusData.rightOperand;
    this.currentSign = statusData.currentSign;
    this.currentRightValue = statusData.currentRightValue;
    this.currentLeftValue = statusData.currentLeftValue;
    this.currentOperation = statusData.currentOperation;
    this.isOperatorActive = statusData.isOperatorActive;
    this.memory = statusData.memory;
    this.memoryOperation = statusData.memoryOperation;
    this.oneOperandOperation = statusData.oneOperandOperation;

    this.event = event;
  }

  combineStatus() {
    return {
      leftOperand: this.leftOperand,
      rightOperand: this.rightOperand,
      currentSign: this.currentSign,
      currentRightValue: this.currentRightValue,
      currentLeftValue: this.currentLeftValue,
      currentOperation: this.currentOperation,
      isOperatorActive: this.isOperatorActive,
      memory: this.memory,
    };
  }

  isNumberUnfit(num) {
    if (+num < 1000000 && num.toString().length >= 7) {
      return true;
    }
    return false;
  }

  solve(operator, operandLeft, operandRight) {
    const command = new Command(new Calculator(+operandLeft, +operandRight));
    return command.execute([operator]);
  }

  resetAfterSolving(sign = '', isClearAll = true) {
    this.isOperatorActive = !!sign;
    this.currentSign = sign;
    this.currentRightValue = '';
    this.rightOperand = this.currentRightValue;
    if (isClearAll) {
      this.currentLeftValue = '';
      this.leftOperand = this.currentLeftValue;
      this.currentSign = '';
      this.isOperatorActive = false;
    }
  }

  reset() {
    this.resetAfterSolving();
    return this.combineStatus();
  }

  numberClick() {
    if (
      this.leftOperand === 'Bad operation' ||
      (this.leftOperand === '0' && !this.isOperatorActive) ||
      this.leftOperand === 'NaN'
    ) {
      this.resetAfterSolving('');
    }

    if (this.isOperatorActive) {
      this.currentRightValue += this.event.target.textContent;
      this.rightOperand = this.currentRightValue;
      return this.combineStatus();
    }

    this.currentLeftValue += this.event.target.textContent;
    this.leftOperand = this.currentLeftValue;
    return this.combineStatus();
  }

  operationClick() {
    const eventSign = this.event.target.textContent;

    if (!this.leftOperand) return this.combineStatus();

    // multiply by 2 if '=' pressed w/o 2-nd operand
    if (eventSign === '=' && !this.rightOperand) {
      this.currentLeftValue = this.solve('sum', this.leftOperand, this.leftOperand);
      this.leftOperand = this.currentLeftValue;
      this.resetAfterSolving('', false);
      return this.combineStatus();
    }

    // add/change sign if no 2-nd operand
    if (!this.rightOperand) {
      if (eventSign === 'y√') {
        this.currentSign = '√';
      } else if (eventSign === 'xy') {
        this.currentSign = '^';
      } else {
        this.currentSign = eventSign;
      }
      this.isOperatorActive = true;
    }

    // solve a problem before inserting a new sign (+, -, /, *, =, ^)
    if (this.isOperatorActive && this.rightOperand) {
      this.currentLeftValue = this.solve(
        this.currentOperation,
        this.leftOperand,
        this.rightOperand
      );

      if (this.isNumberUnfit(this.currentLeftValue)) {
        this.currentLeftValue = this.currentLeftValue.toString().substring(0, 6);
      }

      this.leftOperand = this.currentLeftValue;

      // reset right operand
      if (eventSign === '=') {
        this.resetAfterSolving('', false);
      } else {
        this.resetAfterSolving(eventSign, false);
      }
    }

    // word-like operation name for calculator class and solve() func
    switch (eventSign) {
      case '÷':
        this.currentOperation = 'divide';
        break;

      case '×':
        this.currentOperation = 'multiply';
        break;

      case '-':
        this.currentOperation = 'subtract';
        break;

      case '+':
        this.currentOperation = 'sum';
        break;

      case 'xy':
        this.currentOperation = 'powerOfY';
        break;

      case 'y√':
        this.currentOperation = 'yRoot';
        break;

      default:
        break;
    }
    return this.combineStatus();
  }

  solveSingleOperand() {
    if (this.rightOperand) {
      this.currentRightValue = this.solve(
        this.oneOperandOperation,
        this.rightOperand
      );

      if (this.isNumberUnfit(this.currentRightValue)) {
        this.currentRightValue = this.currentRightValue.toString().substring(0, 6);
      }

      this.rightOperand = this.currentRightValue;
      return this.combineStatus();
    }

    if (this.leftOperand) {
      this.currentLeftValue = this.solve(this.oneOperandOperation, this.leftOperand);

      if (this.isNumberUnfit(this.currentLeftValue)) {
        this.currentLeftValue = this.currentLeftValue.toString().substring(0, 6);
      }

      this.leftOperand = this.currentLeftValue;
    }
    return this.combineStatus();
  }

  memoryClick() {
    if (this.memoryOperation === 'mc') {
      this.memory = '';
      return this.combineStatus();
    }

    if (this.memoryOperation === 'mPlus') {
      if (!this.memory) {
        this.memory = this.currentRightValue || this.currentLeftValue;
      } else {
        this.memory = this.currentRightValue
          ? this.solve('sum', this.memory, this.currentRightValue)
          : this.solve('sum', this.memory, this.currentLeftValue);
      }
      return this.combineStatus();
    }

    if (this.memoryOperation === 'mMinus') {
      this.memory = this.currentRightValue
        ? this.solve('subtract', this.memory, this.currentRightValue)
        : this.solve('subtract', this.memory, this.currentLeftValue);
      return this.combineStatus();
    }

    if (this.memoryOperation === 'mr') {
      if (this.currentRightValue || this.isOperatorActive) {
        this.currentRightValue = this.memory;
        this.rightOperand = this.currentRightValue;
      } else {
        this.currentLeftValue = this.memory;
        this.leftOperand = this.currentLeftValue;
      }
      return this.combineStatus();
    }
    return this.combineStatus();
  }
}

export default EventsHandler;
