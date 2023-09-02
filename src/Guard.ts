export interface Guard<T> {
  validate: (input: T, field: T) => void;
}

export class GuardError extends Error {}

export class RequiredGuard implements Guard<string> {
  validate(input: unknown, field: string) {
    if (input == null)
      throw new GuardError(
        `Invalid configuration: The "${field}" is required but the given value is "${input}"`,
      );
  }
}

export class TypeGuard implements Guard<any> {
  constructor(private type: string) {}

  validate(input: any, field: string) {
    if (typeof input !== this.type)
      throw new TypeError(
        `Invalid configuration: The "${field}" expected to be "${
          this.type
        }" but a "${typeof input}" was provided`,
      );
  }
}

export class MinNumberGuard implements Guard<number> {
  constructor(private min: number) {}

  validate(input: number, field: number) {
    if (input < this.min)
      throw new RangeError(
        `Invalid configuration: The "${field}" expected to be more than or equal to "${this.min}" but "${input}" was provided`,
      );
  }
}

export class MaxNumberGuard implements Guard<number> {
  constructor(private max: number) {}

  validate(input: number, field: number) {
    if (input > this.max)
      throw new RangeError(
        `Invalid configuration: The "${field}" expected to be less than or equal to "${this.max}" but "${input}" was provided`,
      );
  }
}
