import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotificationOpen : false,
    notifiMessage : ''
}

const notificationSlice = createSlice({

    name : 'notificationModel',
    initialState,
    reducers : {
        closeNotification : (state) => {
            state.isNotificationOpen = false;
            state.notifiMessage = '';
        },
        openNotification : (state , action) => {
            state.isNotificationOpen = true;
            state.notifiMessage = action.payload;
            // setTimeout(() => {
            //     notificationSlice.caseReducers.closeNotification();
            // },2000)
        },
    }
})

export const {openNotification , closeNotification} = notificationSlice.actions;

export default notificationSlice.reducer;