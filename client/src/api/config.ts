import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (!!token && config.headers) {
        config.headers.Authorization = `bearer ${token}`;
    }
    return config;
});
