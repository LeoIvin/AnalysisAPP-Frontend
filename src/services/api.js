import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: API_URL
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
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
        throw error;
    }
};

// Data fetching methods
export const getData = async () => {
    try {
        const response = await api.get('api/data/');
        return response.data;
    } catch (error) {
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
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch sales summary
export const fetchSalesSummary = async (summaryId) => {
    try {
        const response = await api.get(`/get/summary/${summaryId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get latest summary
export const getSummary = async () => {
    try {
        const response = await api.get('api/summary/');
        return response.data; 
    } catch (error) {
        throw error;
    }
};

// Profile endpoints
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.get('profile/', {
            headers: { 
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Log the FormData contents for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await api.patch('profile/update/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json',
                // Let axios set the Content-Type automatically for FormData
            }
        });
        return response;
    } catch (error) {
        console.error('Profile update error:', error.response?.data || error.message);
        throw error;
    }
};

// Dashboard stats endpoint
export const getDashboardStats = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.get('api/dashboard/stats/', {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;