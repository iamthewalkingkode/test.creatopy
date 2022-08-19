import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './store.slice';

export const store = configureStore({
    reducer: {
        store: storeSlice,
    },
})