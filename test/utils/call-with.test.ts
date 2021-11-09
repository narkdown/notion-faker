import {callWith} from '@/utils';

it('callWith', () => {
  const sum = (a: number, b: number): number => a + b;

  expect(callWith(sum, 1, 2)).toBe(3);
});
