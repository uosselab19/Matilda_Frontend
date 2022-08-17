import useCookie from '../hooks/useCookie';
import { anonymousApiClient, apiClient } from './apiClient';
import { setApiClientHeaders } from './axiosInterceptors';

export const signinMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/security/login`, info);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const refreshMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;
  const { getCookie } = useCookie();

  try {
    const cookie=getCookie();
    if(!cookie) throw "noCookie";

    const result = await apiClient.post(`/security/refresh`, info);
    setApiClientHeaders(cookie);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const signoutMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;
  const { getCookie } = useCookie();

  try {
    const cookie=getCookie();
    if(!cookie) throw "noCookie";

    const result = await apiClient.post(`/security/auth/logout`);
    setApiClientHeaders(cookie);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}