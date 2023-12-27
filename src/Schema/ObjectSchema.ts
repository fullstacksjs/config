import type { Guard } from '../Guard';
import { Schema } from './Schema';

class ObjectGuard implements Guard<Record<string, Schema>> {
  constructor(private schema: Record<string, Schema<any, any, boolean>>) {}

  validate(input: Record<string, unknown> | undefined, key: string) {
    if (!input) return;

    Object.entries(this.schema).forEach(([subKey, schema]) => {
      schema.key = `${key}.${subKey}`;
      schema.value = input[subKey];

      schema.validate();
    });
  }
}

export class ObjectSchema<TInput = any> extends Schema<
  TInput,
  TInput,
  boolean
> {
  #type = 'object'; // eslint-disable-line no-unused-private-class-members

  constructor(schema: Record<string, Schema<any, any, boolean>>) {
    super({
      typeConstructor: x => x,
      type: 'object',
    });
    this.required();
    this.guards.push(new ObjectGuard(schema));
  }
}
