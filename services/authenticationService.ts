import APIClient from "@/api/client";
import { ReqResAPIKey } from "@/env";
import * as SecureStore from 'expo-secure-store';


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
    refreshToken: async(oldToken: string) => {
        const response = await APIClient.post("/refresh-token",{
            old_token: oldToken,
        },{
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ReqResAPIKey,
            }
        })

        return response.data;
    },
    signOut: async() => {
        try 
        {
            await SecureStore.deleteItemAsync('user_token');
        }
        catch (error)
        {
            console.error("Error during sign out:", error);
        }
    },
};