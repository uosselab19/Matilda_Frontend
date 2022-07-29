import { SelectMember } from '../types/Member';
import { anonymousApiClient, apiClient } from './apiClient';

export async function insertMember(data: any) {
  let [response, error] = [undefined, undefined];

  try {
    const result = await anonymousApiClient.post(`/members`, data);

    response = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }
  console.log(error);
  return { response, error };
}

export async function selectMember(memberID: number) {
  let [data, error] = [undefined as SelectMember | undefined, undefined];

  try {
    const result = await apiClient.get(`/members/${memberID}`);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
