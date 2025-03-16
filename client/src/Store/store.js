import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import loaderReducer from './loaderSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        loader: loaderReducer,
    }
});

export default store;
