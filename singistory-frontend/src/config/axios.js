import axios from 'axios';
import { API_URL } from "./env";
import { getToken } from '../service/localStorage';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.Authorization = 'Bearer ' + getToken();
        }
        return config;
    },
    err => Promise.reject(err)
)

export default axios;