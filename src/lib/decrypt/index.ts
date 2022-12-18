export function importPrivateKey(jwk: any): Promise<CryptoKey> {
  const w = Object.create(jwk);
  w.alg = "RSA-OAEP-256";
  w.ext = true;

  const algo = { name: "RSA-OAEP", hash: { name: "SHA-256" } };

  return window.crypto.subtle.importKey("jwk", w, algo, false, ["decrypt"]);
}

export async function decryptText(
  jwk: any,
  data: ArrayBuffer
): Promise<string> {
  const decoder = new TextDecoder();
  return decoder.decode(await decrypt(jwk, data));
}

export async function decrypt(
  jwk: any,
  data: ArrayBuffer
): Promise<ArrayBuffer> {
  const ivSize = 16;
  const keySize = 512;

  const iv = data.slice(0, ivSize);
  const key = data.slice(ivSize, ivSize + keySize);
  const content = data.slice(ivSize + keySize);

  const rsaPublicKey = await importPrivateKey(jwk);

  const aesRawKey = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    rsaPublicKey,
    key
  );

  const aesKey = await crypto.subtle.importKey(
    "raw",
    aesRawKey,
    "AES-CTR",
    false,
    ["decrypt"]
  );

  return await window.crypto.subtle.decrypt(
    {
      name: "AES-CTR",
      counter: iv,
      length: 128,
    },
    aesKey,
    content
  );
}
