import axios from 'axios';

export const anonymousApiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 3000
});

export const apiClient = axios.create({
  baseURL: 'http://3.133.233.81:8080',
  timeout: 3000,
  headers: {
    'REFRESH-TOKEN': '',
    'X-AUTH-TOKEN': ''
  }
});
