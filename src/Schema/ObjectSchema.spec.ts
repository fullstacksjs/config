import { NumberSchema } from './NumberSchema.js';
import { ObjectSchema } from './ObjectSchema.js';

describe('Object Schema', () => {
  it('should throw error when there is an error in object keys', () => {
    const schema = new ObjectSchema({
      foo: new NumberSchema({ coerce: false }),
    }).setValue({ foo: '3000' });
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key.foo" expected to be "number" but a "string" was provided',
      ),
    );
  });

  it('should throw validate nested schema', () => {
    const schema = new ObjectSchema({
      foo: new ObjectSchema({
        bar: new NumberSchema({ coerce: false }),
      }),
    }).setValue({ foo: '3000' });
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key.foo" expected to be "object" but a "string" was provided',
      ),
    );

    schema.setValue({ foo: { bar: '3000' } });

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key.foo.bar" expected to be "number" but a "string" was provided',
      ),
    );

    schema.setValue({});

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key.foo" is required but the given value is "undefined"',
      ),
    );
  });

  it('should coerce nested object by default', () => {
    const schema = new ObjectSchema({
      foo: new NumberSchema(),
    }).setValue({ foo: '3000' });
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should parse nested values', () => {
    const schema = new ObjectSchema<{ foo: string }>({
      foo: new NumberSchema(),
    });
    schema.key = 'key';
    schema.setValue({ foo: '3000' });

    expect(() => schema.validate()).not.toThrow();

    expect(schema.value?.foo).toBeTypeOf('number');
  });
});
