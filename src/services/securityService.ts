import useCookie from '../hooks/useCookie';
import { anonymousApiClient, apiClient, setApiClientHeader, setClientHeaders } from './apiClient';

export const signinMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/security/login`, info);

    data = result?.data as SigninResponse | undefined;
    setApiClientHeader(data);
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const refreshMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;
  const { getCookie } = useCookie();

  try {
    const result = await apiClient.post(`/security/refresh`, info);
    setClientHeaders(getCookie());

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
    const result = await apiClient.post(`/security/auth/logout`);
    setClientHeaders(getCookie());

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}