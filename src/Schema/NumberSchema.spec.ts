import { NumberSchema } from './NumberSchema';

describe('Number Schema', () => {
  it('should throw error when value is not number', () => {
    const schema = new NumberSchema().setValue('3000');
    schema.key = 'port';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "port" expected to be "number" but a "string" was provided',
      ),
    );
  });

  it('should coercion to number', () => {
    const schema = new NumberSchema({ coerce: true }).setValue('3000');

    expect(schema.parse()).toBe(3000);
  });
});
