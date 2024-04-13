import { ArraySchema } from './ArraySchema.js';
import { NumberSchema } from './NumberSchema.js';

describe('Array Schema', () => {
  it('should throw error when there is an error in object keys', () => {
    const schema = new ArraySchema(new NumberSchema()).setValue('3000');
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be "array" but a "string" was provided',
      ),
    );
  });

  it('should not throw with empty array', () => {
    const schema = new ArraySchema(new NumberSchema()).setValue([]);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw for valid values', () => {
    const schema = new ArraySchema(new NumberSchema({ coerce: true })).setValue(
      [3000, '3000'],
    );
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not accept "undefined" or "null"', () => {
    const schema = new ArraySchema(new NumberSchema({ coerce: true })).setValue(
      [undefined],
    );
    schema.key = 'key';

    const schema2 = new ArraySchema(
      new NumberSchema({ coerce: true }),
    ).setValue([null]);
    schema2.key = 'key';

    expect(() => schema.validate()).toThrow(
      new Error(
        'Invalid configuration: The "key.0" is required but the given value is "undefined"',
      ),
    );
    expect(() => schema2.validate()).toThrow(
      new Error(
        'Invalid configuration: The "key.0" is required but the given value is "null"',
      ),
    );
  });

  it('should validate values', () => {
    const schema = new ArraySchema(
      new NumberSchema({ coerce: false }),
    ).setValue([3000, 'string']);
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new Error(
        'Invalid configuration: The "key.1" expected to be "number" but a "string" was provided',
      ),
    );
  });
});
