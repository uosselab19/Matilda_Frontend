import { anonymousApiClient, apiClient } from '../configs/apiClient';

export const signinMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/security/login`, info);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const refreshMember = async (info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.post(`/security/refresh`, info);

    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const signoutMember = async () => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.post(`/security/auth/logout`);
    data = result?.data as SigninResponse | undefined;
  } catch (err) {
    error = err;
  }

  return { data, error };
}