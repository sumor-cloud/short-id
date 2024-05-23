import { describe, expect, it } from '@jest/globals'
import encode from '../src/encode.js'
import decode from '../src/decode.js'
import { encode as encode2, decode as decode2 } from '../src/index.js'

describe('short-id', () => {
  it('encode', () => {
    const rule = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
    expect(encode(0, rule)).toBe('0')
    expect(encode(1, rule)).toBe('1')
    expect(encode(10, rule)).toBe('a')
    expect(encode(61, rule)).toBe('Z')
    expect(encode(62, rule)).toBe('10')
    expect(encode(63, rule)).toBe('11')
    expect(encode(72, rule)).toBe('1a')
    expect(encode(3844, rule)).toBe('100')
  })
  it('decode', () => {
    const rule = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
    expect(decode('0', rule)).toBe(0)
    expect(decode('1', rule)).toBe(1)
    expect(decode('a', rule)).toBe(10)
    expect(decode('Z', rule)).toBe(61)
    expect(decode('10', rule)).toBe(62)
    expect(decode('11', rule)).toBe(63)
    expect(decode('1a', rule)).toBe(72)
    expect(decode('100', rule)).toBe(3844)
  })
  it('encode and decode', () => {
    const rule = '0123456789abcdefghigklmnopqrstuvwxyz'
    expect(encode2(0, rule)).toBe('0')
    expect(decode2('0', rule)).toBe(0)
    expect(encode2(1, rule)).toBe('1')
    expect(decode2('1', rule)).toBe(1)
    expect(encode2(10, rule)).toBe('a')
    expect(decode2('a', rule)).toBe(10)
    expect(encode2(35, rule)).toBe('z')
    expect(decode2('z', rule)).toBe(35)
    expect(encode2(36, rule)).toBe('10')
    expect(decode2('10', rule)).toBe(36)
    expect(encode2(37, rule)).toBe('11')
    expect(decode2('11', rule)).toBe(37)
    expect(encode2(46, rule)).toBe('1a')
    expect(decode2('1a', rule)).toBe(46)
    expect(encode2(71, rule)).toBe('1z')
    expect(decode2('1z', rule)).toBe(71)
    expect(encode2(72, rule)).toBe('20')
    expect(decode2('100', rule)).toBe(1296)

    expect(encode2(54, '01z8ab')).toBe('180')
    expect(encode2(59, '01z8ab')).toBe('18b')

    expect(encode2(59)).toBe('X')
    expect(decode2('X')).toBe(59)
  })
})
