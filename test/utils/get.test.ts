import {get} from '@/utils';

it('get', () => {
  const someObject = {
    key1: [
      {
        key2: [
          {
            key3: {
              key4: {
                key5: [
                  {
                    key6: 'value6',
                  },
                  {},
                  {
                    key7: {
                      key8: 'value8',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  };

  expect(get(someObject, 'key1[0].key2[0].key3.key4.key5[0].key6')).toBe(
    'value6',
  );
  expect(get(someObject, 'key1[0].key2[0].key3.key4.key5[2].key7.key8')).toBe(
    'value8',
  );
});
