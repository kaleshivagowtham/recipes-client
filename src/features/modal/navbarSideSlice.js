import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected : 'home',
    hovered : 'home',
}

const navbarSlice = createSlice({

    name : 'navbarSideSlice',
    initialState ,
    reducers : {

        setSelected : (state , action) => {
            state.selected = action.payload;
        },
        setHovered : (state , action) => {
            state.hovered = action.payload;
        }
    }
})

export const {setSelected , setHovered} = navbarSlice.actions;

export default navbarSlice.reducer;