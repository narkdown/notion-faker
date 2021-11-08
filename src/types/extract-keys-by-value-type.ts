import type {OptionalToUndefined} from '@younho9/types';

export type ExtractKeysByValueType<
  ObjectType extends Record<string, unknown>,
  ValueType,
> = {
  [KeyType in keyof OptionalToUndefined<ObjectType>]: OptionalToUndefined<ObjectType>[KeyType] extends ValueType
    ? KeyType
    : never;
}[keyof OptionalToUndefined<ObjectType>];
