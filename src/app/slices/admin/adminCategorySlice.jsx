import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCategoryApi, getAllCategoriesApi } from '../../../services/adminServices';

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

export const getAllCategories = createAsyncThunk(
    "admin/get-categories",
    async () => {
        try {
            const response = await getAllCategoriesApi();
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
                console.log(action,"action")
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = [...state.CategoryData, action.payload];
                state.message = "Category Created successfully";
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Category adding failed";
            })
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = action.payload
                state.message = "";
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});
