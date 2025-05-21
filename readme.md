# Digital Signature with ECDSA (secp256k1)

A simple example of generating, storing, and using digital signatures in Node.js `crypto` with EC (secp256k1) keys, where the private key is password-protected and stored in `.env` in PEM format.

---

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Passphrase example](#Passphrase-example)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Important Notes](#important-notes)
- [License](#license)

---

## Description

This project demonstrates:

- Generation of EC key pair (secp256k1) with an encrypted private key.
- Storing keys and passphrase in `.env` as PEM strings.
- Creating a digital signature for a message.
- Verifying the signature with the public key.

---

## Requirements

- Node.js 18+ (recommended)
- npm

---

## Passphrase-example:

Before installation, create a .env file. Paste this password into the file.

PRIVATE_KEY_PASSPHRASE=blockchain2025

## Installation

1. Clone the repository or download the files.

2. Install dependencies:

```bash
npm install
```

3. Generate keys and save them to .env:

```bash
npm run generate-keys
```

4. Sign a message and verify its signature:

```bash
npm sign-verify
```

## How It Works

In generateKeyPair.js, a private and public key pair is generated with a passphrase. The keys are converted to PEM strings with newline characters replaced by \n to be stored in .env.

The .env file stores keys and passphrase as environment variables.

In sign_and_verify.js, keys are loaded from .env, and \n sequences are replaced back with real newlines to restore PEM format.

The private key and passphrase are used to create a digital signature; the public key is used to verify it.

## Important Notes

The .env file contains the private key and passphrase, do not commit it to public repositories.

Use a strong passphrase and keep the .env file secure.

In real-world applications, keys are usually stored in secure key management systems (HSM, Vault, KMS).

## License

MIT License © Oleksandr
