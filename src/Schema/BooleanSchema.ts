import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

export class BooleanSchema<TInput = any> extends Schema<TInput, boolean> {
  #type = 'boolean'; // eslint-disable-line no-unused-private-class-members
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
