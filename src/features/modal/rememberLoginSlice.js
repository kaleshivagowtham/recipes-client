import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rememberUser : false,
}

const rememberLoginSlice = createSlice({
    name : 'rememberLogin',
    initialState,
    reducers : {
        rememberTheUser : (state) => {
            state.rememberUser = !state.rememberUser;
        },
    }
})

export const {rememberTheUser} = rememberLoginSlice.actions;

export default rememberLoginSlice.reducer;