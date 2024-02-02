import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersApi } from '../../../services/adminServices';




const initialState = {
    userData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const getAllUsers = createAsyncThunk(
    "admin/get-all-users",
    async () =>{
        try{
            const response = await getAllUsersApi()
            return response.data
        }catch(error){
            throw error
        }
    }
)

export const adminUserSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bannerData = action.payload;
                state.message = "";
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});



