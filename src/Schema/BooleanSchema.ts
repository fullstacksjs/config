import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

export class BooleanSchema<TInput = any> extends Schema<TInput, boolean> {
  #type = 'boolean'; // eslint-disable-line no-unused-private-class-members
  #falseRegex = /false/i;

  constructor(options: SchemaOptions<boolean> = {}) {
    super({
      ...options,
      typeConstructor: n => {
        if (typeof n === 'string' && this.#falseRegex.test(n)) return false;
        return Boolean(n);
      },
      initialGuards: [new TypeGuard('boolean')],
    });
  }
}
