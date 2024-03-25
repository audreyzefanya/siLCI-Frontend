import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadService = axios.create({
    // baseURL: process.env.REACT_APP_USER_MANAGEMENT_API_BASE_URL,
    baseURL: "https://propensi-a08-be-production.up.railway.app/api/",
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

FileUploadService.interceptors.request.use(
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

FileUploadService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.data.code === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            const navigateTo = useNavigate();
            navigateTo("/login")
        }
        return Promise.reject(error);
    }
);

export default FileUploadService;