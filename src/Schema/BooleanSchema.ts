import { Schema } from './Schema.js';
import type { SchemaOptions } from './SchemaOptions.js';
import { TypeGuard } from './TypeGuard.js';

export class BooleanSchema<TInput = any> extends Schema<TInput, boolean> {
  protected type = 'boolean';
  #falseRegex = /(false|0)/i;

  constructor(options: SchemaOptions<boolean> = {}) {
    super({
      ...options,
      typeConstructor: n =>
        typeof n === 'string' ? !this.#falseRegex.test(n) : Boolean(n),
      initialGuards: [new TypeGuard('boolean')],
    });
  }
}
