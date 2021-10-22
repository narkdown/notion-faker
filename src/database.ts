import {CreateDatabaseParameters} from '@notionhq/client/build/src/api-endpoints';
import {Except, Get, SetRequired, ValueOf} from 'type-fest';
import {MethodPaths} from './types';
import {text, TextOptions, TextValue} from './value-fakers';

export type TitleFaker = <MethodPath extends MethodPaths['text']>(
  methodPath?: MethodPath,
) => (
  ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
) => (options?: TextOptions) => TextValue[];

export const title =
  (faker: Faker.FakerStatic): TitleFaker =>
  (methodPath) =>
  (...args) =>
  (options) =>
    [text(faker)(methodPath)(...args)(options)];

export type PropertyValues = Required<
  ValueOf<CreateDatabaseParameters['properties']>
>;

export type PropertyType = PropertyValues['type'];

export type PropertyValueOf<PropertyKey extends PropertyType> = Extract<
  PropertyValues,
  {type: PropertyKey}
>;

export type PropertyOptions = SetRequired<
  {
    [PropertyKey in PropertyType]?: ValueOf<
      Except<PropertyValueOf<PropertyKey>, 'type'>
    >;
  },
  'relation' | 'rollup'
>;

export type PropertyFaker<PropertyKey extends PropertyType> =
  PropertyKey extends 'relation' | 'rollup'
    ? (options: PropertyOptions[PropertyKey]) => PropertyValueOf<PropertyKey>
    : (options?: PropertyOptions[PropertyKey]) => PropertyValueOf<PropertyKey>;

export type PropertyFakers = {
  [PropertyKey in PropertyType]: PropertyFaker<PropertyKey>;
};

export const SUPPORTED_PROPERTIES: PropertyType[] = [
  'title',
  'rich_text',
  'number',
  'select',
  'multi_select',
  'date',
  'files',
  'checkbox',
  'url',
  'email',
  'phone_number',
  'formula',
  'relation',
  'rollup',
  'people',
  'created_by',
  'created_time',
  'last_edited_by',
  'last_edited_time',
];

export const properties: PropertyFakers = Object.fromEntries(
  SUPPORTED_PROPERTIES.map((property) => {
    switch (property) {
      case 'relation':
        return [
          property,
          (options: PropertyOptions['relation']) => ({
            type: property,
            [property]: options ?? {},
          }),
        ];
      case 'rollup':
        return [
          property,
          (options: PropertyOptions['rollup']) => ({
            type: property,
            [property]: options ?? {},
          }),
        ];
      default:
        return [
          property,
          (options: PropertyOptions[typeof property]) => ({
            type: property,
            [property]: options ?? {},
          }),
        ];
    }
  }),
) as PropertyFakers;
