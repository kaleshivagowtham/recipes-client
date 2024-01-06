import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearchModalOpen : false,
}

const searchModalSlice = createSlice({

    name : 'searchModal',
    initialState ,
    reducers : {

        closeSearchModal : (state) => {
            state.isSearchModalOpen = false;
            // console.log(false);
        },
        openSearchModal : (state) => {
            state.isSearchModalOpen = true;
            // console.log(true);
        },
    }
})

export const {closeSearchModal , openSearchModal} = searchModalSlice.actions;

export default searchModalSlice.reducer;