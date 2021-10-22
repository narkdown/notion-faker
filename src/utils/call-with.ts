import {AnyFunction} from '@/types/any-function';

export const callWith = <
  FunctionType extends AnyFunction<ReturnType<FunctionType>>,
>(
  fn: FunctionType,
  ...args: Parameters<FunctionType>
) => fn(...args);
