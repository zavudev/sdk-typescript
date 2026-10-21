import { stringifyQuery } from '@zavudev/sdk/internal/utils/query';

describe(stringifyQuery, () => {
  for (const [input, expected] of [
    [{ a: '1', b: 2, c: true }, 'a=1&b=2&c=true'],
    [{ a: null, b: false, c: undefined }, 'a=&b=false'],
    [{ 'a/b': 1.28341 }, `${encodeURIComponent('a/b')}=1.28341`],
    [
      { 'a/b': 'c/d', 'e=f': 'g&h' },
      `${encodeURIComponent('a/b')}=${encodeURIComponent('c/d')}&${encodeURIComponent(
        'e=f',
      )}=${encodeURIComponent('g&h')}`,
    ],
    // The API reads a repeated key (`?tag=vip&tag=chile`); `tag=vip,chile`
    // is one tag named "vip,chile".
    [{ tag: ['vip', 'chile'] }, 'tag=vip&tag=chile'],
  ] as const) {
    it(`${JSON.stringify(input)} -> ${expected}`, () => {
      expect(stringifyQuery(input)).toEqual(expected);
    });
  }
});
