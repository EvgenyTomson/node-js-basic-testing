import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 919;
  let testAccount: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    testAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(testAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => testAccount.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(0);

    expect(() => testAccount.transfer(initialBalance + 1, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => testAccount.transfer(initialBalance - 1, testAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositAmount = 51;
    testAccount.deposit(depositAmount);

    expect(testAccount.getBalance()).toEqual(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 51;
    testAccount.withdraw(withdrawAmount);

    expect(testAccount.getBalance()).toEqual(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialToBalance = 100;
    const toAccount = getBankAccount(initialToBalance);
    const transferAmount = 99;
    testAccount.transfer(transferAmount, toAccount);

    expect(toAccount.getBalance()).toEqual(initialToBalance + transferAmount);
    expect(testAccount.getBalance()).toEqual(initialBalance - transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = 80;
    (random as jest.Mock).mockReturnValueOnce(fetchedBalance);
    const balance = await testAccount.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 80;
    (random as jest.Mock).mockReturnValueOnce(fetchedBalance);
    await testAccount.synchronizeBalance();

    expect(testAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(0).mockReturnValueOnce(0);

    await expect(testAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
