import type { Schema } from './Schema';
import { StringSchema } from './Schema';

export class Config<
  TSchema extends Record<string, Schema>,
  TConfig extends Record<string, unknown>,
> {
  private value!: TConfig;

  constructor(private schema: TSchema) {
    Object.entries(this.schema).forEach(([key, s]) => {
      s.key = key;
    });
  }

  public parse(value: TConfig) {
    this.value = value;

    Object.entries(this.schema).forEach(([k, s]) => {
      s.setValue(this.value[k]);
      s.validate();
      this.value[k as keyof TConfig] = s.parse();
    });

    return this;
  }

  static string(options?: { default: string }) {
    return new StringSchema(options);
  }

  public getAll() {
    return this.value;
  }
}
