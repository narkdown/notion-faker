import {isUndefined} from '@/utils';

it('isUndefined', () => {
  const undefinedValue = undefined;
  const notUndefinedValue = !undefined;

  expect(isUndefined(undefinedValue)).toBe(true);
  expect(isUndefined(notUndefinedValue)).toBe(false);
});
