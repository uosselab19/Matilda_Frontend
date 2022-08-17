import { userInfo } from "../types/Member";
import { apiClient, imageApiClient } from "./apiClient";

  export const setApiClientHeaders = (jwt: userInfo) => {
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

  export const setImageApiClientHeaders = (jwt: userInfo) => {
    if (!jwt) { return console.log("asdf"); }

    imageApiClient.interceptors.request.use(function (config) {
      if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
      }
      
      config.headers['REFRESH-TOKEN'] = jwt.refreshToken;
      config.headers['X-AUTH-TOKEN'] = jwt.accessToken;
      return config;
    });
  };