import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCategoryApi, deleteCategoryApi, getAllCategoriesApi } from '../../../services/adminServices';

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
            console.log("line 19",response)
            return response.data
        } catch (error) {
          throw  error.response.data.message
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "admin/get-categories",
    async () => {
        try {
            const response = await getAllCategoriesApi();
            return response.data
        } catch (error) {
            throw error;
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "admin/delete-category",
    async (id,publicId) => {
        try {
            const response = await deleteCategoryApi({id,publicId});
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
                state.isError = false;
                state.error = '';
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                console.log("line 51",action)
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = [...state.CategoryData, action.payload];
                state.message = "Category Created successfully";
            })
            .addCase(AddCategory.rejected, (state, action) => {
                console.log("line 69",action)
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = action.payload
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                console.log("line 95",action)
                state.isLoading = false;
                state.isSuccess = true;
                state.CategoryData = state.CategoryData.filter(category => category?._id !== action?.payload?._id);
                state.message = "Category Deleted Successfully";
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});
