import { SelectItem } from '../types/Item';
import { anonymousApiClient } from './apiClient';

export async function selectItem(item: SelectItem) {
  let [data, error] = [[], undefined];

  try {
    const result = await anonymousApiClient.get('/items', {params: item});

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
