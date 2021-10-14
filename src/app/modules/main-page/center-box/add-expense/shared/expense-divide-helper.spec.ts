import {canExtend, splitByPercent, splitEvenly} from "./expense-divide-helper";

test(`returns 500 money for 2 users,with total amount of 1000`,
  () => {
    expect(splitEvenly(2, 1000)).toBe(500);
  })


test('return 30 money for 30% with expense amount of 100',
  () => {
    expect(splitByPercent(30, 100)).toBe(30);
  })


test('return true for amount of user greater than 1 and amount greater than 0',
  () => {
    expect(canExtend(['kuba', 'kuba2'], 1)).toBe(true);
  })
