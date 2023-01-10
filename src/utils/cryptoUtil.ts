import cryptoJs from 'crypto-js';

//secretKey와 iv 값은 환경설정에서부터 가져오는 상수
const secretKey = process.env.secretKey;
const iv = process.env.iv;

/* 암호화 방식은 AES(CBC) 방식, padding은 PKCS #7 방식을 사용한다. */

// 암호화
export const encrypt = (text: string) => {
  const cipher = cryptoJs.AES.encrypt(text, cryptoJs.enc.Utf8.parse(secretKey), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC // Cipher Block Chaining
  });

  return cipher.toString();
};

// 복호화
export const decrypt = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(secretKey), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC // Cipher Block Chaining
  });

  return decipher.toString(cryptoJs.enc.Utf8);
};
