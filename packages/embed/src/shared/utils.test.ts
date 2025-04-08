import { describe, expect, it } from 'vitest'
import { camelCase, mapKeysTo, snakeCase } from './utils'

describe('mapKeysTo', () => {
  it('should transform keys and values correctly', () => {
    const input = {
      foo_bar: 42,
      baz_qux: {
        nested_key: 'value'
      },
      arr: [1, 2, { nested: 'array' }]
    }

    const transformKey = (key: string) => key.toUpperCase()
    const result = mapKeysTo(transformKey, input)

    expect(result).toEqual({
      FOO_BAR: 42,
      BAZ_QUX: {
        NESTED_KEY: 'value'
      },
      ARR: [1, 2, { NESTED: 'array' }]
    })
  })
})

describe('camelCase', () => {
  it('should transform string correctly', () => {
    const input = 'foo_bar'

    const result = camelCase(input)

    expect(result).toEqual('fooBar')
  })
})

describe('snakeCase', () => {
  it('should transform string correctly', () => {
    const input = 'fooBar'

    const result = snakeCase(input)

    expect(result).toEqual('foo_bar')
  })
})
