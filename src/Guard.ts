export interface Guard {
  validate: (input: unknown, field: string) => void;
}

export class GuardError extends Error {}

export class RequiredGuard implements Guard {
  validate(input: unknown, field: string) {
    if (input == null)
      throw new GuardError(
        `Invalid configuration: The "${field}" is required but the given value is "${input}"`,
      );
  }
}

export class TypeGuard implements Guard {
  constructor(private type: string) {}

  validate(input: unknown, field: string) {
    if (typeof input !== this.type)
      throw new TypeError(
        `Invalid configuration: The "${field}" expected to be "${
          this.type
        }" but a "${typeof input}" was provided`,
      );
  }
}
