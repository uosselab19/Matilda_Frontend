import { anonymousApiClient, apiClient } from './apiClient';

export const insertMember = async (data: any) => {
  let [response, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(`/members`, data);
    response = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }
  console.log(error);
  return { response, error };
}

export const selectMember = async (memberID: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.get(`/members/${memberID}`);
    data = result?.data;

  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const putMember = async (memberID: number, info: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.put(`/members/${memberID}`, { data: info });
    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
