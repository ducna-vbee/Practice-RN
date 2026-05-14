import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // You'll need this for type-safe selectors

interface SettingState {
    notifications: boolean;
    networkActivity: boolean;
}

const initialState: SettingState = {
    notifications: true,
    networkActivity: true,
};

const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setNetworkActivity: (state, action: PayloadAction<boolean>) => {
            state.networkActivity = action.payload;
        },
    },
});


export const { setNetworkActivity } = settingSlice.actions;
export const selectNetworkActivity = (state: RootState) => state.settings.networkActivity;
export default settingSlice.reducer;