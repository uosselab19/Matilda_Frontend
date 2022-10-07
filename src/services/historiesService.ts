import { anonymousApiClient } from '../configs/apiClient';

export const getHistories = async (param: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.get(
      `histories`, {
      params: param,
      headers: {}
    });

    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}