import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice';
import loginModalReducer from '../features/modal/loginModalSlice';
import loginReducer from '../features/modal/loginSlice';
import rememberLoginReducer from '../features/modal/rememberLoginSlice';
import notificationReducer from '../features/modal/notificationSlice';
import searchModelReducer from '../features/modal/searchModalSlice';
import navbarSideReducer from "../features/modal/navbarSideSlice";
import signupModalReducer from '../features/modal/signupModalSlice';

export const store = configureStore({

    reducer : {
        modal : modalReducer,
        loginModal : loginModalReducer,
        loggedIn : loginReducer,
        rememberLogin : rememberLoginReducer,
        notificationModel : notificationReducer,
        searchModal : searchModelReducer,
        navbarSideSlice : navbarSideReducer,
        signupModal : signupModalReducer
    }
});