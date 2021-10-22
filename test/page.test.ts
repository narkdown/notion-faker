import {createFaker} from '@/create-faker';
import {SELECT_PROPERTY_COLORS, TextValue} from '@/value-fakers';
import * as Page from '@/page';

let faker: Faker.FakerStatic;

beforeEach(() => {
  faker = createFaker();
});

describe('Page.PropertyFakers', () => {
  it('when given faker, then return PropertiesFaker', () => {
    const propertyFakers: Page.PropertyFakers = Page.properties(faker);
    expect(typeof propertyFakers).toBe('object');

    for (const propertyKey of Page.SUPPORTED_PROPERTIES) {
      expect(propertyFakers).toHaveProperty(propertyKey);
    }

    expect(propertyFakers).toHaveProperty('propertiesByScheme');
  });
});

describe('Each property key of Page.PropertyFakers', () => {
  let propertyFakers: Page.PropertyFakers;

  beforeEach(() => {
    propertyFakers = Page.properties(faker);
  });

  it('title', () => {
    const titlePropertyValue: Page.PropertyValueOf<'title'> =
      propertyFakers.title()()();
    expect(titlePropertyValue.type).toEqual('title');
    expect(titlePropertyValue).toHaveProperty('title');

    const textValue = titlePropertyValue.title[0] as TextValue;

    expect(textValue.type).toBe('text');
    expect(typeof textValue.text.content).toBe('string');
  });

  it('rich_text', () => {
    const richTextPropertyValue: Page.PropertyValueOf<'rich_text'> =
      propertyFakers.rich_text()()();
    expect(richTextPropertyValue.type).toBe('rich_text');
    expect(richTextPropertyValue).toHaveProperty('rich_text');

    const textValue = richTextPropertyValue.rich_text[0] as TextValue;

    expect(textValue.type).toBe('text');
    expect(typeof textValue.text.content).toBe('string');
  });

  it('number', () => {
    const numberPropertyValue: Page.PropertyValueOf<'number'> =
      propertyFakers.number()();
    expect(numberPropertyValue.type).toBe('number');
    expect(numberPropertyValue).toHaveProperty('number');
    expect(typeof numberPropertyValue.number).toBe('number');
  });

  it('select', () => {
    const selectPropertyValue: Page.PropertyValueOf<'select'> =
      propertyFakers.select()()();
    expect(selectPropertyValue.type).toBe('select');
    expect(selectPropertyValue).toHaveProperty('select');
    expect(selectPropertyValue.select).toHaveProperty('name');
    expect(selectPropertyValue.select).toHaveProperty('color');
    expect(typeof selectPropertyValue.select?.name).toBe('string');
    expect(SELECT_PROPERTY_COLORS).toContain(selectPropertyValue.select?.color);
  });

  it('multi_select', () => {
    const multiSelectPropertyValue: Page.PropertyValueOf<'multi_select'> =
      propertyFakers.multi_select()()();
    expect(multiSelectPropertyValue.type).toBe('multi_select');
    expect(multiSelectPropertyValue.multi_select[0]).toHaveProperty('name');
    expect(multiSelectPropertyValue.multi_select[0]).toHaveProperty('color');
    expect(multiSelectPropertyValue.multi_select[0]).toHaveProperty('color');
    expect(typeof multiSelectPropertyValue.multi_select[0]?.name).toBe(
      'string',
    );
    expect(SELECT_PROPERTY_COLORS).toContain(
      multiSelectPropertyValue.multi_select[0]?.color,
    );
  });

  it('date', () => {
    const datePropertyValue: Page.PropertyValueOf<'date'> =
      propertyFakers.date()()();
    expect(datePropertyValue.type).toBe('date');
    expect(datePropertyValue).toHaveProperty('date');
    expect(datePropertyValue.date).toHaveProperty('start');
    expect(typeof datePropertyValue.date?.start).toBe('string');
  });

  it('files', () => {
    const filesPropertyValue: Page.PropertyValueOf<'files'> =
      propertyFakers.files()()();
    expect(filesPropertyValue.type).toBe('files');
    expect(filesPropertyValue).toHaveProperty('files');

    expect(filesPropertyValue.files[0]).toHaveProperty('name');
    expect(typeof filesPropertyValue.files[0].name).toBe('string');

    expect(filesPropertyValue.files[0].type).toBe('external');
    // @ts-expect-error Page.PropertyValueOf<'files'>[number] may not have external.
    expect(typeof filesPropertyValue.files[0].external.url).toBe('string');
  });

  it('checkbox', () => {
    const checkboxPropertyValue: Page.PropertyValueOf<'checkbox'> =
      propertyFakers.checkbox();
    expect(checkboxPropertyValue.type).toBe('checkbox');
    expect(checkboxPropertyValue).toHaveProperty('checkbox');
    expect(typeof checkboxPropertyValue.checkbox).toBe('boolean');
  });

  it('url', () => {
    const urlPropertyValue: Page.PropertyValueOf<'url'> = propertyFakers.url();
    expect(urlPropertyValue.type).toBe('url');
    expect(urlPropertyValue).toHaveProperty('url');
    expect(typeof urlPropertyValue.url).toBe('string');
  });

  it('email', () => {
    const emailPropertyValue: Page.PropertyValueOf<'email'> =
      propertyFakers.email();
    expect(emailPropertyValue.type).toBe('email');
    expect(emailPropertyValue).toHaveProperty('email');
    expect(typeof emailPropertyValue.email).toBe('string');
  });

  it('phone_number', () => {
    const phoneNumberPropertyValue: Page.PropertyValueOf<'phone_number'> =
      propertyFakers.phone_number()();
    expect(phoneNumberPropertyValue.type).toBe('phone_number');
    expect(phoneNumberPropertyValue).toHaveProperty('phone_number');
    expect(typeof phoneNumberPropertyValue.phone_number).toBe('string');
  });
});
