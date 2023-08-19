export interface Guard<TInput> {
  validate: (input: TInput, field: string) => void;
}

export class GuardError extends Error {}

export class RequiredGuard<T> implements Guard<T> {
  validate(input: T, field: string) {
    if (input == null)
      throw new GuardError(
        `Invalid configuration: The "${field}" is required but the given value is "${input}"`,
      );
  }
}
