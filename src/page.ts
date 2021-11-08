import type {
  CreatePageParameters,
  GetDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type {Get, ValueOf} from 'type-fest';
import {get, callWith} from './utils';
import type {PropertyType as DatabasePropertyType} from './database';
import type {MethodPaths} from './types';
import {external, selectOption, text, TextOptions} from './value-fakers';

export type AllPropertyValue = Extract<
  CreatePageParameters,
  {
    parent: Record<'database_id', unknown>;
  }
>['properties'];

export type PropertyValue = Extract<
  Required<ValueOf<AllPropertyValue>>,
  {type: DatabasePropertyType}
>;

export type PropertyType = Exclude<
  PropertyValue['type'],
  'relation' | 'people'
>;

export type PropertyValueOf<PropertyKey extends PropertyType> = Extract<
  PropertyValue,
  {type: PropertyKey}
>;

export type PropertyOptions = {
  title: TextOptions;

  rich_text: TextOptions;

  select: Extract<
    ValueOf<GetDatabaseResponse['properties']>,
    {type?: 'select'}
  >['select']['options'];

  multi_select: Extract<
    ValueOf<GetDatabaseResponse['properties']>,
    {type?: 'multi_select'}
  >['multi_select']['options'];

  date: {
    includeEndDate?: boolean;
  };

  files: {
    fileCount?: number;
  };
};

export type PropertyFakers = {
  title: <MethodPath extends MethodPaths['text']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (options?: PropertyOptions['title']) => PropertyValueOf<'title'>;

  rich_text: <MethodPath extends MethodPaths['text']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (options?: PropertyOptions['rich_text']) => PropertyValueOf<'rich_text'>;

  number: <MethodPath extends MethodPaths['number']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => PropertyValueOf<'number'>;

  select: <MethodPath extends MethodPaths['text']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (options?: PropertyOptions['select']) => PropertyValueOf<'select'>;

  multi_select: <MethodPath extends MethodPaths['text']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (
    options?: PropertyOptions['multi_select'],
  ) => PropertyValueOf<'multi_select'>;

  date: <MethodPath extends MethodPaths['date']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (options?: PropertyOptions['date']) => PropertyValueOf<'date'>;

  files: <MethodPath extends MethodPaths['image']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => (options?: PropertyOptions['files']) => PropertyValueOf<'files'>;

  checkbox: () => PropertyValueOf<'checkbox'>;

  url: () => PropertyValueOf<'url'>;

  email: (
    ...args: Parameters<Get<Faker.FakerStatic, 'internet.email'>>
  ) => PropertyValueOf<'email'>;

  phone_number: <MethodPath extends MethodPaths['phone_number']>(
    methodPath?: MethodPath,
  ) => (
    ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
  ) => PropertyValueOf<'phone_number'>;

  propertiesByScheme: (
    propertyScheme: GetDatabaseResponse['properties'],
  ) => PropertyValue;
};

export const properties = (faker: Faker.FakerStatic): PropertyFakers => ({
  title:
    (methodPath) =>
    (...args) =>
    (options) =>
      createPropertyRequest.title([text(faker)(methodPath)(...args)(options)]),

  rich_text:
    (methodPath) =>
    (...args) =>
    (options) =>
      createPropertyRequest.rich_text([
        text(faker)(methodPath)(...args)(options),
      ]),

  number:
    (methodPath) =>
    (...args) =>
      createPropertyRequest.number(
        callWith(
          get(faker, methodPath ? methodPath : 'datatype.number'),
          ...args,
        ),
      ),

  select:
    (methodPath) =>
    (...args) =>
    (options) =>
      createPropertyRequest.select(
        options && options.length > 0
          ? faker.helpers.randomize(options)
          : selectOption(faker)(methodPath)(...args),
      ),

  multi_select:
    (methodPath) =>
    (...args) =>
    (options) =>
      createPropertyRequest.multi_select(
        options && options.length > 0
          ? faker.helpers.randomize(options)
          : [selectOption(faker)(methodPath)(...args)],
      ),

  date:
    (methodPath) =>
    (...args) =>
    (options) => {
      const startDate: Date = callWith(
        get(faker, methodPath ? methodPath : 'date.past'),
        ...args,
      );

      return createPropertyRequest.date({
        start: startDate.toISOString(),
        end: options?.includeEndDate
          ? faker.date.future(undefined, startDate).toISOString()
          : undefined,
      });
    },

  files:
    (methodPath) =>
    (...args) =>
    (options) =>
      createPropertyRequest.files(
        Array.from({length: options?.fileCount ?? 1}).map(() => ({
          name: faker.lorem.words(),
          ...external(faker)(methodPath)(...args),
        })),
      ),

  checkbox: () => createPropertyRequest.checkbox(faker.datatype.boolean()),

  url: () => createPropertyRequest.url(faker.internet.url()),

  email: (...args) =>
    createPropertyRequest.email(callWith(faker.internet.email, ...args)),

  phone_number:
    (methodPath) =>
    (...args) =>
      createPropertyRequest.phone_number(
        callWith(
          get(faker, methodPath ? methodPath : 'phone.phoneNumberFormat'),
          ...args,
        ),
      ),

  propertiesByScheme: (propertyScheme) =>
    Object.fromEntries(
      Object.entries(propertyScheme)
        .map(([name, property]) => {
          switch (property.type) {
            case 'title':
              return [name, properties(faker)[property.type]()()()];
            case 'rich_text':
              return [name, properties(faker)[property.type]()()()];
            case 'number':
              return [name, properties(faker)[property.type]()()];
            case 'select':
              return [
                name,
                properties(faker)[property.type]()()(property.select.options),
              ];
            case 'multi_select':
              return [
                name,
                properties(faker)[property.type]()()(
                  property.multi_select.options,
                ),
              ];
            case 'date':
              return [name, properties(faker)[property.type]()()()];
            case 'files':
              return [name, properties(faker)[property.type]()()()];
            case 'checkbox':
              return [name, properties(faker)[property.type]()];
            case 'url':
              return [name, properties(faker)[property.type]()];
            case 'email':
              return [name, properties(faker)[property.type]()];
            case 'phone_number':
              return [name, properties(faker)[property.type]()()];
            default:
              return [];
          }
        })
        .filter((array) => array.length > 0),
    ) as PropertyValue,
});

export type CreatePropertyRequest = {
  [PropertyKey in PropertyType]: (value: any) => PropertyValueOf<PropertyKey>;
};

export const SUPPORTED_PROPERTIES: PropertyType[] = [
  'number',
  'title',
  'select',
  'multi_select',
  'rich_text',
  'url',
  'files',
  'email',
  'phone_number',
  'date',
  'checkbox',
];

export const createPropertyRequest = Object.fromEntries(
  SUPPORTED_PROPERTIES.map((property) => [
    property,
    (value) => ({
      type: property,
      [property]: value, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    }),
  ]),
) as CreatePropertyRequest;
