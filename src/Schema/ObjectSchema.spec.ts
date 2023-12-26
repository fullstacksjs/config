import { NumberSchema } from './NumberSchema';
import { ObjectSchema } from './ObjectSchema';

describe('Object Schema', () => {
  it('should throw error when there is an error in object keys', () => {
    const schema = new ObjectSchema({
      foo: new NumberSchema(),
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
        bar: new NumberSchema(),
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
});
