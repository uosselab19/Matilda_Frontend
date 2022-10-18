import { CookieSetOptions } from 'universal-cookie';
import { cookies, userInfoKey } from '../configs/Cookie';

export const setCookie = (name: string, value: any, option?: CookieSetOptions) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: CookieSetOptions) => {
  return cookies.remove(name, { ...option });
};

export const setUserInfo = (value: any, option?: any) => setCookie(userInfoKey, value, { ...option });
export const getUserInfo = () => getCookie(userInfoKey);
export const removeUserInfo = (option?: any) => removeCookie(userInfoKey, { ...option });

//base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
//jwt-decode 안 쓰고, 맛깔나는 커스텀 함수를 통해 decode작업을 진행할 예정
export const getUserInfoByToken = (data: SigninResponse) => {
  const result = JSON.parse(Buffer.from(data.accessToken.split('.')[1], 'base64').toString());
  return {
    ...result,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};
