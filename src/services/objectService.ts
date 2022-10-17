import { apiClient } from "../configs/apiClient";
import { getUserInfo } from "../utils/cookieUtil";

export const getObjectUrl = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo=getUserInfo();
    const result = await apiClient.get(
      `/objects/auth/objUrl/${itemNum}`, {
      params: undefined,
      headers: {"X-AUTH-TOKEN":userInfo.accessToken}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}