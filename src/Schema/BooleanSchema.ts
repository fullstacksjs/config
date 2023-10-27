import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';

export class BooleanSchema<TInput = any> extends Schema<TInput, boolean> {
  constructor(options: SchemaOptions<boolean> = {}) {
    super({
      ...options,
      typeConstructor: n => {
        console.log(`${n} to boolean`);

        return Boolean(n);
      },
      type: 'boolean',
    });
  }
}
