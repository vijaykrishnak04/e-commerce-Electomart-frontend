import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCategoryApi } from '../../../services/adminServices';

const initialState = {
    CategoryData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}


export const AddCategory = createAsyncThunk(
    "admin/add-category",
    async (fromData) => {
        try {
            const response = await addCategoryApi(fromData);
            console.log(response,"in thunk api")
            return response.data
        } catch (error) {
            throw error;
        }
    }
);


export const CategorySlice = createSlice({
    name: 'CategoryData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = action.payload.data
                state.message = "Category Created successfully";
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Category adding failed";
            })
    },
});
