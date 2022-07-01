import axios from 'axios';

export const anonymousApiClient = axios.create({
  timeout: 1000,
  proxy: {
    host: '3.133.233.81',
    port: 8080
  }
});

export const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
