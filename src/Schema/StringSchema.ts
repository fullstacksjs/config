import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

export class StringSchema<TInput = any> extends Schema<TInput, string> {
  #type = 'string'; // eslint-disable-line no-unused-private-class-members

  constructor(options: SchemaOptions<string> = {}) {
    super({
      ...options,
      typeConstructor: String,
      initialGuards: [new TypeGuard('string')],
    });
  }
}
