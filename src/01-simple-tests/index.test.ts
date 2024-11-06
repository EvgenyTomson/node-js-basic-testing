// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const additionResult = simpleCalculator({ a: 3, b: 6, action: Action.Add });
    expect(additionResult).toEqual(9);
  });

  test('should subtract two numbers', () => {
    const subtractionResult = simpleCalculator({
      a: 11,
      b: 5,
      action: Action.Subtract,
    });
    expect(subtractionResult).toEqual(6);
  });

  test('should multiply two numbers', () => {
    const multiplycationResult = simpleCalculator({
      a: 3,
      b: 6,
      action: Action.Multiply,
    });
    expect(multiplycationResult).toEqual(18);
  });

  test('should divide two numbers', () => {
    const divisionResult = simpleCalculator({
      a: 15,
      b: 5,
      action: Action.Divide,
    });
    expect(divisionResult).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    const exponentiationResult = simpleCalculator({
      a: 5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(exponentiationResult).toEqual(25);
  });

  test('should return null for invalid action', () => {
    const invalidActionResult = simpleCalculator({
      a: 3,
      b: 6,
      action: 'unknown',
    });
    expect(invalidActionResult).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const invalidArgumentsResult = simpleCalculator({
      a: '3',
      b: null,
      action: Action.Multiply,
    });
    expect(invalidArgumentsResult).toBeNull;
  });
});
