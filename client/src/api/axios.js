import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 15000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const msg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            'Network error';
        return Promise.reject(new Error(msg));
    }
);

export default api;
