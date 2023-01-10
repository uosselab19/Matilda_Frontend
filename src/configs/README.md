# configs
웹페이지 개발에 사용하는 라이브러리 설정을 위한 함수 모음.

## 설명
apiClient - axios의 auth 구분(로그인을 했는지 여부)을 위해 생성한 클라이언트 모음.
Caver - 클레이튼 네트워크에 접속하기 위한 설정. (Caver에 관한 타입 정의가 없어 불가피하게 js로 사용.)
Cookie - 웹페이지 로그인 시 사용하는 쿠키 설정.
Interceptor - axios로 BE와 통신 시, 인증 키 설정과 더불어 유효성 검사 등의 에러 핸들링을 담당하는 interceptor 설정.
MatildaToken.json - 스마트 컨트랙트 마이그레이션을 위한 abi와 바이트 코드, contractAddress를 담은 json. // 정상적인 solidity 배포가 된다면 자동으로 만들어지는 코드이므로 건드릴 필요 X
