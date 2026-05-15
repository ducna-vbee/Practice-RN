import { createAsyncThunk,createSelector,createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

import { authenticationService } from "@/services/authenticationService";
import { RootState } from '@/store';


interface UserState
{
    email: string,
    password: string,
    token: string | null,
    loading: boolean,
    error: string | null,
    lastLoginTime: string,
    lastLogoutTime: string,
    deletionSession: {
        id: string | null;
        timeLeft: number;
        isProcessing: boolean;
    };
};

const initialState: UserState = {
    email: "",
    password: "",
    loading: false,
    error: null,
    token: null,
    lastLoginTime: (new Date()).toISOString(),
    lastLogoutTime: (new Date()).toISOString(),
    deletionSession: {
        id: null,
        timeLeft: 0,
        isProcessing: false,
    },
};

function updateLoginStateAfterSigningIn(state: any,data: any): void
{
    state.email = data.email;
    state.password = data.password;
    state.token = data.token;
    state.lastLoginTime = new Date().toISOString();
};

function updateLoginStateAfterSigningOut(state: any): void
{
    state.email = "";
    state.password = "";
    state.token = null;
    state.lastLogoutTime = new Date().toISOString();
};

export const selectUser = (state: RootState) => state.user;

export const selectAuthenticatedStatus = createSelector([selectUser],(user) => {
    const result: boolean = ((user.token !== null) && (user.token.length > 0));
    console.log("Authentication: `" + result + "`.");

    return result;
});

export const signUserUp = createAsyncThunk("user/register",async ({ email,password,age,type }: { email: string,password: string,age: number,type: string },thunkAPI) => {
    try
    {
        const response = await authenticationService.signUp(email,password,age,type);

        return {
            email: email,
            token: response['token'],
            loading: false,
            error: null,
        };
    }
    catch
    {
        return thunkAPI.rejectWithValue({
            message: "Failed to sign up!",
        });
    }
});

export const signUserIn = createAsyncThunk('user/login',async ({ email,password }: { email: string,password: string },thunkAPI) => {
    try
    {
        const response = await authenticationService.signIn(email,password);
        const token = response['token'];
        console.log(token);

        if (token != null)
        {
            await SecureStore.setItemAsync('user_token',token);
        }

        return {
            email: email,
            token: token,
            loading: false,
            error: null,
        };
    }
    catch
    {
        return thunkAPI.rejectWithValue({
            message: "Failed to sign in!",
        });
    }
});

export const signUserOut = createAsyncThunk('user/logut',async (_,thunkAPI) => {
    try
    {
        const response = await authenticationService.signOut();

        return {
            email: "",
            token: null,
            loading: false,
            error: response,
        };
    }
    catch (error)
    {
        return thunkAPI.rejectWithValue({
            message: error,
        });
    }
});

export const requestUserAccountDeletion = createAsyncThunk("user/request-delete",async ({ email }: { email: string },thunkAPI) => {
    try
    {
        const response = await authenticationService.requestDeleteAccount(email);

        return {
            session_id: response['session_id'],
        };
    }
    catch (error)
    {
        return thunkAPI.rejectWithValue({
            message: error,
        });
    }
});

export const performUserAccountDeletion = createAsyncThunk("user/confirm-delete",async({sessionID,reason}: {sessionID: string,reason: string},thunkAPI) => {
    try
    {
        const response = await authenticationService.performAccountDeletion(sessionID,reason);

        return {
            response: response,
        };
    }
    catch (error)
    {
        return thunkAPI.rejectWithValue({
            message: error,
        });
    }
});

export const updateToken = createAsyncThunk("user/update-token",async ({ newToken }: { newToken: string },thunkAPI) => {
    return {
        token: newToken,
    };
});

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleLogin: (state,action) => updateLoginStateAfterSigningIn(state,action.payload),
        handleLogout: (state) => updateLoginStateAfterSigningOut(state),
        setDeletionSession: (state, action) => {
            state.deletionSession.id = action.payload;
            state.deletionSession.timeLeft = 30;
        },
        updateDeletionTimer: (state) => {
            if (state.deletionSession.timeLeft > 0) {
                state.deletionSession.timeLeft -= 1;
            }
        },
        clearDeletionSession: (state) => {
            state.deletionSession = initialState.deletionSession;
        },
        updateLastLoginTime: (state) => {
            state.lastLoginTime = (new Date()).toISOString();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUserUp.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signUserUp.fulfilled,(state,action) => {
            updateLoginStateAfterSigningIn(state,action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(signUserUp.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(signUserIn.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signUserIn.fulfilled,(state,action) => {
            updateLoginStateAfterSigningIn(state,action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(signUserIn.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(signUserOut.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signUserOut.fulfilled,(state,action) => {
            updateLoginStateAfterSigningOut(state);
            state.loading = false;
            state.error = null;
        })
        .addCase(signUserOut.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateToken.pending,(state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateToken.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(updateToken.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(requestUserAccountDeletion.pending,(state,action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(requestUserAccountDeletion.fulfilled,(state,action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(requestUserAccountDeletion.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { handleLogin,handleLogout,setDeletionSession,updateDeletionTimer,clearDeletionSession,updateLastLoginTime } = UserSlice.actions;
export default UserSlice.reducer;