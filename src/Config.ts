import type { Schema, SchemaOptions } from './Schema';
import { BooleanSchema, NumberSchema, StringSchema } from './Schema';
import { ObjectSchema } from './Schema/ObjectSchema';
import type { SchemaWithDefaultOptions } from './Schema/SchemaOptions';
import type { InferSchema, Prettify, RequiredSchema } from './types';

export class Config<TSchema extends Record<string, Schema>> {
  private value!: InferSchema<TSchema>;

  constructor(private schema: TSchema) {}

  public parse(value: Partial<Record<keyof TSchema, any>>) {
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

  static object<T extends Record<string, Schema>>(
    schema: T,
  ): RequiredSchema<ObjectSchema<T>> {
    return new ObjectSchema(schema) as any;
  }

  public get<TKey extends keyof TSchema>(key: TKey) {
    return this.value[key] as Prettify<InferSchema<TSchema>[TKey]>;
  }

  public getAll() {
    return this.value as Prettify<InferSchema<TSchema>>;
  }
}
