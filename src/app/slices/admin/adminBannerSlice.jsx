import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uploadBannerApi, getBannersApi, deleteBannerApi } from '../../../services/adminServices';



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
            return response.data
        } catch (error) {
            throw error;
        }
    }
);

export const getAllBanners = createAsyncThunk(
    "admin/get-banners",
    async () => {
        try {
            const response = await getBannersApi()
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const deleteBanner = createAsyncThunk(
    "admin/delete-banner/banner",
    async ({id, publicId}) => {
        try {
            console.log("inside thunk middle ware",publicId)
            const response = await deleteBannerApi(id, publicId)
            return response.data
        } catch (error) {
            throw error.response.data.message
        }
    }
)

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
                console.log(action, "Action data")
                state.isLoading = false;
                state.isSuccess = true;
                state.bannerData = [...state.bannerData, action.payload];
                state.message = "Banner uploaded successfully";
            })
            .addCase(AddBannerData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getAllBanners.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBanners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bannerData = action.payload;
                state.message = "Banners fetched successfully";
            })
            .addCase(getAllBanners.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message 
                state.message = "Failed to fetch banners";
            })
            .addCase(deleteBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                console.log("in 93 line",action)
                state.isLoading = false;
                state.isSuccess = true;
                state.bannerData = state.bannerData.filter(banner => banner?._id !== action?.payload?._id);
                state.message = "Banners Deleted Successfully";
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message 
            });
    },
});



