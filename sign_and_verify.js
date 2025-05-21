'use strict';

const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const message = 'Blockchain Security';

const pubKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
const privKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const passphrase = process.env.PRIVATE_KEY_PASSPHRASE;

// ( 1 ) Hash user's message like Bitcoin
function hashMessage(data) {
  return crypto.createHash('sha256').update(data).digest(); // digest() === Buffer
}
const hashedUserMessage = hashMessage(message);
console.log(`🔑 Message hash: ${hashedUserMessage.toString('hex')}`);

// ( 2 ) create signature for message
function createSignature(data, privKey, secret) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  sign.end();

  return sign.sign({
    key: privKey,
    passphrase: secret,
  });
}

const msgSign = createSignature(hashedUserMessage, privKey, passphrase);
console.log(`✍️ Signature: ${msgSign.toString('hex')}`);

// ( 3 ) verify signature by using Public Key
function verifySignature(data, sign, pubKey) {
  const verifyMsg = crypto.createVerify('SHA256');
  verifyMsg.update(data);
  verifyMsg.end();

  return verifyMsg.verify(pubKey, sign);
}

if (verifySignature(hashedUserMessage, msgSign, pubKey)) {
  console.log('✅ Signature is valid!');
} else {
  console.log('❌ Signature is invalid!');
}
