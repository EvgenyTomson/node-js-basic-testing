import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 9, b: 3, action: Action.Subtract, expected: 6 },
  { a: 2, b: 1, action: Action.Multiply, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 9, b: 3, action: Action.Multiply, expected: 27 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 3, b: 2, action: 'incorrect action', expected: null },
  { a: 'incorrect argument', b: 3, action: Action.Add, expected: null },
  { a: 2, b: 'incorrect argument', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b = $expected',
    ({ expected, ...calculatorArgs }) => {
      expect(simpleCalculator(calculatorArgs)).toBe(expected);
    },
  );
});
