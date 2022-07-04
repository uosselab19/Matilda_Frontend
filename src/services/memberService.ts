import { SelectMember } from '../types/Member';
import { anonymousApiClient } from './apiClient';

export async function selectMember(member: SelectMember) {
  let data = undefined, error = undefined;

  try {
    const result = await anonymousApiClient.get('/members', {});

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
