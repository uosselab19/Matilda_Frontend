import { anonymousApiClient } from './apiClient';

export async function signinMember(info: any) {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.get(`/security/login`, info);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
