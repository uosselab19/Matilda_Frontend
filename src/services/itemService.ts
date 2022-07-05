import { SelectItem } from '../types/Item';
import { anonymousApiClient } from './apiClient';

export async function selectItem(item: SelectItem) {
  let data = undefined,
    error = undefined;

  try {
    const result = await anonymousApiClient.get('/items', {
      data: item,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
