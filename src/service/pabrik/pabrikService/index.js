import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PabrikService = axios.create({
    // baseURL: process.env.REACT_APP_USER_MANAGEMENT_API_BASE_URL,
    baseURL: "https://propensi-a08-be-production.up.railway.app/api/pabrik/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

PabrikService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

PabrikService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default PabrikService;