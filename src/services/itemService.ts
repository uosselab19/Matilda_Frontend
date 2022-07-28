import { SelectItem, SelectItemwithMember } from '../types/Item';
import { anonymousApiClient, apiClient } from './apiClient';

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

export async function getItem(itemNum: number) {
  let [data, error] = [undefined, undefined];

  try {
    const result = await anonymousApiClient.get(`/items/${itemNum}`);

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}


export async function selectItemwithMember(memberID:number, item: SelectItemwithMember) {
  let [data, error] = [[], undefined];

  try {
    const result = await apiClient.get(`/items/user/${memberID}`, {data: item});

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
