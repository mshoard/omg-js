// Test for Base16 Encode and Decode function
// Test Case based on Demo1 in omg repo

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('chai').assert
const { base16Encode, base16Decode } = require('../src/transaction/base16')

describe('Base16 functions', () => {
  it('should encode base16', () => {
    let arr = [67, 130, 252, 224, 225, 60, 202, 236, 180, 106, 224, 167, 220, 6, 21, 177, 111, 165, 222, 42, 172, 26, 255, 49, 246, 112, 38, 80, 182, 28, 237, 26]
    let hashAnswer = '4382FCE0E13CCAECB46AE0A7DC0615B16FA5DE2AAC1AFF31F6702650B61CED1A'
    let encodedArr = base16Encode(arr)

    assert.equal(encodedArr, hashAnswer)
  })
  it('should decode base16', () => {
    let encoded = '4382FCE0E13CCAECB46AE0A7DC0615B16FA5DE2AAC1AFF31F6702650B61CED1A'
    let decodedAnswer = [67, 130, 252, 224, 225, 60, 202, 236, 180, 106, 224, 167, 220, 6, 21, 177, 111, 165, 222, 42, 172, 26, 255, 49, 246, 112, 38, 80, 182, 28, 237, 26]

    let decodedHash = base16Decode(encoded)
    assert.deepEqual(decodedHash, decodedAnswer)
  })
})
