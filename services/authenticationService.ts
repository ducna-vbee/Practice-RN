import APIClient from "@/api/client";
import { ReqResAPIKey } from "@/env";
import * as SecureStore from 'expo-secure-store';


export const authenticationService = {
    signIn: async(email: string,password: string) => {
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

            return null;
        }
        catch (error)
        {
            return ("Error during sign out: `" + JSON.stringify(error) + "`.");
        }
    },
    resetPassword: async(email: string,newPassword: string) => {
        const response = await APIClient.post("/reset-password",{
            email: email,
            new_password: newPassword,
        },{
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ReqResAPIKey,
            },
        });

        return response.data;
    },
};