export class Command {
  constructor(subject) {
    this.subject = subject;
  }

  execute(command) {
    return this.subject[command]();
  }
}

export class Calculator {
  constructor(leftNum = false, rightNum = false) {
    this.leftNum = leftNum;
    this.rightNum = rightNum;
  }

  sum() {
    return this.leftNum + this.rightNum;
  }

  subtract() {
    return this.leftNum - this.rightNum;
  }

  multiply() {
    return this.leftNum * this.rightNum;
  }

  divide() {
    return this.rightNum === 0 ? 'Bad operation' : this.leftNum / this.rightNum;
  }

  percent() {
    return this.leftNum === 0
      ? 0
      : Number((this.leftNum / 100).toFixed(2).toString());
  }

  square() {
    return this.leftNum * this.leftNum;
  }

  cube() {
    return this.leftNum ** 3;
  }

  powerOfY() {
    return this.leftNum ** this.rightNum;
  }

  factorial() {
    let result = 1;
    for (let i = 1; i <= this.leftNum; i += 1) {
      result *= i;
    }
    return result;
  }

  squareRoot() {
    return this.leftNum > 0
      ? this.leftNum ** (1 / 2)
      : (0 - this.leftNum) ** (1 / 2);
  }

  cubeRoot() {
    return Number((this.leftNum ** (1 / 3)).toFixed(2));
  }

  yRoot() {
    return Number((this.rightNum ** (1 / this.leftNum)).toFixed(2));
  }

  oneDivideX() {
    return Number((1 / this.leftNum).toFixed(3));
  }

  plusMinus() {
    return 0 - this.leftNum;
  }
}
