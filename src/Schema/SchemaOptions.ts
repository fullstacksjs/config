export interface SchemaWithDefaultOptions<TInput> {
  default: TInput;
  coerce?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface NullableSchemaOptions<TInput> {
  coerce?: boolean;
}

export type SchemaOptions<TInput> =
  | NullableSchemaOptions<TInput>
  | SchemaWithDefaultOptions<TInput>;
