import { GuardError } from '../Guard';
import { StringSchema } from './StringSchema';

describe('String Schema', () => {
  it('should create a string schema', () => {
    const schema = new StringSchema().require().setValue('3000');

    expect(schema.parse()).toBe('3000');
  });

  it('should throw if a required config is undefined', () => {
    const schema = new StringSchema().require();
    schema.key = 'port';

    expect(() => schema.validate()).toThrow(
      new GuardError(
        `Invalid configuration: The "port" is required but the given value is "undefined"`,
      ),
    );
  });

  it('should use default value when config is undefined', () => {
    const schema = new StringSchema({ default: '3000' }).setValue();

    expect(schema.parse()).toBe('3000');
  });

  it('should allow for type coercion.', () => {
    const schema = new StringSchema({ coerce: true }).setValue('3000');

    expect(schema.parse()).toBe('3000');
  });

  it('should throw error when value is not string', () => {
    const schema = new StringSchema().setValue(3000);
    schema.key = 'port';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "port" expected to be "string" but a "number" was provided',
      ),
    );
  });

  it('should allow for type coercion', () => {
    const schema = new StringSchema({ coerce: true }).setValue(3000);

    expect(schema.parse()).toBe('3000');
  });
});
