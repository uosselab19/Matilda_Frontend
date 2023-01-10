import { anonymousApiClient } from '../configs/apiClient';
import { SelectContract } from '../types/Contract';

// 액시오스와 컨트렉트 목록을 가져오기 위해 사용하는 함수
export async function selectContract(contract: SelectContract) {
  let [data, error] = [[], undefined] as any;

  try {
    // 컨트렉트는 로그인 정보가 필요 없음
    const result = await anonymousApiClient.get('/contracts', {
      params: contract,
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}
