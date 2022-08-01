import Cookies, { CookieSetOptions } from 'universal-cookie';

export default function useCookie() {
	const cookies = new Cookies();

	const setCookie = (name: string, value: any, option: CookieSetOptions | undefined) => {
		return cookies.set(name, value, { ...option });
	}
	
	const getCookie = (name: string) => {
		return cookies.get(name);
	}

	return { cookies, setCookie, getCookie };
}