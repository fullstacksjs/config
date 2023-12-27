import { Config } from './Config';
import type { Equals, Expect } from './types';

describe('Config', () => {
  it('should parse nested object', () => {
    const config = new Config({
      s: Config.string(),
      n: Config.number().required(),
      nested: Config.object({
        foo1: Config.string().required(),
        foo2: Config.object({ foo3: Config.boolean() }),
      }),
      arr: Config.array(Config.string()),
    }).parse({
      s: 's',
      n: 0,
      nested: { foo1: 'foo1', foo2: { foo3: false } },
      arr: ['a', 'b'],
    });

    const configs = config.getAll();
    const nested = config.get('nested');
    const foo2 = config.get('nested.foo2');
    const foo3 = config.get('nested.foo2.foo3');

    expect(configs).toEqual({
      s: 's',
      n: 0,
      nested: { foo1: 'foo1', foo2: { foo3: false } },
      arr: ['a', 'b'],
    });
    expect(nested).toEqual({ foo1: 'foo1', foo2: { foo3: false } });
    expect(foo2).toEqual({ foo3: false });
    expect(foo3).toBe(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = Expect<
      Equals<
        typeof configs,
        {
          s: string | undefined;
          n: number;
          nested: { foo1: string; foo2: { foo3: boolean | undefined } };
          arr: string[];
        }
      >
    >;
  });
});
