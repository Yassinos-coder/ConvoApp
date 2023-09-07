import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const AddNewUser = createAsyncThunk('users/AddNewUser', async({newUser}) => {
    try {
        const response = await AxiosConfig.post('/users/newUserCreation', newUser)
        return response.data
    } catch (err) {
        console.log(`Error in AddNewUser Reducer ${err}`)
    }
})

const UserReducer = createSlice({
    name: 'UserHandler',
    initialState : {
        userData: [],
        status: '',
        error: '',
    },
    reducers: {},
    extraReducers : (builder) => {
        builder 
            .addCase(AddNewUser.fulfilled, (state, action ) => {
                state.userData = action.payload.userData
                state.status = action.payload.message
            })
            .addCase(AddNewUser.pending, (state, action ) => {
                state.status = 'pending'
            })
            .addCase(AddNewUser.rejected, (state, action ) => {
                state.status = action.payload.message
            })
    }

})

export default UserReducer.reducer