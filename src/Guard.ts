export interface Guard<T> {
  validate: (input: T, field: T) => void;
}

export class GuardError extends Error {}
