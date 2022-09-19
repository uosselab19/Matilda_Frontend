import axios from 'axios';

export const anonymousApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080/',
  timeout: 3000
});

export const imageApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8100',
  timeout: 30000,
})

export const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080/',
  timeout: 3000,
});