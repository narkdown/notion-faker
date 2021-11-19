import {ConditionalKeys} from 'type-fest';

export type SupportedFakerNamespace = Exclude<
  keyof Faker.FakerStatic,
  | 'locale'
  | 'setLocale'
  | 'fake'
  | 'helpers'
  | 'random'
  | 'seed'
  | 'seedValue'
  | 'unique'
>;

export type FindFakerMethodPaths<
  Namespace,
  FunctionType extends () => void,
> = Namespace extends SupportedFakerNamespace
  ? `${Namespace}.${Exclude<
      ConditionalKeys<Faker.FakerStatic[Namespace], FunctionType>,
      symbol
    >}`
  : never;

export type MethodPaths = {
  text: FindFakerMethodPaths<SupportedFakerNamespace, () => string>;
  number: FindFakerMethodPaths<SupportedFakerNamespace, () => number>;
  image: FindFakerMethodPaths<'image', () => string>;
  date: FindFakerMethodPaths<SupportedFakerNamespace, () => Date>;
  phone_number: Exclude<
    FindFakerMethodPaths<'phone', () => string>,
    'phone.phoneFormats'
  >;
};
