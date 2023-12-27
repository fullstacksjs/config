import type { Guard } from '../Guard';
import { Schema } from './Schema';

class ObjectGuard implements Guard<Record<string, Schema>> {
  constructor(private schema: Record<string, Schema>) {}

  validate(input: Record<string, unknown> | undefined, key: string) {
    if (!input) return;

    Object.entries(this.schema).forEach(([subKey, schema]) => {
      schema.key = `${key}.${subKey}`;
      schema.value = input[subKey];

      schema.validate();
    });
  }
}

export class ObjectSchema<TInput = any> extends Schema<TInput, TInput> {
  #type = 'object'; // eslint-disable-line no-unused-private-class-members

  constructor(schema: Record<string, Schema>) {
    super({
      typeConstructor: x => x,
      type: 'object',
    });
    this.require();
    this.guards.push(new ObjectGuard(schema));
  }
}
