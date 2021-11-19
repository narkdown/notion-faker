import type {AnyFunction} from '@younho9/types';

export const callWith = <
  FunctionType extends AnyFunction<ReturnType<FunctionType>>,
>(
  fn: FunctionType,
  ...args: Parameters<FunctionType>
) => fn(...args);
