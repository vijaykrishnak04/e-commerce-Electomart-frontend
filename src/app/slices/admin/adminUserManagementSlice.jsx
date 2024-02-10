import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersApi, updateStatusApi } from '../../../services/adminServices';




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
    async () => {
        try {
            const response = await getAllUsersApi()
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const blockAndUnblock = createAsyncThunk(
    "admin/update-status",
    async ({ id, status }) => {
        try {
            const response = await updateStatusApi({ id, status })
            return response.data
        } catch (error) {
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
                console.log("line 38", action)
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = action.payload;
                state.message = "";
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
            .addCase(blockAndUnblock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(blockAndUnblock.fulfilled, (state, action) => {
                console.log("line 38", action)
                const updatedUser = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = state.userData.map((user) =>
                    user._id === updatedUser.id ? updatedUser : user
                );
                state.message = "Updated Status Successfully";
            })
            .addCase(blockAndUnblock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});



