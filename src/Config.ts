import type { Schema, SchemaOptions } from './Schema';
import { StringSchema } from './Schema';

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

  static string<T>(options?: SchemaOptions<T>) {
    return new StringSchema(options);
  }

  public getAll() {
    return this.value;
  }
}
