import { apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

//3D 모델을 백엔드에서부터 가져올 때 사용하는 함수
export const getObjectUrl = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    //NFT 보호를 위해 신원확인을 요함
    const userInfo = getUserInfo();
    const result = await apiClient.get(`/objects/auth/objUrl/${itemNum}`, {
      params: undefined,
      headers: { 'X-AUTH-TOKEN': userInfo.accessToken }
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};
