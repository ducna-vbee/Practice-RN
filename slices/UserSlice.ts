import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import { authenticationService } from "@/services/authenticationService";

interface UserState {
    email: string,
    password: string,
    token: string | null,
    loading: boolean,
    error: any,
    lastLoginTime: string,
    lastLogoutTime: string,
}

const initialState: UserState = {
    email: "",
    password: "",
    loading: false,
    error: null,
    token: null,
    lastLoginTime: (new Date()).toISOString(),
    lastLogoutTime: (new Date()).toISOString(),
};

export const loginUser = createAsyncThunk('user/login',async ({ email,password }: any,thunkAPI) => {
    try
    {
        const response = await authenticationService.login(email,password);
        return response.token; // This becomes the 'payload' in 'fulfilled'
    }
    catch (error: any)
    {
        // This becomes the 'payload' in 'rejected'
        return thunkAPI.rejectWithValue("Invalid Credentials");
    }
});

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
            state.lastLoginTime = (new Date()).toISOString();
        },

        logout: (state) => {
            state.email = "";
            state.password = "";
            state.token = null;
            state.lastLogoutTime = (new Date()).toISOString();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { login,logout } = UserSlice.actions;
export default UserSlice.reducer;