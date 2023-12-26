import type { InferType } from './InferType';
import type { Schema, SchemaOptions } from './Schema';
import { BooleanSchema, NumberSchema, StringSchema } from './Schema';
import type { SchemaWithDefaultOptions } from './Schema/SchemaOptions';

type RequiredSchema<T extends Schema> = T & { isRequired: true };

export class Config<TSchema extends Record<string, Schema>> {
  private value!: InferType<TSchema>;

  constructor(private schema: TSchema) {}

  public parse(value: Partial<Record<keyof TSchema, any>>) {
    this.value = value as Record<keyof TSchema, any>;

    Object.entries(this.schema).forEach(([key, s]) => {
      s.key = key;
      s.setValue(this.value[key]);
      s.validate();
      this.value[key as keyof InferType<TSchema>] = s.parse();
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

  public get<TKey extends keyof TSchema>(key: TKey) {
    return this.value[key] as InferType<TSchema>[TKey];
  }

  public getAll(): InferType<TSchema> {
    return this.value as any;
  }
}
