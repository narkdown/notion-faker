import {createFaker} from '@/create-faker';
import * as Database from '@/database';
import type {TextValue} from '@/value-fakers';

describe('Database.TitleFaker', () => {
  let faker: Faker.FakerStatic;

  beforeEach(() => {
    faker = createFaker();
  });

  it('return TextValue[]', () => {
    const titleFaker: Database.TitleFaker = Database.title(faker);
    const textValue: TextValue = titleFaker()()()[0];

    expect(textValue.type).toBe('text');
    expect(typeof textValue.text.content).toBe('string');
  });
});

describe('Database.PropertyFakers', () => {
  it('has all PropertyType keys', () => {
    const propertyFakers: Database.PropertyFakers = Database.properties;

    for (const propertyKey of Database.SUPPORTED_PROPERTIES) {
      expect(propertyFakers).toHaveProperty(propertyKey);
    }
  });
});

describe('Each property key of Database.PropertyFakers', () => {
  let propertyFakers: Database.PropertyFakers;

  beforeAll(() => {
    propertyFakers = Database.properties;
  });

  it('title', () => {
    const titlePropertyValue: Database.PropertyValueOf<'title'> =
      propertyFakers.title();
    expect(titlePropertyValue.type).toEqual('title');
    expect(titlePropertyValue.title).toEqual({});
  });

  it('rich_text', () => {
    const rich_textPropertyValue: Database.PropertyValueOf<'rich_text'> =
      propertyFakers.rich_text();
    expect(rich_textPropertyValue.type).toEqual('rich_text');
    expect(rich_textPropertyValue.rich_text).toEqual({});
  });

  it('number', () => {
    const numberPropertyValue: Database.PropertyValueOf<'number'> =
      propertyFakers.number();
    expect(numberPropertyValue.type).toEqual('number');
    expect(numberPropertyValue.number).toEqual({});
  });

  it('select', () => {
    const selectPropertyValue: Database.PropertyValueOf<'select'> =
      propertyFakers.select();
    expect(selectPropertyValue.type).toEqual('select');
    expect(selectPropertyValue.select).toEqual({});
  });

  it('multi_select', () => {
    const multi_selectPropertyValue: Database.PropertyValueOf<'multi_select'> =
      propertyFakers.multi_select();
    expect(multi_selectPropertyValue.type).toEqual('multi_select');
    expect(multi_selectPropertyValue.multi_select).toEqual({});
  });

  it('date', () => {
    const datePropertyValue: Database.PropertyValueOf<'date'> =
      propertyFakers.date();
    expect(datePropertyValue.type).toEqual('date');
    expect(datePropertyValue.date).toEqual({});
  });

  it('files', () => {
    const filesPropertyValue: Database.PropertyValueOf<'files'> =
      propertyFakers.files();
    expect(filesPropertyValue.type).toEqual('files');
    expect(filesPropertyValue.files).toEqual({});
  });

  it('checkbox', () => {
    const checkboxPropertyValue: Database.PropertyValueOf<'checkbox'> =
      propertyFakers.checkbox();
    expect(checkboxPropertyValue.type).toEqual('checkbox');
    expect(checkboxPropertyValue.checkbox).toEqual({});
  });

  it('url', () => {
    const urlPropertyValue: Database.PropertyValueOf<'url'> =
      propertyFakers.url();
    expect(urlPropertyValue.type).toEqual('url');
    expect(urlPropertyValue.url).toEqual({});
  });

  it('email', () => {
    const emailPropertyValue: Database.PropertyValueOf<'email'> =
      propertyFakers.email();
    expect(emailPropertyValue.type).toEqual('email');
    expect(emailPropertyValue.email).toEqual({});
  });

  it('phone_number', () => {
    const phone_numberPropertyValue: Database.PropertyValueOf<'phone_number'> =
      propertyFakers.phone_number();
    expect(phone_numberPropertyValue.type).toEqual('phone_number');
    expect(phone_numberPropertyValue.phone_number).toEqual({});
  });

  it('formula', () => {
    const formulaPropertyValue: Database.PropertyValueOf<'formula'> =
      propertyFakers.formula();
    expect(formulaPropertyValue.type).toEqual('formula');
    expect(formulaPropertyValue.formula).toEqual({});
  });

  it('relation', () => {
    const relationPropertyValue: Database.PropertyValueOf<'relation'> =
      propertyFakers.relation({database_id: '1234'});
    expect(relationPropertyValue.type).toEqual('relation');
    expect(relationPropertyValue.relation).toEqual({database_id: '1234'});
  });

  it('rollup', () => {
    const rollupPropertyValue: Database.PropertyValueOf<'rollup'> =
      propertyFakers.rollup({
        rollup_property_name: 'hello',
        relation_property_name: 'world',
        function: 'count',
      });
    expect(rollupPropertyValue.type).toEqual('rollup');
    expect(rollupPropertyValue.rollup).toEqual({
      rollup_property_name: 'hello',
      relation_property_name: 'world',
      function: 'count',
    });
  });

  it('people', () => {
    const peoplePropertyValue: Database.PropertyValueOf<'people'> =
      propertyFakers.people();
    expect(peoplePropertyValue.type).toEqual('people');
    expect(peoplePropertyValue.people).toEqual({});
  });

  it('created_by', () => {
    const created_byPropertyValue: Database.PropertyValueOf<'created_by'> =
      propertyFakers.created_by();
    expect(created_byPropertyValue.type).toEqual('created_by');
    expect(created_byPropertyValue.created_by).toEqual({});
  });

  it('created_time', () => {
    const created_timePropertyValue: Database.PropertyValueOf<'created_time'> =
      propertyFakers.created_time();
    expect(created_timePropertyValue.type).toEqual('created_time');
    expect(created_timePropertyValue.created_time).toEqual({});
  });

  it('last_edited_by', () => {
    const last_edited_byPropertyValue: Database.PropertyValueOf<'last_edited_by'> =
      propertyFakers.last_edited_by();
    expect(last_edited_byPropertyValue.type).toEqual('last_edited_by');
    expect(last_edited_byPropertyValue.last_edited_by).toEqual({});
  });

  it('last_edited_time', () => {
    const last_edited_timePropertyValue: Database.PropertyValueOf<'last_edited_time'> =
      propertyFakers.last_edited_time();
    expect(last_edited_timePropertyValue.type).toEqual('last_edited_time');
    expect(last_edited_timePropertyValue.last_edited_time).toEqual({});
  });
});
