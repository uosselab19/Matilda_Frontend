import { anonymousApiClient } from '../configs/apiClient';

// 백엔드에서 거래내역을 가져오기 위해 사용하는 함수
export const getHistories = async (param: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 거래내역은 로그인 정보가 필요 없음
    const result = await anonymousApiClient.get(`histories`, {
      params: param,
      headers: {}
    });

    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};
