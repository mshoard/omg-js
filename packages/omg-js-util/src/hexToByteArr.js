// convert hex to byteArr

function hexToByteArr (hex) {
  // delete 0x prefix if exists
  if (hex.includes('0x')) {
    hex = hex.replace('0x', '')
  }
  let buffered = Buffer.from(hex, 'hex')
  let uint8Value = new Uint8Array(buffered)
  return uint8Value
}

module.exports = hexToByteArr
