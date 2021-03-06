const newTransaction = require('./transaction/newTx')
const { singleSign, signedEncode } = require('./transaction/signature')
const { base16Encode } = require('./transaction/base16')
const submitTx = require('./transaction/submitRPC')
const watcherApi = require('./watcherApi')
const { hexToByteArr, byteArrToBuffer, InvalidArgumentError } = require('@omisego/omg-js-util')
global.Buffer = global.Buffer || require('buffer').Buffer


class ChildChain {
  /**
  *Interact with Tesuji Plasma Childchain from JavaScript (Node.js and Browser)
  *
  *@param {string} watcherUrl contains the url of the watcher server
  *@param {string} childChainUrl contains the url of the childchain server to communicate with
  *@return {object} Childchain Object
  *
  */
  constructor (watcherUrl, childChainUrl) {
    this.watcherUrl = watcherUrl
    this.childChainUrl = childChainUrl
  }
  /**
   * generate, sign, encode and submit transaction to childchain (refer to examples/node-sendTx.js for example inputs)
   *
   * @method sendTransaction
   * @param {array} inputs
   * @param {array} currency
   * @param {array} outputs
   * @param {string} privateKey private key for signer (in hex with '0x' prefix)
   * @return {object} success/error message with `tx_index`, `tx_hash` and `blknum` params
   */

  async sendTransaction (inputs, currency, outputs, privKey) {
    // Validate arguments
    validateInputs(inputs)
    validateCurrency(currency)
    validateOutputs(outputs)
    validatePrivateKey(privKey)

    // turns 2 hex addresses input to 2 arrays
    outputs[0].newowner1 = Array.from(hexToByteArr(outputs[0].newowner1))
    outputs[1].newowner2 = Array.from(hexToByteArr(outputs[1].newowner2))
    // turn privkey string to addr
    privKey = byteArrToBuffer(hexToByteArr(privKey))
    // creates new transaction object
    let transactionBody = newTransaction(inputs, currency, outputs)
    // sign transaction
    let signedTx = singleSign(transactionBody, privKey)
    // encode transaction with RLP
    let obj = signedTx.raw_tx
    let rlpEncodedTransaction = signedEncode(obj, signedTx.sig1, signedTx.sig2)
    // encode transaction with base16
    let base16 = base16Encode(rlpEncodedTransaction)
    // submit via JSON RPC
    return submitTx(base16, this.childChainUrl)
  }

  /**
   * Obtain UTXOs of an address
   *
   * @method getUtxos
   * @param {String} address
   * @return {array} arrays of UTXOs
   */

  async getUtxos (address) {
    validateAddress(address)
    return watcherApi.get(`${this.watcherUrl}/utxos?address=${address}`)
  }

  /**
   * Get the balance of an address
   *
   * @method getBalance
   * @param {String} address
   * @return {array} array of balances (one per currency)
   */

  async getBalance (address) {
    validateAddress(address)
    return watcherApi.get(`${this.watcherUrl}/account/${address}/balance`)
  }
}

function validateInputs (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateOutputs (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateCurrency (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validatePrivateKey (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateAddress (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

module.exports = ChildChain
