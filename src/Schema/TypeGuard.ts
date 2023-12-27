import type { Guard } from '../Guard';

type Predicate = (arg: unknown) => boolean;

export class TypeGuard implements Guard<any> {
  constructor(
    private type: string,
    private predicate: Predicate = x => typeof x === this.type,
  ) {}

  validate(input: any, field: string) {
    if (!this.predicate(input) && input !== undefined)
      throw new TypeError(
        `Invalid configuration: The "${field}" expected to be "${
          this.type
        }" but a "${typeof input}" was provided`,
      );
  }
}
