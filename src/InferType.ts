import type { Schema } from './Schema';

export type InferType<T extends Record<string, Schema>> = {
  [K in keyof T]: T[K]['required'] extends true
    ? NonNullable<T[K]['value']>
    : T[K]['value'];
};
