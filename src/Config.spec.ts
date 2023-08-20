import { describe, expect, it } from 'vitest';
import { Config } from './Config';
import { GuardError } from './Guard';

describe('Config', () => {
  it('should create a string schema', () => {
    const config = new Config({
      port: Config.string().require(),
    }).parse({ port: '3000' });

    expect(config.getAll()).toEqual({ port: '3000' });
  });

  it('should throw if a required config is undefined', () => {
    const config = new Config({
      port: Config.string().require(),
    });

    expect(() => config.parse({})).toThrow(
      new GuardError(
        `Invalid configuration: The "port" is required but the given value is "undefined"`,
      ),
    );
  });

  it('should use default value when config is undefined', () => {
    const config = new Config({
      port: Config.string({ default: '3000' }),
    }).parse({});

    expect(config.getAll()).toEqual({ port: '3000' });
  });

  it('should allow for type coercion.', () => {
    const config = new Config({
      port: Config.string({ coerce: true }),
    }).parse({ port: 3000 });

    expect(config.getAll()).toEqual({ port: '3000' });
  });
});
