import type {CreateDatabaseParameters} from '@notionhq/client/build/src/api-endpoints';
import type {Get, IterableElement} from 'type-fest';
import type {MethodPaths} from '../types';
import {callWith, get} from '../utils';

export type TextValue = Extract<
  IterableElement<NonNullable<CreateDatabaseParameters['title']>>,
  {type?: 'text'}
>;

export type TextOptions = {
  annotations?: TextValue['annotations'];
};

export type TextFaker = <MethodPath extends MethodPaths['text']>(
  methodPath?: MethodPath,
) => (
  ...args: Parameters<Get<Faker.FakerStatic, MethodPath>>
) => (options?: TextOptions) => TextValue;

export const text =
  (faker: Faker.FakerStatic): TextFaker =>
  (methodPath) =>
  (...args) =>
  (options) => ({
    type: 'text',
    text: {
      content: callWith(
        get(faker, methodPath ? methodPath : 'lorem.words'),
        ...args,
      ),
    },
    annotations: options?.annotations,
  });
