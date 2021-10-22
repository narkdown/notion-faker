import {createFaker} from '@/create-faker';

let faker: Record<string, Faker.FakerStatic>;

beforeAll(() => {
  const seedValue = 1;

  faker = {
    default: createFaker({
      seedValue,
    }),
    en: createFaker({
      seedValue,
      locale: 'en',
    }),
    ko: createFaker({
      seedValue,
      locale: 'ko',
    }),
  };
});

describe('createFaker', () => {
  it('return different faker instance', () => {
    expect(faker.default).not.toBe(faker.en);
    expect(faker.default).not.toBe(faker.ko);
    expect(faker.ko).not.toBe(faker.en);
  });

  it('default locale is en', () => {
    expect(faker.default.locale).toEqual('en');
  });

  it('when given locale, then return locale value', () => {
    const words = faker.ko.lorem.words();

    expect(words).toEqual('또는 가진다. 국가는');
  });
});
