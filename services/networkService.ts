/* eslint-disable import/no-named-as-default-member */
import { BaseURL } from "@/env";
import axios from "axios";

const networkService = axios.create({
    baseURL: BaseURL,
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json',
    },
    validateStatus: function (status) {
        return ((status >= 200) && (status < 300));
    },
    adapter: async (config) => {
        if (config.url === '/mock-success')
        {
            return {
                data: { message: "I am a fake response!" },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            };
        }
        
        if (axios.defaults.adapter === undefined)
        {
            return undefined;
        }
        else
        {
            return (axios.defaults.adapter as any[])[0]; 
        }
    }
});

let abortController: AbortController | null = null;

networkService.interceptors.request.use(async (config) => {
    if (abortController != null)
    {
        abortController.abort();
        console.log("🛑 Cancelled previous pending request");
    }

    abortController = new AbortController();
    config.signal = abortController.signal;

    config.data = {
        startTime: new Date(),
    };

    console.log(`🚀 [Request] ${config.method?.toUpperCase()} ${config.url}`);
    config.headers['X-Request-Timestamp'] = String(Date.now());

    return config;
},(error) => {
    console.error("❌ [Request Error]",error);

    return Promise.reject(error);
});

networkService.interceptors.response.use(null,async (error) => {
    const { config } = error;
    console.log(error);

    if (!config || !config.retryCount)
    {
        config.retryCount = 0;
    }

    if ((config.retryCount < 3) && (error.code === 'ECONNABORTED'))
    {
        config.retryCount += 1;
        const delay = Math.pow(2,config.retryCount) * 1000;
        console.log(`🔄 Retrying... Attempt ${config.retryCount} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve,delay));

        return networkService(config);
    }

    return Promise.reject(error);
});

networkService.interceptors.response.use(async (response) => {
    const contentType = response.headers['content-type'];

    if (contentType != null && (contentType as string).includes('application/json') === false)
    {
        console.warn(`Warning: Expected JSON but got ${contentType}`);
    }

    if (response.status === 404)
    {
        console.log("Page is not accessible!");
    }

    const rtt = new Date().getTime() - response.config.data.startTime.getTime();
    console.log(`✅ [Response] ${response.status} - ${rtt}ms`);

    return response;
},(error) => {
    console.log(JSON.stringify(error));

    if (axios.isAxiosError(error) != null)
    {
        if (error.response !== undefined)
        {
            console.log("Server Error Data:",error.response.data);
            console.log("Status:",error.response.status);
        }
        else if (error.request !== undefined)
        {
            console.log("No response received. Please check internet connection or time-out.");
        }
        else
        {
            console.log("Setup Error:",error.message);
        }
    }

    return Promise.reject(error);
});

export default networkService;