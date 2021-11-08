import type {Get} from 'type-fest';
import {text, TextFaker, TextValue, TextOptions} from '@/value-fakers';
import {createFaker} from '@/create-faker';
import type {MethodPaths} from '@/types';

let faker: Faker.FakerStatic;
let textFaker: TextFaker;

beforeEach(() => {
  faker = createFaker();
  textFaker = text(faker);
});

describe('TextFaker', () => {
  it('is function', () => {
    expect(typeof textFaker).toBe('function');
  });

  it('return TextValue', () => {
    const textValue: TextValue = textFaker()()();

    expect(textValue.type).toBe('text');
    expect(typeof textValue.text.content).toBe('string');
  });

  it('use faker.lorem.words (default)', () => {
    const textValue: TextValue = textFaker()()();

    expect(textValue.text.content.split(' ').length).toBe(3);
  });

  it("can take MethodPath['text'] and Parameters<Get<Faker.FakerStatic, MethodPath>> and TextOptions", () => {
    const methodPath: MethodPaths['text'] = 'internet.email' as const;
    const args: Parameters<Get<Faker.FakerStatic, 'internet.email'>> = [
      'hello',
      'world',
    ];
    const options: TextOptions = {
      annotations: {
        bold: true,
      },
    };
    const textValue: TextValue = textFaker(methodPath)(...args)(options);

    expect(
      textValue.text.content.includes('hello') ||
        textValue.text.content.includes('world'),
    ).toBeTruthy();
    expect(textValue.annotations?.bold).toBe(true);
  });
});
