import { imageApiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

// 백엔드로부터 이미지를 백엔드로 집어넣기 위해 사용하는 함수
export async function postImage(image: {}) {
  let [data, error] = [undefined, undefined] as any;
  try {
    // 유저 쿠키 정보가 필요함
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const form = new FormData(); // 형식을 맞추기 위해 사용
    Object.keys(image).forEach((e) => {
      form.append(e, image[e]);
    });

    // 로그인 정보가 필요함
    const result = await imageApiClient.post('/convert', form, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

// 백엔드에서부터 받아온 이미지 링크 얻어오는 함수
export async function getCID(itemNum: number) {
  let [data, error] = [undefined, undefined] as any;
  try {
    // 유저 쿠키 정보가 필요함
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const form = new FormData(); // 형식을 맞추기 위해 사용
    form.append('num', itemNum.toString());

    // 로그인 정보가 필요함
    const result = await imageApiClient.post('/getCID', form, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err?.response || err?.message;
  }

  return { data, error };
}
