import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uploadBannerApi } from '../../../services/adminServices';



const initialState = {
    bannerData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const AddBannerData = createAsyncThunk(
    "admin/upload-banner",
    async (fromData) => {
        try {
            const response = await uploadBannerApi(fromData);
            console.log(response,"in thunk api")
            return response.data
        } catch (error) {
            throw error;
        }
    }
);

export const bannerSlice = createSlice({
    name: 'bannerData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddBannerData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddBannerData.fulfilled, (state, action) => {
                console.log(action,"Action data")
                state.isLoading = false;
                state.isSuccess = true;
                state.bannerData = action.payload;
                state.message = "Banner uploaded successfully";
            })
            .addCase(AddBannerData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Banner upload failed";
            });
    },
});



