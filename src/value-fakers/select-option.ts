import type {Get, IterableElement} from 'type-fest';
import type {PropertyValueOf} from '../database';
import type {MethodPaths} from '../types';
import {callWith, get} from '../utils';

export type SelectOptionValue = IterableElement<
  NonNullable<PropertyValueOf<'select'>['select']['options']>
>;

export type SelectOptionFaker = <MethodPath extends MethodPaths['text']>(
  methodPath?: MethodPath,
) => (
  ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
) => SelectOptionValue;

export const selectOption =
  (faker: Faker.FakerStatic): SelectOptionFaker =>
  (methodPath) =>
  (...args) => ({
    name: callWith(
      get(faker, methodPath ? methodPath : 'lorem.words'),
      ...args,
    ),
    color: faker.helpers.randomize(SELECT_PROPERTY_COLORS),
  });

export const SELECT_PROPERTY_COLORS: Array<
  Required<SelectOptionValue>['color']
> = [
  'default',
  'pink',
  'purple',
  'green',
  'gray',
  'orange',
  'brown',
  'red',
  'yellow',
  'blue',
];
