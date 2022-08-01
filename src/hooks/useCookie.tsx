import Cookies, { CookieSetOptions } from 'universal-cookie';
import { userInfo } from '../types/Member';

export default function useCookie() {
	const cookies = new Cookies();

	const setCookie = (name: string, value: any, option?: CookieSetOptions) => {
		return cookies.set(name, value, { ...option });
	}

	const getCookie = (name: string): userInfo | undefined => {
		return cookies.get(name);
	}

	const removeCookie = (name:string) =>{
		return cookies.remove(name);
	}

	return { setCookie, getCookie, removeCookie };
}