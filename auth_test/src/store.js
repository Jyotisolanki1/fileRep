import { configureStore } from "@reduxjs/toolkit";
import auth from './apis/authApis';
import userReducer from './slices/userSlice'

const store  = configureStore({
    reducer:{
        [auth.reducerPath  ]: auth.reducer,
        user :userReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
    devTools: true,
});
export default store;