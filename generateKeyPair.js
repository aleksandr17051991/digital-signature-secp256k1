'use strict';

const crypto = require('crypto');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const curve = 'secp256k1';
const secret = process.env.PRIVATE_KEY_PASSPHRASE;

if (!secret) {
  throw Error("Don't find secret!");
}

// generate private + public keys by using "secp256k1"
const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: curve,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: secret,
  },
});

// prepare string for .env
const PUBLIC_KEY = publicKey.replace(/\n/g, '\\n');
const PRIVATE_KEY = privateKey.replace(/\n/g, '\\n');

const envContent = [
  `PUBLIC_KEY=${PUBLIC_KEY}`,
  `PRIVATE_KEY=${PRIVATE_KEY}`,
  `PRIVATE_KEY_PASSPHRASE=${secret}`,
].join('\n');

fs.writeFileSync('.env', envContent);

console.log(
  '✅ Done! Public Key, Private Key, Passphrase are generated and written in .env'
);
