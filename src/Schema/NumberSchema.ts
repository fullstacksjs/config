import type { Guard } from '../Guard';
import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

class MinNumberGuard implements Guard<number> {
  constructor(private min: number) {}

  validate(input: number, field: string) {
    if (input < this.min)
      throw new RangeError(
        `Invalid configuration: The "${field}" expected to be more than or equal to "${this.min}" but "${input}" was provided`,
      );
  }
}

class MaxNumberGuard implements Guard<number> {
  constructor(private max: number) {}

  validate(input: number, field: string) {
    if (input > this.max)
      throw new RangeError(
        `Invalid configuration: The "${field}" expected to be less than or equal to "${this.max}" but "${input}" was provided`,
      );
  }
}

export class NumberSchema<TInput = any> extends Schema<TInput, number> {
  protected type = 'number';

  constructor(options: SchemaOptions<number> = {}) {
    super({
      ...options,
      typeConstructor: Number,
      initialGuards: [new TypeGuard('number')],
    });
  }

  public min(min: number) {
    this.guards.push(new MinNumberGuard(min));
    return this;
  }

  public max(max: number) {
    this.guards.push(new MaxNumberGuard(max));
    return this;
  }
}
