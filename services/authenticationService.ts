import APIClient from "@/api/client";

export const authenticationService = {
    login: async(email: string,password: string) => {
        const response = await APIClient.post("/api/login");

        return response.data;
    },
    getProfile: async() => {
        const response = await APIClient.get("/api/profile");

        return response.data;
    },
};