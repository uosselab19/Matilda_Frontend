import { UpdateMember, UpdateMemberKlaytn } from '../types/Member';
import { anonymousApiClient, apiClient } from '../configs/apiClient';
import { getUserInfo } from '../utils/cookieUtil';

// 백엔드에 멤버정보를 입력하기 위해 사용하는 함수
// 회원가입에 필요
export const insertMember = async (member: any) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 회원가입할 때는 회원이 아니기 때문에 로그인정보가 있을 수 없음
    const result = await anonymousApiClient.post(`/members`, member, { headers: {} });
    data = result?.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};

// 백엔드에 멤버 목록을 불러오기 위해 사용하는 함수
export const selectMember = async (memberID: number) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 멤버 목록을 불러오는 건 관리자급 명령임
    const result = await apiClient.get(`/members/${memberID}`, {
      params: undefined,
      headers: {}
    });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 백엔드에 멤버 정보를 변경하기 위해 사용하는 함수
export const putMember = async (member: UpdateMember) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 변경할 수 있는 멤버 정보는 자신밖에 없음
    // 로그인 확인을 반드시 해야함
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.put(`/members/auth/${member.memberNum}`, member, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

// 클레이튼 지갑을 입력하기 위해 사용하는 함수
export const putMemberKlaytn = async (memberNum: number, member: UpdateMemberKlaytn) => {
  let [data, error] = [undefined, undefined] as any;

  try {
    // 지갑을 넣는 건 자기자신에게 해야 함
    const userInfo = getUserInfo();
    if (!userInfo) throw 'userInfo is not exists';

    const result = await apiClient.put(`/members/auth/klaytn/${memberNum}`, member, { headers: { 'X-AUTH-TOKEN': userInfo.accessToken } });
    data = result?.data;
  } catch (err) {
    error = err;
  }

  return { data, error };
};
