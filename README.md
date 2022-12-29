# jwk-encrypt

Encrypt and decrypt your data using JSON Web Key (JWK). Implemented using [Web Crypto Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), [RSA-OAEP](https://datatracker.ietf.org/doc/html/rfc3447), [AES-CTR](https://csrc.nist.gov/publications/detail/sp/800-38a/final).

## Encrypt / decrypt message with JWK

```
import { encryptText, decryptText } from "jwk-encrypt"
 
const encryptedMessage = await encryptText(jwk, "Message to encrypt");
const originalMessage = await decryptText(jwk, encryptedMessage);
```

`jwk` is an object in JWK format like

```
{
  "kty": "RSA",
  "n": "ws-5Ln...",
  "e": "AQAB",
  "d": "L4QdBe...",
  "p": "8uNw393yPhDyf9...",
  "q": "zVPjt08rxLgZ...",
  "dp": "5tFNSvFYa...",
  "dq": "BcCP5J...",
  "qi": "StxIGos3..."
}
```

The message will be encrypted with random 256-bit key using [AES-CTR](https://csrc.nist.gov/publications/detail/sp/800-38a/final) algorithm. The key itself will be encrypted using [RSA-OAEP](https://datatracker.ietf.org/doc/html/rfc3447) with the public part of the key from provided JWK. As a result it returns combination of a counter (16 bytes), the encrypted with RSA random key (512 bytes) and the encrypted content.


## Encrypt / decrypt data with JWK

```
import { encrypt, decrypt } from "jwk-encrypt"
 
const encryptedData = await encrypt(jwk, data); 
const originalData = await decrypt(jwk, encryptedData);
```

## Scripts

In the project directory, you can run:

### `yarn start`

Demo UI to play with the encryption

### `yarn build`

Builds the library for production to the `dist` folder.
