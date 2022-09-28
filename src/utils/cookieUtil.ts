import { CookieSetOptions } from "universal-cookie";
import { cookies, userInfoKey } from "../configs/Cookie";

export function setCookie(name: string, value: any, option?: CookieSetOptions) {
    return cookies.set(name, value, { ...option });
}

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string, option?: CookieSetOptions) => {
    return cookies.remove(name, { ...option });
};

export const setUserInfo = (value: any, option?: any) => setCookie(userInfoKey, value, { ...option });
export const getUserInfo = () => getCookie(userInfoKey);
export const removeUserInfo = (option?: any) => removeCookie(userInfoKey, {...option});
