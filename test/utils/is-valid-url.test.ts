import {isValidUrl} from '@/utils';

it('isValidUrl', () => {
  expect(isValidUrl('https://naver.com')).toBe(true);
  expect(isValidUrl('1234')).toBe(false);
});
