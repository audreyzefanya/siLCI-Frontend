import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BarangService = axios.create({
    // baseURL: process.env.REACT_APP_USER_MANAGEMENT_API_BASE_URL,
    baseURL: "https://propensi-a08-be-production.up.railway.app/",
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

BarangService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BarangService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default BarangService;