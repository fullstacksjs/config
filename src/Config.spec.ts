import { describe, expect, it } from 'vitest';
import { Config } from './Config';

describe('Config', () => {
  it('should exist', () => {
    const config = Config;

    expect(config).toBeTruthy();
  });
});
