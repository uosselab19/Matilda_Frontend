import axios from 'axios';

export const anonymousApiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8080/',
  timeout: 5000
});

export const imageApiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8100',
  timeout: 5000,
})

export const apiClient = axios.create({
  baseURL: 'http://www.matilda-hanium.click:8080/',
  timeout: 5000,
});

// http://3.133.233.81
//'http://172.16.163.170:8080/'