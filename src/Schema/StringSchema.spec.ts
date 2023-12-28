import { StringSchema } from './StringSchema';

describe('String Schema', () => {
  it('should throw error when value is not string', () => {
    const schema = new StringSchema({ coerce: false }).setValue(3000);
    schema.key = 'port';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "port" expected to be "string" but a "number" was provided',
      ),
    );
  });

  it('should coercion to string', () => {
    const schema = new StringSchema({ coerce: true }).setValue(3000);

    expect(schema.parse()).toBe('3000');
  });

  it('should throw when string length is less than min', () => {
    const schema = new StringSchema({ coerce: false })
      .min(3)
      .setValue(' '.repeat(1));
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" length expected to be more than or equal to "3" but "1" was provided',
      ),
    );
  });

  it('should not throw when string length is more than min', () => {
    const schema = new StringSchema({ coerce: false })
      .min(3)
      .setValue(' '.repeat(4));
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when string length is equal than min', () => {
    const schema = new StringSchema({ coerce: false })
      .min(3)
      .setValue(' '.repeat(3));
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should throw when string length is more than max', () => {
    const schema = new StringSchema({ coerce: false })
      .max(1)
      .setValue(' '.repeat(3));
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" length expected to be less than or equal to "1" but "3" was provided',
      ),
    );
  });

  it('should not throw when string length is less than max', () => {
    const schema = new StringSchema({ coerce: false })
      .max(4)
      .setValue(' '.repeat(3));
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when string length is equal than max', () => {
    const schema = new StringSchema({ coerce: false })
      .max(3)
      .setValue(' '.repeat(3));
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });
});
