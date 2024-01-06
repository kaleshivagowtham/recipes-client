import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSignupModalOpen : false,
}

const signupModalSlice = createSlice({

    name : 'signupModal',
    initialState,
    reducers : {
        openSignupModal : (state) => {
            state.isSignupModalOpen = true;
        },
        closeSignupModal : (state) => {
            state.isSignupModalOpen = false;
        }
    }
})

export const {openSignupModal , closeSignupModal} = signupModalSlice.actions;

export default signupModalSlice.reducer;