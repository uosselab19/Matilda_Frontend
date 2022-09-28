import { anonymousApiClient } from '../configs/apiClient';
import { SelectContract } from '../types/Contract';

export async function selectContract(contract: SelectContract) {
  let [data, error] = [[], undefined] as any;

  try {
    const result = await anonymousApiClient.get('/contracts', { params: contract});
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}