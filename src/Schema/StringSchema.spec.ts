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
});
