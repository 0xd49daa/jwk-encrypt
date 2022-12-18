export const toBase64 = (array: any) => Buffer.from(array).toString('base64')
export const fromBase64 = (string: any) => Buffer.from(string, 'base64').buffer

export const appendBuffers = (buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer => {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};
