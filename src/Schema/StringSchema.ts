import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';

export class StringSchema<TInput = any> extends Schema<TInput, string> {
  constructor(options: SchemaOptions<TInput> = {}) {
    super({ ...options, typeConstructor: String, type: 'string' });
  }
}
