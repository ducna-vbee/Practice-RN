import { ApplicationToken,BaseURL } from '@/env';
import axios from 'axios';

const APIClient = axios.create({
    baseURL: BaseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "applicaiton/json",
    },
});

APIClient.interceptors.request.use(
    async (config) => {
        const token = ApplicationToken;

        if (token != null)
        {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);

        return config;
    },
    (error) => Promise.reject(error)
);

APIClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401)
        {
            console.log("Unauthorized! Redirecting to Login...");
        }
        else if (status === 404)
        {
            console.log("Resource not found.");
        }
        else if (!status)
        {
            console.log("Network Error - Check your connection.");
        }

        return Promise.reject(error);
    }
);

export default APIClient;