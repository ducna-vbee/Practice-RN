import { createSlice } from "@reduxjs/toolkit";

interface SettingState
{
    notifications: boolean,
};

const initialState: SettingState = {
    notifications: true,
};

const SettingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    },
});

export default SettingSlice;