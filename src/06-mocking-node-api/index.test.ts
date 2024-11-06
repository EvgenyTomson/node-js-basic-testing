import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs');

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const testTimeout = 1000;

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, testTimeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(testTimeout);
    expect(callback).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, testTimeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(Math.ceil(testTimeout / 2));
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(Math.ceil(testTimeout / 2));
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const testInterval = 1000;

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, testInterval);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(testInterval);
    expect(callback).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, testInterval);
    expect(callback).not.toBeCalled();

    for (let i = 1; i < 5; i++) {
      jest.advanceTimersByTime(testInterval);
      expect(callback).toBeCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously('test.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedResult = 'Mocked test result';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValueOnce(mockedResult);
    const result = await readFileAsynchronously('test.txt');

    expect(result).toEqual(mockedResult);
  });
});
