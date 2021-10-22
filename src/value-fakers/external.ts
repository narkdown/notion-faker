import {Get} from 'type-fest';
import {IconValue} from './emoji';
import {MethodPaths} from '@/types';
import {callWith, get} from '@/utils';

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
