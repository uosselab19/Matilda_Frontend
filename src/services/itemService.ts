import { ChangeItem, SelectItem, UpdateItem } from '../types/Item';
import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

export async function selectItems(item: SelectItem) {
  let [data, error] = [[], undefined] as any;

  try {
    const result = await anonymousApiClient.get(
      '/items', {
      params: item,
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const getItem = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.get(
      `/items/${itemNum}`, {
      params: {},
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const countItems = async (item: SelectItem) => {
  let [count, countError] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.get(
      `/items/count`, {
      params: item,
      headers: {}
    });
    count = result?.data;
  } catch (err) {
    countError = err;
  }

  return { count, countError };
}

export const putItem = async (item: UpdateItem) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw "userInfo is not exists";

    const result = await apiClient.put(
      `/items/auth/${item.itemNum}`,
      item,
      { headers: { "X-AUTH-TOKEN": userInfo.accessToken } }
    );
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const changeItem = async (itemNum: number, item: ChangeItem) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw "userInfo is not exists";

    const result = await apiClient.put(
      `/items/auth/change/${itemNum}`,
      item,
      { headers: { "X-AUTH-TOKEN": userInfo.accessToken } }
    );
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}