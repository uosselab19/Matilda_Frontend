import { AxiosError, AxiosResponse } from "axios";
import { refreshMember } from "../services/securityService";
import { alertError } from "../utils/alertUtil";
import { setUserInfo } from "../utils/cookieUtil";
import { apiClient, imageApiClient } from "./apiClient";

export const interceptorHandledError = "Interceptor Handled Error";

const interceptResponse = async (value: any) => {
	let error: any;
	try {
		console.log(value);

	} catch (err) {
		error = err;
	}

	if (error) return await interceptError(error);
	return value;
}

const interceptError = async (error: AxiosError) => {
	const response = error?.response as AxiosResponse;

	// error code 로 분석하는 것도 괜찮을 것 같음
	// "ECONNABORTED" : timeout error
	// "ERR_BAD_RESPONSE" : response 잘못 받았을 떄 생기는 오류인 듯
	// "ERR_NETWORK" : 네트워크 서버가 꺼져있으면 이렇게 되는 듯!

	if (!response) console.log("error response does not exist.");
	else if (!response.data) console.log("error response exists, but response data does not exist.");
	else {
		if (response.status === 401) {
			console.log("error 401");
			console.log(error.code);
			if (confirm("인증이 만료되었습니다. 이동하시겠습니까?")) {
				const { data, error } = await refreshMember(false);
				if (error) {
					console.log(error);
					return;
				}
				console.log(data);
				if (data) { setUserInfo(data); }

				return;
			}
		}
	}

	const message = response?.data?.message || error.message;
	alertError(error.name, message); // 에러 메시지 출력

	return Promise.reject(interceptorHandledError);
}

export const AxiosInterceptorSetup = () => {
	apiClient.interceptors.response.use(
		(value: any) => interceptResponse(value),
		(error: AxiosError) => interceptError(error));

	imageApiClient.interceptors.response.use(
		(value) => interceptResponse(value),
		(error: AxiosError) => interceptError(error));
}

// async function interceptResponse(response: any) {
// 	let error: any;
// 	try {
// 		if (!response?.headers) {
// 			throw new Error(`Expected 'response' and 'response.headers' not to be undefined`);
// 		}

// 		const userInfo: UserInfo = getUserInfo();
// 		if (!userInfo) {
// 			throw new Error(`Expected 'userInfo' not to be undefined`);
// 		}

// 		console.log("asdf");
// 		console.log(response);
// 		anonymousApiClient.defaults.headers["X-AUTH-TOKEN"] = userInfo.accessToken;
// 		const result = await anonymousApiClient.post('/security/validCheck', { headers: { "X-AUTH-TOKEN": userInfo.accessToken } })
// 		console.log(result);
// 	} catch (err) {
// 		error = err;
// 	}

// 	delete anonymousApiClient.defaults.headers["X-AUTH-TOKEN"];

// 	if (error) await interceptError(error);
// 	return response;
// }