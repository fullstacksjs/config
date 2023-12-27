import type { Schema } from './Schema';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

export type InferType<T extends Record<string, Schema>> = {
  [K in keyof T]: T[K] extends Schema<object>
    ? Prettify<InferType<T[K]['value']>>
    : T[K]['isRequired'] extends true
    ? NonNullable<T[K]['value']>
    : T[K]['value'];
};
