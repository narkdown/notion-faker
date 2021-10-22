import _get from 'lodash.get';
import type {Get} from 'type-fest';

export const get = <BaseType, Path extends string>(
  object: BaseType,
  path: Path,
): Get<BaseType, Path> => _get(object, path) as Get<BaseType, Path>;
