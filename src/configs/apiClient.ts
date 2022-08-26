import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { UserInfo } from '../types/Member';
import { getCookie, removeCookie } from './Cookie';
import { history } from './history';

const anonymousApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000
});

const imageApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8000',
  timeout: 6000,
})

const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 3000,
});


function interceptRequest(config: AxiosRequestConfig) {
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }

  const userInfo: UserInfo = getCookie("userInfo");

  if (!userInfo) {
    throw new Error(`Expected 'userInfo' not to be undefined`);
  }

  config.headers['REFRESH-TOKEN'] = userInfo?.refreshToken;
  config.headers['X-AUTH-TOKEN'] = userInfo?.accessToken;
  return config;
}

function interceptError(error: AxiosError) {
  const response = error?.response;

  if (response?.status === 401) {
    console.log("error 401");
    if (confirm("인증이 만료되었습니다. 이동하시겠습니까?")) {
      removeCookie("userInfo");
      history.push("/");
      return
    }
  }

  return Promise.reject(error);
}

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => interceptRequest(config),
  (error: AxiosError) => interceptError(error));
imageApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => interceptRequest(config),
  (error: AxiosError) => interceptError(error));

export { anonymousApiClient, imageApiClient, apiClient }