//Main Transaction Function
const newTx = require('./newTx')
const { hash, signature, zeroSignature, singleSign, signedEncode } = require('./signature')
const signatureDigest = require('./sigDigest')
const { rlpEncodeArr, ArrToUint8 } = require('./rlp')
const { base16Encode, base16Decode } = require('./base16')

var methods = ['sendTxWithPrive']

let alicePriv = Buffer.from( new Uint8Array([165, 253, 5, 87, 255, 90, 198, 97, 236, 75, 74, 205, 119, 102, 148, 243, 213, 102, 3, 104, 36, 251, 206, 152, 50, 114, 92, 65, 154, 84, 48, 47]))

const amount1 = 7
const amount2 = 3
const blknum1 = 66004001
const blknum2 = 0
const oindex1 = 0
const oindex2 = 0
const txindex1 = 0
const txindex2 = 0
const cur12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const newowner1 = [116, 90, 78, 212, 118, 51, 233, 165, 245, 155,
    19, 234, 50, 191, 20, 131, 178, 219, 41, 65]
const newowner2 = [101, 166, 194, 146, 88, 167, 6, 177, 55, 187, 239, 105, 27, 233, 12, 165, 29, 47, 182, 80]

const _inputs = [{blknum1, txindex1, oindex1}]

const _currency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const _outputs = [{newowner1, amount1},{newowner2, amount2}]

var omg = async (method, inputs, currency, outputs, privKey) => {
        try {
            //creates new transaction object
            let transactionBody = await newTx(inputs, currency, outputs)
            //sign transaction
            let signedTx = await singleSign(transactionBody, alicePriv)
            //encode transaction with RLP
            let obj = signedTx.raw_tx
            let rlpEncodedTransaction = await signedEncode(obj, signedTx.sig1, signedTx.sig2) 
            //encode transaction with base16
            let base16 = await base16Encode(rlpEncodedTransaction)
            //submit via JSON RPC
        }   
        catch(err){
            console.log(err)
        }
}
  
omg('sendTxWithPrive', _inputs, _currency, _outputs)

module.exports = omg

//F8D18403EF2421808080808094000000000000000000000000000000000000000094745A4ED47633E9A5F59B13EA32BF1483B2DB2941079465A6C29258A706B137BBEF691BE90CA51D2FB65003B841ACF06FEB9F1824D07D90684DA4BBB5D413052849D5C239D192BF623ECB7D9E8D76D64E9A297B921F6F09B07BED01E2D3FC8B69A61BAD05147D4A971EA37DEE1B1CB8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//F8D18403EF2421808080808094000000000000000000000000000000000000000094745A4ED47633E9A5F59B13EA32BF1483B2DB2941079465A6C29258A706B137BBEF691BE90CA51D2FB65003B841ACF06FEB9F1824D07D90684DA4BBB5D413052849D5C239D192BF623ECB7D9E8D76D64E9A297B921F6F09B07BED01E2D3FC8B69A61BAD05147D4A971EA37DEE1B1CB8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000