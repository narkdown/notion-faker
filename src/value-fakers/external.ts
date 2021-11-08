import type {Get} from 'type-fest';
import type {MethodPaths} from '../types';
import {callWith, get} from '../utils';
import type {IconValue} from './emoji';

export type ExternalValue = Extract<IconValue, {type: 'external'}>;

export type ExternalFaker = <MethodPath extends MethodPaths['image']>(
  methodPath?: MethodPath,
) => (...args: Parameters<Get<Faker.FakerStatic, MethodPath>>) => ExternalValue;

export const external =
  (faker: Faker.FakerStatic): ExternalFaker =>
  (methodPath) =>
  (...args) => ({
    type: 'external',
    external: {
      url: callWith(
        get(faker, methodPath ? methodPath : 'image.avatar'),
        ...args,
      ),
    },
  });
