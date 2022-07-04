import { anonymousApiClient } from './apiClient';

export async function selectMember(memberID: number) {
  let data = undefined, error = undefined;

  try {
    const result = await anonymousApiClient.get(`/members${memberID}`);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
