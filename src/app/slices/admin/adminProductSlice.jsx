import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProductApi, getAllProductApi } from '../../../services/adminServices';

const initialState = {
    productData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const AddProducts = createAsyncThunk(
    "admin/add-product",
    async (fromData) => {
        try {
            const response = await addProductApi(fromData);
            console.log(response, "in thunk api")
            return response.data
        } catch (error) {
            throw error;
        }
    }
);

export const getAllProducts = createAsyncThunk(
    "admin/get-all-products",
    async () => {
        try {
            const response = await getAllProductApi();
            console.log(response, "in thunk api")
            return response.data
        } catch (error) {
            throw error;
        }
    }
);


export const adminProductSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productData = [...state.productData, action.payload];
                state.message = "";
            })
            .addCase(AddProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productData = action.payload;
                state.message = "";
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});


