import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const apiClinet = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClinet.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});


export default apiClinet;
