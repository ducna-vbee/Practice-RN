import APIClient from "@/api/client";
import { ReqResAPIKey } from "@/env";

export const authenticationService = {
    login: async(email: string,password: string) => {
        const response = await APIClient.post("/login",{
            email: email,
            password: password,
        },{
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ReqResAPIKey,
            },
        });

        return response.data;
    },
    getProfile: async() => {
        const response = await APIClient.get("/profile");

        return response.data;
    },
};