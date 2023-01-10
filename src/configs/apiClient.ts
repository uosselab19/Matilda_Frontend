import axios from 'axios';

// 로그인 유무와 baseURL을 구분하기 위해 세 개로 구별해둠
// 시간은 ms 단위, 3D Conversion때 timeout이 걸리면 백엔드에서 정상적으로 정보를 주더라도 에러처리할 수 있음
// 5초면 충분히 에러없이 잘 받아서 잡아뒀으나 3초로 줄여도 큰 차이는 없음
// baseURL은 백엔드 담당자께 받아서 사용하세요~
export const anonymousApiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8080/',
  timeout: 5000
});

export const imageApiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8100',
  timeout: 5000
});

export const apiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8080/',
  timeout: 5000
});
