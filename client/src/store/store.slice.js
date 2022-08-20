import { createSlice } from '@reduxjs/toolkit';
import { delStorage, getStorage, getStorageJson, setStorage, setStorageJson } from 'utils';

const user = getStorageJson('user') || {};
const token = getStorage('token') || '';

const initialState = {
    auth: {
        user,
        token,
        isLoggedIn: user.id && token ? true : false,
    },
    items: [],
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        loggUserIn: (state, { payload: { token, user } }) => {
            setStorage('token', token);
            setStorageJson('user', user);
            state.auth.user = user;
            state.auth.token = token;
            state.auth.isLoggedIn = true;
        },
        loggUserOut: (state) => {
            delStorage('user');
            delStorage('token');
            state.auth.user = {};
            state.auth.token = '';
            state.auth.isLoggedIn = false;
        }
    },
})

export const { loggUserIn, loggUserOut } = storeSlice.actions;

export default storeSlice.reducer;