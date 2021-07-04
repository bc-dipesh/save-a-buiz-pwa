// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@jest/globals';
import {
  isUserLoggedIn,
  numFormatter,
  calculateProgress,
  isUserAdmin,
  differenceFromCurrentDate,
} from '../utils/commonFunctions';

test('formats number', () => {
  expect(numFormatter(1000)).toBe('1.0K');
});

test('calculates progress', () => {
  expect(calculateProgress(50, 100)).toBe(50);
});

test('identifies user is logged in', () => {
  expect(
    isUserLoggedIn({
      token: 'test token',
      user: {
        name: 'test user',
      },
    })
  ).toBe(true);
});

test('identifies user is admin', () => {
  expect(
    isUserAdmin({
      token: 'test token',
      user: {
        name: 'test user',
        isAdmin: true,
      },
    })
  ).toBe(true);
});

test('calculates difference from current date', () => {
  expect(differenceFromCurrentDate(new Date())).toBe(0);
});
