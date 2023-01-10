import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

// 로그인을 위한 함수
export const signinMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/security/login`, info, { headers: {} });

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 로그인 갱신을 위한 함수
// 보안을 위해 로그인 토큰을 두 개 사용하여 관리
export const refreshMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.post(`/security/refresh`, info, {
      headers: { 'X-AUTH-TOKEN': userInfo.accessToken, 'REFRESH-TOKEN': userInfo.refreshToken }
    });

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 로그아웃을 위한 함수
export const signoutMember = async () => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.post(`/security/auth/logout`, undefined, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 로그인 갱신 전 로그인 정보가 유효한지 확인하는 함수
// 액세스토큰의 수명은 1시간 정도로 상당히 짧게 잡음
export const vaildCheckMember = async () => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.post(`/security/vaildCheck`, undefined, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
};
