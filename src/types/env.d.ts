// 마틸다 프론트엔드를 구동하기 위해 사용되는 민감한 개인정보를 담은 타입
// 해당 타입은 모두 값이 존재해야 하고
// 어느 하나라도 노출되면 해당 키는 반드시 폐기해야 함
declare namespace NodeJS {
  interface ProcessEnv {
    IMAGESTORAGE: string;
    rpcURL: string;
    providerURL: string;
    address: string;
    privateKey: string;
    s3AccessKeyID: string;
    s3SecretAccessKey: string;
    secretKey: string;
    iv: string;
  }
}
