import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';

export class StringSchema<TInput = any> extends Schema<TInput, string> {
  #type = 'string'; // eslint-disable-line no-unused-private-class-members

  constructor(options: SchemaOptions<string> = {}) {
    super({ ...options, typeConstructor: String, type: 'string' });
  }
}
