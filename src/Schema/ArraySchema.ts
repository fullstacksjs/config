import type { Guard } from '../Guard.js';
import { Schema } from './Schema.js';
import { TypeGuard } from './TypeGuard.js';

class ArrayGuard implements Guard<any[]> {
  constructor(private schema: Schema<any, any, boolean>) {}

  validate(input: unknown[], key: string) {
    input.forEach((v, i) => {
      this.schema.key = `${key}.${i}`;
      this.schema.setValue(v);
      this.schema.validate();
    });
  }
}

export class ArraySchema<TInput = any> extends Schema<TInput, TInput, boolean> {
  protected type = 'array';

  constructor(schema: Schema<any, any, boolean>) {
    super({
      typeConstructor: x => x,
      initialGuards: [
        new TypeGuard('array', x => Array.isArray(x)),
        new ArrayGuard(schema),
      ],
    });
    schema.options.coerce ??= false;
    schema.required();
    this.required();
  }
}
