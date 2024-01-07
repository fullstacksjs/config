import type { Guard } from '../Guard';
import { Schema } from './Schema';
import { TypeGuard } from './TypeGuard';

class ObjectGuard implements Guard<Record<string, Schema>> {
  constructor(private schema: Record<string, Schema<any, any, boolean>>) {}

  validate(input: Record<string, unknown> | undefined, key: string) {
    if (!input) return;

    Object.entries(this.schema).forEach(([subKey, schema]) => {
      schema.key = `${key}.${subKey}`;
      schema.setValue(input[subKey]);

      schema.validate();
    });
  }
}

export class ObjectSchema<
  TInput extends Record<string, unknown> = any,
> extends Schema<TInput, TInput, boolean> {
  protected type = 'object';

  constructor(private schema: Record<string, Schema<any, any, boolean>>) {
    super({
      typeConstructor: x => x,
      initialGuards: [new TypeGuard('object')],
    });
    this.required();
    this.guards.push(new ObjectGuard(schema));
  }

  public override setValue(input?: TInput) {
    this.input = input;

    if (typeof input !== 'object') {
      this.value = input;
    } else {
      this.value = Object.keys(input).reduce((acc, key) => {
        const schema = this.schema[key];

        if (!schema) return acc;

        schema.setValue(input[key]);
        // @ts-expect-error It's hard
        acc[key] = schema.parse();
        return acc;
      }, {}) as TInput;
    }

    return this;
  }
}
