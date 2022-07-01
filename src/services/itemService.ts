import { SelectItem } from '../types/Item';
import { anonymousApiClient } from './apiClient';

export async function selectItem(item: SelectItem) {
  let data = undefined,
    error = undefined;

  try {
    const result = await anonymousApiClient.request({
      url: '/items',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      params: {
        catCode: item.catCode,
        maxPrice: item.maxPrice,
        memberNum: item.memberNum,
        minPrice: item.minPrice,
        skip: item.skip,
        sortKey: item.sortKey,
        sortOrder: item.sortOrder,
        stateCode: item.stateCode,
        take: item.take,
        title: item.title
      } as SelectItem
    });

    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
