import type {Get} from 'type-fest';
import {
  selectOption,
  SelectOptionFaker,
  SelectOptionValue,
  SELECT_PROPERTY_COLORS,
} from '@/value-fakers';
import {createFaker} from '@/create-faker';
import type {MethodPaths} from '@/types';

let faker: Faker.FakerStatic;
let selectOptionFaker: SelectOptionFaker;

beforeEach(() => {
  faker = createFaker();
  selectOptionFaker = selectOption(faker);
});

describe('SelectOptionFaker', () => {
  it('is function', () => {
    expect(typeof selectOptionFaker).toBe('function');
  });

  it('return SelectOptionValue', () => {
    const selectOptionValue: SelectOptionValue = selectOptionFaker()();

    expect(typeof selectOptionValue.name).toBe('string');
    expect(SELECT_PROPERTY_COLORS).toContain(selectOptionValue.color);
  });

  it('use faker.lorem.words (default)', () => {
    const selectOptionValue: SelectOptionValue = selectOptionFaker()();

    expect(selectOptionValue.name.split(' ').length).toBe(3);
  });

  it("can take MethodPath['text'] and Parameters<Get<Faker.FakerStatic, MethodPath>>", () => {
    const methodPath: MethodPaths['text'] = 'internet.email' as const;
    const args: Parameters<Get<Faker.FakerStatic, 'internet.email'>> = [
      'hello',
      'world',
    ];
    const selectOptionValue: SelectOptionValue = selectOptionFaker(methodPath)(
      ...args,
    );

    expect(
      selectOptionValue.name.includes('hello') ||
        selectOptionValue.name.includes('world'),
    ).toBeTruthy();
  });
});
