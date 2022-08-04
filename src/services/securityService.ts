import { anonymousApiClient, apiClient } from './apiClient';

export const signinMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/security/login`, info);

    data = result?.data as SigninResponse | undefined;
    apiClient.defaults.headers["REFRESH-TOKEN"] = data.refreshToken;
    apiClient.defaults.headers["X-AUTH-TOKEN"] = data.accessToken;

    console.log(data);
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const updateMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.post(`/security/refresh`, info);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const signoutMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.post(`/security/auth/logout`);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}