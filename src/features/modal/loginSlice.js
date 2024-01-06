import { createSlice } from "@reduxjs/toolkit";
import useLocalStorage from '../../utils/useLocalStorage';

const initialState = {
    isLoggedIn : false,
    userEmail : '',
    userName : '',
    jwt_auth_token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token") ? useLocalStorage.getItemFromLocalStorage("jwt_auth_token") : ''
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state , action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.name;
            state.userEmail = action.payload.email;
        },
        tokenAction : (state, action) => {
            if(state.jwt_auth_token === '')
                state.jwt_auth_token = action.payload;
            useLocalStorage.setItemInLocalStorage("jwt_auth_token",action.payload);
        },
        logoutAction : (state) => {
            state.isLoggedIn = false;
            state.userName = '';
            state.userEmail = '';
            state.jwt_auth_token = '';
            useLocalStorage.removeItemFromLocalStorage("jwt_auth_token");
        }
    }
})

export const { loginAction ,logoutAction, tokenAction } = loginSlice.actions;

export default loginSlice.reducer;