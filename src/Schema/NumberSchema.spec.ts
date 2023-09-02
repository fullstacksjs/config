import { NumberSchema } from './NumberSchema';

describe('Number Schema', () => {
  it('should throw error when value is not number', () => {
    const schema = new NumberSchema().setValue('3000');
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be "number" but a "string" was provided',
      ),
    );
  });

  it('should coercion to number', () => {
    const schema = new NumberSchema({ coerce: true }).setValue('3000');

    expect(schema.parse()).toBe(3000);
  });

  it('should throw when number is less than min', () => {
    const schema = new NumberSchema().min(3).setValue(1);
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be more than or equal to "3" but "1" was provided',
      ),
    );
  });

  it('should not throw when number is more than min', () => {
    const schema = new NumberSchema().min(3).setValue(4);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when number is equal than min', () => {
    const schema = new NumberSchema().min(3).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should throw when number is more than max', () => {
    const schema = new NumberSchema().max(1).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be less than or equal to "1" but "3" was provided',
      ),
    );
  });

  it('should not throw when number is less than max', () => {
    const schema = new NumberSchema().max(4).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when number is equal than max', () => {
    const schema = new NumberSchema().max(3).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });
});
