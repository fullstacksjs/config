import { NumberSchema } from './NumberSchema';

describe('Number Schema', () => {
  it('should throw error when value is not number', () => {
    const schema = new NumberSchema({ coerce: false }).setValue('3000');
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be "number" but a "string" was provided',
      ),
    );
  });

  it('should fallback to default', () => {
    const schema = new NumberSchema({
      default: 3000,
      coerce: false,
    }).setValue();
    const schema2 = new NumberSchema({ default: 3000, coerce: false }).setValue(
      undefined,
    );
    const schema3 = new NumberSchema({ default: 3000 }).setValue();
    const schema4 = new NumberSchema({ default: 3000 }).setValue(undefined);

    expect(schema.parse()).toBe(3000);
    expect(schema2.parse()).toBe(3000);
    expect(schema3.parse()).toBe(3000);
    expect(schema4.parse()).toBe(3000);
  });

  it('should coercion to number', () => {
    const schema = new NumberSchema({ coerce: true }).setValue('3000');

    expect(schema.parse()).toBe(3000);
  });

  it('should throw when number is less than min', () => {
    const schema = new NumberSchema({ coerce: false }).min(3).setValue(1);
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be more than or equal to "3" but "1" was provided',
      ),
    );
  });

  it('should not throw when number is more than min', () => {
    const schema = new NumberSchema({ coerce: false }).min(3).setValue(4);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when number is equal than min', () => {
    const schema = new NumberSchema({ coerce: false }).min(3).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should throw when number is more than max', () => {
    const schema = new NumberSchema({ coerce: false }).max(1).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be less than or equal to "1" but "3" was provided',
      ),
    );
  });

  it('should not throw when number is less than max', () => {
    const schema = new NumberSchema({ coerce: false }).max(4).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });

  it('should not throw when number is equal than max', () => {
    const schema = new NumberSchema({ coerce: false }).max(3).setValue(3);
    schema.key = 'key';

    expect(() => schema.validate()).not.toThrow();
  });
});
