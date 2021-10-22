import {Get} from 'type-fest';
import {external, ExternalFaker, ExternalValue} from '@/value-fakers';
import {createFaker} from '@/create-faker';
import {MethodPaths} from '@/types';

let faker: Faker.FakerStatic;
let externalFaker: ExternalFaker;

beforeEach(() => {
  faker = createFaker();
  externalFaker = external(faker);
});

describe('ExternalFaker', () => {
  it('is function', () => {
    expect(typeof externalFaker).toBe('function');
  });

  it('return ExternalValue', () => {
    const externalValue: ExternalValue = externalFaker()();

    expect(externalValue.type).toBe('external');
    expect(typeof externalValue.external.url).toBe('string');
  });

  it('use faker.image.avatar (default)', () => {
    const externalValue: ExternalValue = externalFaker()();

    expect(externalValue.external.url).toContain('avatars');
  });

  it("can take MethodPath['image'] and Parameters<Get<Faker.FakerStatic, MethodPath>>", () => {
    const methodPath: MethodPaths['image'] = 'image.food' as const;
    const args: Parameters<Get<Faker.FakerStatic, 'image.food'>> = [120, 720];
    const externalValue: ExternalValue = externalFaker(methodPath)(...args);

    expect(externalValue.external.url).toContain('food');
    expect(externalValue.external.url).toContain('120');
    expect(externalValue.external.url).toContain('720');
  });
});
