export interface Guard<T> {
  validate: (input: T, field: string) => void;
}

export class GuardError extends Error {}
