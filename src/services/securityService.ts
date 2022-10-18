import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

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
