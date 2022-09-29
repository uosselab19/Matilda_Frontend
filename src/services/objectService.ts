import { apiClient } from "../configs/apiClient";

export const getObjectUrl = async (itemNum: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.get(`/objects/auth/objUrl/${itemNum}`);
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}