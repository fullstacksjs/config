import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';

export class BooleanSchema<TInput = any> extends Schema<TInput, boolean> {
  private falseRegex = /false/i;
  constructor(options: SchemaOptions<boolean> = {}) {
    super({
      ...options,
      typeConstructor: n => {
        if (typeof n === 'string' && this.falseRegex.test(n)) return false;

        return Boolean(n);
      },
      type: 'boolean',
    });
  }
}
