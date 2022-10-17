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