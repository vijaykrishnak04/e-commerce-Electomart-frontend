import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCouponsApi, deleteCouponApi, getAllCouponsApi } from '../../../services/adminServices';

const initialState = {
    couponData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const addCoupons = createAsyncThunk(
    "admin/add-coupons",
    async (data) => {
        try {
            const response = await addCouponsApi(data)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            throw error.response.data.message;
        }
    }
)

export const getAllCoupons = createAsyncThunk(
    "admin/get-all-coupons",
    async () => {
        try {
            const response = await getAllCouponsApi()
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    "admin/delete-coupon",
    async (id) => {
        try {
            const response = await deleteCouponApi(id)
            console.log("line 42", response);
            return response.data
        } catch (error) {
            throw error
        }
    }
)

export const adminCouponSlice = createSlice({
    name: 'couponData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCoupons.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(addCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.couponData = [...state.couponData, action.payload];
                state.message = "";
            })
            .addCase(addCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
            .addCase(getAllCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.couponData = action.payload;
                state.message = "";
            })
            .addCase(getAllCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.couponData = state.couponData.filter(coupon => coupon?._id !== action.meta.arg);
                state.message = "";
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});


