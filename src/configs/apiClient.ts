import axios from 'axios';

export const anonymousApiClient = axios.create({
  baseURL: 'http://172.16.163.170:8080/',
  timeout: 5000
});

export const imageApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8000',
  timeout: 5000,
})

export const apiClient = axios.create({
  baseURL: 'http://172.16.163.170:8080/',
  timeout: 5000,
});