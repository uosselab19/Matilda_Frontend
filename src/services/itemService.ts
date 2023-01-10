import { ChangeItem, SelectItem, UpdateItem } from '../types/Item';
import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

// 백엔드에서부터 아이템 목록을 가져오기 위해 사용하는 함수
export async function selectItems(item: SelectItem) {
  let [data, error] = [[], undefined] as any;

  try {
    // 굳이 로그인하지 않아도 아이템 목록은 볼 수 있음
    const result = await anonymousApiClient.get('/items', {
      params: item,
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

// 백엔드로부터 아이템 정보를 가져오기 위해 사용하는 함수
export const getItem = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    //굳이 로그인하지 않아도 아이템의 상세정보는 볼 수 있음
    const result = await anonymousApiClient.get(`/items/${itemNum}`, {
      params: {},
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 백엔드로부터 아이템 개수를 가져오기 위해 사용하는 함수
export const countItems = async (item: SelectItem) => {
  let [count, countError] = [undefined, undefined] as any;

  try {
    // 페이지네이션을 위한 통신이므로 로그인의 유무와는 무관
    const result = await anonymousApiClient.get(`/items/count`, {
      params: item,
      headers: {}
    });
    count = result?.data;
  } catch (err) {
    countError = err;
  }

  return { count, countError };
};

// 백엔드로부터 아이템 정보를 수정하기 위해 사용하는 함수
export const putItem = async (item: UpdateItem) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    //아이템의 정보를 변경하기 위해 로그인 정보를 확인함
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.put(`/items/auth/${item.itemNum}`, item, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 몰?루
export const changeItem = async (itemNum: number, item: ChangeItem) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 몰?루
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.put(`/items/auth/change/${itemNum}`, item, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};
