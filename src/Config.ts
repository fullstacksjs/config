import type { InferType } from './InferType';
import type { Schema, SchemaOptions } from './Schema';
import { BooleanSchema, NumberSchema, StringSchema } from './Schema';

export class Config<
  TSchema extends Record<string, Schema>,
  TConfig extends Record<string, unknown>,
> {
  private value!: TConfig;

  constructor(private schema: TSchema) {}

  public parse(value: TConfig) {
    this.value = value;

    Object.entries(this.schema).forEach(([key, s]) => {
      s.key = key;
      s.setValue(this.value[key]);
      s.validate();
      this.value[key as keyof TConfig] = s.parse();
    });

    return this;
  }

  static string(options?: SchemaOptions<string>) {
    return new StringSchema(options);
  }

  static boolean(options?: SchemaOptions<boolean>) {
    return new BooleanSchema(options);
  }

  static number(options?: SchemaOptions<number>) {
    return new NumberSchema(options);
  }

  public getAll(): InferType<TSchema> {
    return this.value as any;
  }
}
