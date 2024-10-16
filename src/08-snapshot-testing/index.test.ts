import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expectedResult = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    const actualResult = generateLinkedList([1, 2, 3]);

    expect(actualResult).toStrictEqual(expectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const actualResult = generateLinkedList([4, 5, 6]);

    expect(actualResult).toMatchSnapshot();
  });
});
