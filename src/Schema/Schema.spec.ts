import { GuardError } from '../Guard';
import { Schema } from './Schema';

describe('Schema', () => {
  it('should throw if a required config is undefined', () => {
    const schema = new Schema({
      type: 'string',
      typeConstructor: String,
    }).required();
    schema.key = 'port';

    expect(() => schema.validate()).toThrow(
      new GuardError(
        `Invalid configuration: The "port" is required but the given value is "undefined"`,
      ),
    );
  });

  it('should use default value when value is undefined', () => {
    const schema = new Schema({
      type: 'string',
      typeConstructor: String,
      default: '3000',
    }).setValue();

    expect(schema.parse()).toBe('3000');

    const schema2 = new Schema({
      type: 'string',
      typeConstructor: String,
      default: '3000',
    }).setValue(undefined);

    expect(schema2.parse()).toBe('3000');
  });

  it('should use type constructor for type coercion', () => {
    const schema = new Schema<any, string>({
      type: 'string',
      typeConstructor: v => `parsed ${v}`,
      default: '3000',
      coerce: true,
    }).setValue(3000);

    expect(schema.parse()).toBe('parsed 3000');
  });
});
