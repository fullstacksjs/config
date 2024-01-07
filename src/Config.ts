import type { Schema, SchemaOptions, SchemaWithDefaultOptions } from './Schema';
import {
  ArraySchema,
  BooleanSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from './Schema';
import type {
  GetPath,
  InferSchema,
  ObjectPath,
  Prettify,
  RecursivePartial,
  RequiredSchema,
} from './types';

export class Config<TSchema extends Record<string, Schema<any, any, boolean>>> {
  private value!: InferSchema<TSchema>;

  constructor(private schema: TSchema) {}

  public parse(value: RecursivePartial<InferSchema<TSchema>>) {
    this.value = value as Record<keyof TSchema, any>;

    Object.entries(this.schema).forEach(([key, s]) => {
      s.key = key;
      s.setValue(this.value[key]);
      s.validate();
      this.value[key as keyof InferSchema<TSchema>] = s.parse();
    });

    return this;
  }

  static string<T extends SchemaOptions<string>>(
    options?: T,
  ): T extends SchemaWithDefaultOptions<string>
    ? RequiredSchema<StringSchema<string>>
    : StringSchema<string> {
    return new StringSchema(options) as any;
  }

  static boolean<T extends SchemaOptions<boolean>>(
    options?: T,
  ): T extends SchemaWithDefaultOptions<boolean>
    ? RequiredSchema<BooleanSchema<boolean>>
    : BooleanSchema<boolean> {
    return new BooleanSchema(options) as any;
  }

  static number<T extends SchemaOptions<number>>(
    options?: T,
  ): T extends SchemaWithDefaultOptions<number>
    ? RequiredSchema<NumberSchema<number>>
    : NumberSchema<number> {
    return new NumberSchema(options) as any;
  }

  static object<T extends Record<string, Schema<any, any, boolean>>>(
    schema: T,
  ): RequiredSchema<ObjectSchema<T>> {
    return new ObjectSchema(schema) as any;
  }

  static array<T extends Schema<any, any, boolean>>(
    schema: T,
  ): RequiredSchema<ArraySchema<T>> {
    return new ArraySchema(schema) as any;
  }

  public get<TKey extends ObjectPath<InferSchema<TSchema>>>(
    key: TKey,
  ): Prettify<GetPath<InferSchema<TSchema>, TKey>> {
    const keys = key.split('.');
    // @ts-expect-error error page
    return keys.reduce((acc, k) => acc[k], this.value) as any as Prettify<
      GetPath<InferSchema<TSchema>, TKey>
    >;
  }

  public getAll(): Prettify<InferSchema<TSchema>> {
    return this.value as Prettify<InferSchema<TSchema>>;
  }
}
