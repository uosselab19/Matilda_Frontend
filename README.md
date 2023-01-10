# 마틸다 프론트엔드
2022년 서울시립대학교 소프트웨어 공학 연구실(UOS SELAB)에서 진행한 학부연구생 프로젝트, 마틸다(MATILDA)에 대한 설명입니다.
해당 프로젝트에 존재하는 README.md 파일은 모두 각 부분에 해당하는 설명 문서입니다.
해당 문서를 참고하여 프로젝트 진행에 도움이 될 수 있었으면 좋겠습니다.

## 개발 환경
마틸다 프론트엔드를 위해 사용한 모듈은 아래와 같습니다.

언어 - Typescript(Javascript), solidity
정적 모듈 번들러 - webpack
웹 프레임워크 - React, Bootstrap
스마트컨트랙트 프레임 워크 - caver-js
블록체인 배포 - truffle
HTTP request 모듈 - axios
인증 - jsonwebtoken, universal-cookie
환경변수 설정 - dotenv

그 밖에 package.json에 적힌 dependencies는 react, webpack 등에 필요한 라이브러리입니다.

### 프레임워크
React V6, 함수형 컴포넌트로 프론트엔드를 구성했습니다.
만약 리액트를 사용하지 않거나, 버전을 V5 이하로 가거나, 클래스형 컴포넌트로 구성한다면 참고하기 어렵습니다.
레퍼런스가 의외로 V6보다 V5가 더 많으므로(특히 History관련), 해당 부분을 고려하여 개발에 임해주세요.

## 아키텍쳐 레이어(폴더 스트럭쳐)
다음은 마틸다 프론트엔드의 구조입니다.

public - 실제 html이 올라가는 폴더입니다.
contracts - 스마트 컨트랙트를 배포하기 위한 폴더입니다.
shellscripts - CI/CD를 위한 명령어 폴더입니다.
src - 웹페이지를 위한 자원이 있는 폴더입니다. *해당 폴더의 readme를 확인해주세요.

그 밖에 파일은 모두 설정을 위한 파일입니다.

gitignore, gitlab-ci.yml - git 설정을 위한 파일
package.json, package-lock.json - node.js를 위한 파일
tsconfig.json - TS를 위한 파일
webpack.common.js, webpack.dev.js, webpack.prod.js - webpack을 위한 파일

아직 마틸다 프론트엔드는 현재 상용화한 프로그램이 아니기 때문에 prod에 대한 부분은 제대로 적용되지 않을 수 있습니다.