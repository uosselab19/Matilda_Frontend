import { UpdateMember, UpdateMemberKlaytn } from '../types/Member';
import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

export const insertMember = async (member: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await anonymousApiClient.post(
      `/members`,
      member,
      { headers: {} }
    );
    data = result?.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
}

export const selectMember = async (memberID: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const result = await apiClient.get(
      `/members/${memberID}`, {
      params: undefined,
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const putMember = async (member: UpdateMember) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw "userInfo is not exists";
    
    const result = await apiClient.put(
      `/members/auth/${member.memberNum}`,
      member,
      { headers: { "X-AUTH-TOKEN": userInfo.accessToken } }
    );
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export const putMemberKlaytn = async (memberNum: number, member: UpdateMemberKlaytn) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    const userInfo = getUserInfo();
    console.log(userInfo);
    if (!userInfo) throw "userInfo is not exists";

    const result = await apiClient.put(
      `/members/auth/klaytn/${memberNum}`,
      member,
      { headers: { "X-AUTH-TOKEN": userInfo.accessToken } }
    );
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

