import { combineReducers,configureStore } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { TypedUseSelectorHook,useDispatch,useSelector } from 'react-redux';
import {
    FLUSH,
    PAUSE,PERSIST,
    persistReducer,
    persistStore,
    PURGE,REGISTER,
    REHYDRATE
} from 'redux-persist';
import userReducer from "./slices//UserSlice";


const reduxPersistSecureStorage = {
    setItem: (key: string,value: string) => {
        return SecureStore.setItemAsync(key,value);
    },
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
    },
};

const persistConfig = {
    key: 'root',
    storage: reduxPersistSecureStorage,
    whitelist: ['user'],
    blacklist: ['loading','error'],
};

const rootReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore Redux Persist internal actions (they use non-serializable values)
                ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;