import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerusahaanImporService = axios.create({
    // baseURL: process.env.REACT_APP_USER_MANAGEMENT_API_BASE_URL,
    baseURL: "http://localhost:8000/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

PerusahaanImporService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

PerusahaanImporService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default PerusahaanImporService;