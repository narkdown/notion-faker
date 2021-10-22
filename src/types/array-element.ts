export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends Array<infer ElementType> ? ElementType : never;
