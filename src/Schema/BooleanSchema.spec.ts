import { BooleanSchema } from './BooleanSchema';

describe('Boolean Schema', () => {
  it('should throw error when value is not boolean', () => {
    const schema = new BooleanSchema({ coerce: false }).setValue('3000');
    schema.key = 'key';

    expect(() => schema.validate()).toThrow(
      new TypeError(
        'Invalid configuration: The "key" expected to be "boolean" but a "string" was provided',
      ),
    );
  });

  it('should fallback to default', () => {
    const schema = new BooleanSchema({
      default: true,
      coerce: false,
    }).setValue();
    const schema2 = new BooleanSchema({
      default: true,
      coerce: false,
    }).setValue(undefined);
    const schema3 = new BooleanSchema({ default: true }).setValue();
    const schema4 = new BooleanSchema({ default: true }).setValue(undefined);

    expect(schema.parse()).toBe(true);
    expect(schema2.parse()).toBe(true);
    expect(schema3.parse()).toBe(true);
    expect(schema4.parse()).toBe(true);
  });

  it('should coercion to boolean', () => {
    const schema = new BooleanSchema().setValue('1');
    const schema2 = new BooleanSchema().setValue(0);

    expect(schema.parse()).toBe(true);
    expect(schema2.parse()).toBe(false);
  });

  it('should parse string to boolean', () => {
    const schema = new BooleanSchema().setValue('true');
    const schema2 = new BooleanSchema().setValue('false');

    expect(schema.parse()).toBe(true);
    expect(schema2.parse()).toBe(false);
  });

  it('should parse false case-insensitive', () => {
    const schema = new BooleanSchema().setValue('FaLsE');

    expect(schema.parse()).toBe(false);
  });

  it('should parse 0 to false', () => {
    const schema = new BooleanSchema().setValue('0');

    expect(schema.parse()).toBe(false);
  });
});
