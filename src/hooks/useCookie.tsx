import Cookies, { CookieSetOptions } from 'universal-cookie';
import { userInfo } from '../types/Member';

export default function useCookie() {
	const cookies = new Cookies();

	const setCookie = (value: any, option?: CookieSetOptions) => {
		return cookies.set("userInfo", value, { ...option });
	}

	const getCookie = (): userInfo | undefined => {
		return cookies.get("userInfo");
	}

	const removeCookie = () => {
		return cookies.remove("userInfo");
	}

	return { setCookie, getCookie, removeCookie };
}