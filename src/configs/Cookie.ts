import Cookies, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();

export function setCookie (name: string, value: any, option?: CookieSetOptions) {
    return cookies.set(name, value, { ...option });
}

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string, path: string = "/") => {
    return cookies.remove(name, { path });
};

const userInfoKey = "userInfo"

export const setUserInfo = (value: any, option?: any) => setCookie(userInfoKey, value, { ...option });
export const getUserInfo = () => getCookie(userInfoKey);
export const removeUserInfo = (path: string = "/") => removeCookie(userInfoKey, path = path);
