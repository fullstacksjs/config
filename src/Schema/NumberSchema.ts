import { MaxNumberGuard, MinNumberGuard } from '../Guard';
import { Schema } from './Schema';
import type { SchemaOptions } from './SchemaOptions';

export class NumberSchema<TInput = any> extends Schema<TInput, number> {
  constructor(options: SchemaOptions<TInput> = {}) {
    super({ ...options, typeConstructor: Number, type: 'number' });
  }

  min(min: number) {
    this.guards.push(new MinNumberGuard(min));
    return this;
  }

  max(max: number) {
    this.guards.push(new MaxNumberGuard(max));
    return this;
  }
}
