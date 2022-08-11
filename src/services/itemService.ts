import { SelectItem, SelectItemwithMember } from '../types/Item';
import { anonymousApiClient, apiClient } from './apiClient';

export async function selectItem(item: SelectItem) {
  let [data, error] = [[], undefined] as any;

  try {
    const result = await anonymousApiClient.get('/items', { params: item });
    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const getItem = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.get(`/items/${itemNum}`);
    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}

export const selectItemMember = async (item: SelectItemwithMember) => {
  let [data, error] = [[], undefined] as any;

  try {
    const result = await apiClient.get(`/items/user/${item.memberNum}`, { data: item });

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
