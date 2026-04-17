import APIClient from "@/api/APIClient";
import { AxiosResponse } from "axios";

export interface SampleJSONData
{
    userId: number,
    id: number,
    title: string,
    body: string,
};

export const SampleJSONDataServices = {
    fetch: async(): Promise<SampleJSONData[]> => {
        const response: AxiosResponse<SampleJSONData[],any,object> = await APIClient.get<SampleJSONData[]>("/posts");

        return response.data;
    },
};