import { Config } from './Config';
import type { Equals, Expect } from './types';

describe('Config', () => {
  it('should parse nested object', () => {
    const config = new Config({
      s: Config.string(),
      n: Config.number().required(),
      foo: Config.object({
        foo1: Config.string().required(),
        foo2: Config.object({ foo3: Config.boolean() }),
      }),
    })
      .parse({
        s: 's',
        n: 0,
        foo: { foo1: 'foo1', foo2: { foo3: false } },
      })
      .getAll();

    expect(config).toEqual({
      s: 's',
      n: 0,
      foo: { foo1: 'foo1', foo2: { foo3: false } },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = Expect<
      Equals<
        typeof config,
        {
          s: string | undefined;
          n: number;
          foo: { foo1: string; foo2: { foo3: boolean | undefined } };
        }
      >
    >;
  });
});
