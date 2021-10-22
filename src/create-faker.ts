/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unicorn/prefer-module */
import FakerConstructor from 'faker/lib';

export function createFaker(options?: {
  locale?: string;
  seedValue?: number;
}): Faker.FakerStatic {
  const {locale = 'en', seedValue} = options ?? {};

  const faker: Faker.FakerStatic = new FakerConstructor({
    locale,
    locales: {
      [locale]: require(`faker/lib/locales/${locale}`),
    },
  });

  if (typeof seedValue !== 'undefined') {
    faker.seed(seedValue);
  }

  return faker;
}
