import { BaseURL } from '@/env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const APIClient = axios.create({
    baseURL: BaseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

let userTokenRefreshState = false;
let failedResponseQueue: any[] = [];

function processQueue(error: any, token: string | null = null)
{
    failedResponseQueue.forEach(element => {
        if (error != null)
        {
            element.reject(error);
        }
        else
        {
            element.resolve(token);
        }
    });
    failedResponseQueue = [];
}

APIClient.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('user_token');

        if (token != null)
        {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

        return config;
    },
    (error) => Promise.reject(error),
);

APIClient.interceptors.response.use(
    response => response,
    async (error) => {
        const status = error.response ? error.response.status : null;
        const originalRequest = error.config;

        if (status == null)
        {
            console.log("Network error! Check your connection.");
        }
        else if (status === 400)
        {
            console.log("Bad request!");
        }
        else if (status === 401)
        {
            const userToken = await SecureStore.getItemAsync('user_token');

            if (userToken !== null && originalRequest.retry === false)
            {
                if (userTokenRefreshState === true)
                {
                    return new Promise((resolve,reject) => {
                        failedResponseQueue.push({ resolve,reject });
                    })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return APIClient(originalRequest);
                    })
                    .catch(error => Promise.reject(error));
                }

                originalRequest.retry = true;
                userTokenRefreshState = true;

                try
                {
                    const localAxios = axios.create({
                        baseURL: BaseURL,
                    });
                    const response = await localAxios.post("/refresh-token",{ old_token: userToken });
                    const newToken = response.data['user_token'];
                    await SecureStore.setItemAsync('user_token',newToken);
                    processQueue(null,newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return APIClient(originalRequest);
                }
                catch (refreshError)
                {
                    processQueue(refreshError,null);
                    await SecureStore.deleteItemAsync('user_token');
                    return Promise.reject(refreshError);
                }
                finally
                {
                    userTokenRefreshState = false;
                }
            }
        }
        else if (status === 403)
        {
            console.log("Resource is not accessible!");
        }
        else if (status === 404)
        {
            console.log("Resource not found.");
        }

        return Promise.reject(error);
    }
);

export default APIClient;