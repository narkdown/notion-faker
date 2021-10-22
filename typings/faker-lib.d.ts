declare const FakerConstructor: new (options?: {
  locales?: Record<string, Faker.FakerStatic>;
  locale?: string;
  localeFallback?: string;
}) => Faker.FakerStatic;

declare module 'faker/lib' {
  export = FakerConstructor;
}
