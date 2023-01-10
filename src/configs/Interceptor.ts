import { AxiosError, AxiosResponse } from 'axios';
import { refreshMember } from '../services/securityService';
import { alertError } from '../utils/alertUtil';
import { setUserInfo } from '../utils/cookieUtil';
import { apiClient, imageApiClient } from './apiClient';

// 인터셉터 기능 디버깅 시에 에러 코드를 확인하기 위함
export const interceptorHandledError = 'Interceptor Handled Error';

// 백엔드 연동을 위해 액시오스를 사용함
// 이때 액시오스는 인터셉터를 불러와서 백엔드 응답을 전처리 해주는데 그에 대한 코드
const interceptResponse = async (value: any) => {
  let error: any;
  try {
    console.log(value);
    console.log('qwer');
  } catch (err) {
    error = err;
  }

  if (error) return await interceptError(error);
  return value;
};

// 인터셉터 처리 중 에러가 발생하면 실행되는 함수
// 꼭 에러응답을 처리할 때 사용되는 건 아니고 인터셉터 내에서 에러가 나도 실행됨
const interceptError = async (error: AxiosError) => {
  const response = error?.response as AxiosResponse;

  /*
  해당 주석은 프론트 엔드 개발 당시에 아이디어를 적어둔 부분.
  따로 구현하진 않았는데, 개발에 참고될 만한 내용이 포함되어 있어서 그냥 남겨뒀어요~
  // error code 로 분석하는 것도 괜찮을 것 같음
  // "ECONNABORTED" : timeout error
  // "ERR_BAD_RESPONSE" : response 잘못 받았을 떄 생기는 오류인 듯
  // "ERR_NETWORK" : 네트워크 서버가 꺼져있으면 이렇게 되는 듯!
  */


  if (!response) console.log('error response does not exist.');
  else if (!response.data) console.log('error response exists, but response data does not exist.');
  else {
    if (response.status === 401) {
      console.log('error 401');
      console.log(error.code);
      if (confirm('인증이 만료되었습니다. 이동하시겠습니까?')) {
        //갱신을 위한 부분. 해당 부분도 백엔드와 통신하므로 마찬가지로 인터셉터를 호출함(이 부분을 주의해서 개발하셔야 합니다 ㅠㅠ)
        const { data, error } = await refreshMember(false);
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        if (data) {
          setUserInfo(data);
        }

        return;
      }
    }
  }

  const message = response?.data?.message || error.message;
  alertError(error.name, message); // 에러 메시지 출력

  return Promise.reject(interceptorHandledError);
};

// 실제로 액시오스로부터 인터셉터를 불러오는 함수
// 이 부분은 App 컴포넌트에서 호출함 (훅이 아님을 주의!)
export const AxiosInterceptorSetup = () => {
  apiClient.interceptors.response.use(
    (value: any) => interceptResponse(value),
    (error: AxiosError) => interceptError(error)
  );

  imageApiClient.interceptors.response.use(
    (value) => interceptResponse(value),
    (error: AxiosError) => interceptError(error)
  );
};