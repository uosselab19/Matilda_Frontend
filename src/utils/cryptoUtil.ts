import cryptoJs from 'crypto-js';

const secretKey = process.env.secretKey;
const iv = process.env.iv;

// 암호화
export const encrypt = (text: string) => {
  const cipher = cryptoJs.AES.encrypt(text, cryptoJs.enc.Utf8.parse(secretKey), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC
  });

  return cipher.toString();
};

// 복호화
export const decrypt = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(secretKey), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC
  });

  return decipher.toString(cryptoJs.enc.Utf8);
};
