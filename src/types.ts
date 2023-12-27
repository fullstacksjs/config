import type { Schema, StringSchema } from './Schema';
import type { ObjectSchema } from './Schema/ObjectSchema';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

export type InferObjectSchema<T extends ObjectSchema> = T extends ObjectSchema<
  infer G
>
  ? G extends Record<string, Schema>
    ? Prettify<InferSchema<G>>
    : never
  : never;

export type InferSchema<T extends Record<string, Schema>> = {
  [K in keyof T]: T[K] extends ObjectSchema
    ? InferObjectSchema<T[K]>
    : T[K]['isRequired'] extends true
      ? NonNullable<T[K]['value']>
      : T[K]['value'];
};

export type Expect<T extends true> = T;

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type RequiredSchema<T extends Schema> = T & { isRequired: true };
