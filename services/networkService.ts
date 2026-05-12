/* eslint-disable import/no-named-as-default-member */
import { BaseURL } from "@/env";
import axios,{ InternalAxiosRequestConfig } from "axios";


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
				data: {
					message: "I am a fake response!",
				},
				status: 200,
				statusText: "OK",
				headers: {

				},
				config,
			};
		}

		const defaultAdapter = axios.getAdapter(axios.defaults.adapter);

		return defaultAdapter(config);
	},
});

let abortController: AbortController | null = null;
let mapOfUniqueRequests = new Map<string,Promise<InternalAxiosRequestConfig<any>>>();

networkService.interceptors.request.use(async (config) => {
	console.log("Propagated request 1");

	// if (abortController != null)
	// {
	// 	abortController.abort();
	// 	console.log("🛑 Cancelled previous pending request");
	// }

	// abortController = new AbortController();
	// config.signal = abortController.signal;
	// console.log(config);

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

networkService.interceptors.request.use(async (config) => {
	console.log("Propagated request 2");

	if (config.url === "/feedback")
	{

	}

	return config;
},(error) => {
	console.log(error);

	return Promise.reject(error);
});

networkService.interceptors.request.use(async (config) => {
    console.log("Propagated request 3");
    const requestKey = `${config.method}:${config.url}`;

    if (mapOfUniqueRequests.has(requestKey) === true)
	{
        console.log("♻️ Returning existing promise for", requestKey);

        return mapOfUniqueRequests.get(requestKey) as Promise<InternalAxiosRequestConfig<any>>;
    }

    const configPromise = Promise.resolve(config);
    mapOfUniqueRequests.set(requestKey,configPromise);

    return configPromise; 
}, (error) => {
    return Promise.reject(error);
});

networkService.interceptors.response.use(null,async (error) => {
	console.log("Propagated response 1");
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
	console.log("Propagated response 2");
	const contentType = (response.headers)['content-type'];

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