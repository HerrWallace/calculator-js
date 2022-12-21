/* eslint-disable no-undef */
import { Command, Calculator } from './command';

const solve = (operator, operandLeft, operandRight) => {
  const command = new Command(new Calculator(+operandLeft, +operandRight));
  return command.execute([operator]);
};

describe('basic operations', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(solve('sum', 1, 2)).toBe(3);
  });

  test('subtracts 110 - 68 to equal 42', () => {
    expect(solve('subtract', 110, 68)).toBe(42);
  });

  test('divides 625 / 125 to equal 5', () => {
    expect(solve('divide', 625, 125)).toBe(5);
  });

  test('multiplies 81 * 9 to equal 729', () => {
    expect(solve('multiply', 81, 9)).toBe(729);
  });
});

describe('other operations with 2 operands', () => {
  test('powers 2 ^ 5 to equal 32', () => {
    expect(solve('powerOfY', 2, 5)).toBe(32);
  });
  test('y root 49 ^ 1/2 to be 7', () => {
    expect(solve('yRoot', 2, 49)).toBe(7);
  });

  test('y root 64 ^ 1/3 to equal 4', () => {
    expect(solve('yRoot', 3, 64)).toBe(4);
  });
});

describe('one operand operations', () => {
  test('percent 42% to equal 0.42', () => {
    expect(solve('percent', 42)).toBe(0.42);
  });

  test('percent 7% to equal 0.07', () => {
    expect(solve('percent', 7)).toBe(0.07);
  });

  test('square 15 ^ 2 to equal 225', () => {
    expect(solve('square', 15)).toBe(225);
  });

  test('cube 15 ^ 3 to equal 3375', () => {
    expect(solve('cube', 15)).toBe(3375);
  });

  test('factorial 5! to equal 120', () => {
    expect(solve('factorial', 5)).toBe(120);
  });

  test('square root 81 to equal 9', () => {
    expect(solve('squareRoot', 81)).toBe(9);
  });

  test('cube root 64 to equal 4', () => {
    expect(solve('cubeRoot', 64)).toBe(4);
  });

  test('1 / x, 1 / 3 to equal', () => {
    expect(solve('oneDivideX', 3)).toBe(0.333);
  });

  test('plus/minus, 2 to equal -2', () => {
    expect(solve('plusMinus', 2)).toBe(-2);
  });
});
