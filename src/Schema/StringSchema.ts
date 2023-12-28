import type { Guard } from '../Guard';
import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';
import { TypeGuard } from './TypeGuard';

class MinLengthGuard implements Guard<string> {
  constructor(private min: number) {}

  validate(input: string, field: string) {
    if (input.length < this.min)
      throw new RangeError(
        `Invalid configuration: The "${field}" length expected to be more than or equal to "${this.min}" but "${input.length}" was provided`,
      );
  }
}

class MaxLengthGuard implements Guard<string> {
  constructor(private max: number) {}

  validate(input: string, field: string) {
    if (input.length > this.max)
      throw new RangeError(
        `Invalid configuration: The "${field}" length expected to be less than or equal to "${this.max}" but "${input.length}" was provided`,
      );
  }
}

export class StringSchema<TInput = any> extends Schema<TInput, string> {
  #type = 'string'; // eslint-disable-line no-unused-private-class-members

  constructor(options: SchemaOptions<string> = {}) {
    super({
      ...options,
      typeConstructor: String,
      initialGuards: [new TypeGuard('string')],
    });
  }

  public min(min: number) {
    this.guards.push(new MinLengthGuard(min));
    return this;
  }

  public max(max: number) {
    this.guards.push(new MaxLengthGuard(max));
    return this;
  }
}
