import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    lastLoginTime: string,
    lastLogoutTime: string,
}

const initialState: UserState = {
    lastLoginTime: (new Date()).toISOString(),
    lastLogoutTime: (new Date()).toISOString(),
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.lastLoginTime = (new Date()).toISOString();
        },
        
        logout: (state) => {
            state.lastLogoutTime = (new Date()).toISOString();
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;