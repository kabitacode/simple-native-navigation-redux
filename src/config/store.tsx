import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/auth';
import reduxStorage from './storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const rootReducer = combineReducers({
    auth: authReducer
});

const persistConfig = {
    key: "root",
    version: 1,
    storage: reduxStorage,
    timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export const reduxProvider = (Component: any) => (props: any) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...props}/>
        </PersistGate>
    </Provider>
);


export default store;