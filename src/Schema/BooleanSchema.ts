import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

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
