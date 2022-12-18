import { appendBuffers } from "../utils";

export async function encryptText(jwk: any, message: string) {
  const encoder = new TextEncoder();
  return await encrypt(jwk, encoder.encode(message));
}

export async function importPublicKey(jwk: any): Promise<CryptoKey> {
  const keyData = {
    kty: "RSA",
    e: "AQAB",
    n: jwk.n,
    alg: "RSA-OAEP-256",
    ext: true,
  };
  const algo = { name: "RSA-OAEP", hash: { name: "SHA-256" } };
  return await window.crypto.subtle.importKey("jwk", keyData, algo, false, [
    "encrypt",
  ]);
}

export async function encrypt(
  jwk: any,
  data: BufferSource
): Promise<ArrayBuffer> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const key = window.crypto.getRandomValues(new Uint8Array(32));

  const aes_key = await window.crypto.subtle.importKey(
    "raw",
    key.buffer,
    "AES-CTR",
    false,
    ["encrypt"]
  );

  const encrypted_content = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: iv,
      length: 128,
    },
    aes_key,
    data
  );

  const rsa_public_key = await importPublicKey(jwk);

  var encrypted_key = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    rsa_public_key,
    key
  );

    // 16 bytes + 512 bytes + content

  return appendBuffers(appendBuffers(iv, encrypted_key), encrypted_content);
}
