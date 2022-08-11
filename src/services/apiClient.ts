import axios from 'axios';

export const anonymousApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000
});

export const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 1000,
});

export const imageApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8000',
  timeout: 1*1000,
})