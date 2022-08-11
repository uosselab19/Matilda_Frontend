import axios from 'axios';
import { userInfo } from '../types/Member';

export const anonymousApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000
});

export const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000,
  headers: {
    'REFRESH-TOKEN': '',
    'X-AUTH-TOKEN': ''
  }
});

export const setApiClientHeader = (jwt: SigninResponse) => {
  apiClient.defaults.headers['REFRESH-TOKEN'] = jwt.refreshToken;
  apiClient.defaults.headers['X-AUTH-TOKEN'] = jwt.accessToken;
}

export const setClientHeaders = (jwt: userInfo | undefined) => {
  if (!jwt) { return console.log("asdf"); }
  apiClient.interceptors.request.use(function (config) {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    
    config.headers['REFRESH-TOKEN'] = jwt.refreshToken;
    config.headers['X-AUTH-TOKEN'] = jwt.accessToken;
    return config;
  });
};