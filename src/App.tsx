import React, { useCallback, useState } from "react";
import { decryptText } from "./lib/decrypt";
import { encryptText } from "./lib/encrypt";
import { message } from "./original";
import jwk from "./rsa_key.json";

function getSize(str: string) {
  const encoder = new TextEncoder();
  return encoder.encode(str).byteLength
}

function App() {
  const [original, setOriginal] = useState(message);
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypt] = useState("");

  const encrypt = useCallback(async () => {
    const encrypted = await encryptText(jwk, original);
    setEncrypted(new TextDecoder().decode(encrypted));
    setDecrypt(await decryptText(jwk, encrypted));
  }, [original]);

  return (
    <>
      <button onClick={encrypt} data-testid="encrypt-button">Encrypt / Decrypt</button>
      <br />
      <br />
      <div style={{ display: "grid", gridTemplateColumns: "33% 33% auto", height: '90vh' }}>
        <div>
          Original text ({getSize(original)} bytes)
          <br />
          <textarea
            data-testid="original-text"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            style={{ width: '95%', height: '100%' }}
          />
        </div>
        <div>
          Encrypted data ({getSize(encrypted)} bytes)
          <br />
          <textarea
            value={encrypted}
            style={{ width: '95%', height: '100%' }}
          />
        </div>
        <div>
          Decrypted text ({getSize(decrypted)} bytes)
          <br />
          <textarea
            data-testid="decrypted-text"
            value={decrypted}
            style={{ width: '95%', height: '100%' }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
