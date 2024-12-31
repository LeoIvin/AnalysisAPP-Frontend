import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: API_URL
});

// Add the interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication methods
export const login = async (username, password) => {
    try {
        const response = await api.post('api/login/', { 
            username: username,
            password: password 
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response || error);
        throw error;
    }
};

export const register = async (email, username, password) => {
    try {
        const response = await api.post('api/signup/', { 
            username,
            email, 
            password
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Register error:', error.response || error);
        throw error;
    }
};

// Data fetching methods
export const getData = async () => {
    try {
        const response = await api.get('api/data/');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response || error);
        throw error;
    }
};

// File upload method
export const uploadSalesFile = async (formData) => {
    try {
        const response = await api.post('/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Upload response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Upload error:', error.response || error);
        throw error;
    }
};

// Fetch sales summary
export const fetchSalesSummary = async (summaryId) => {
    try {
        const response = await api.get(`/get/summary/${summaryId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sales summary:', error.response || error);
        throw error;
    }
};

export default api;