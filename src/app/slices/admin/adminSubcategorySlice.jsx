import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddSubcategoryApi, getAllSubcategoriesApi } from '../../../services/adminServices';

const initialState = {
    SubcategoryData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}


export const AddSubcategory = createAsyncThunk(
    "admin/add-subcategory",
    async (fromData) => {
        try {
            const response = await AddSubcategoryApi(fromData);
            console.log(response, "in thunk api")
            return response.data
        } catch (error){
            throw error;
        }
    }
);

export const getAllSubcategories = createAsyncThunk(
    "admin/get-subcategories",
    async () => {
        try {
            const response = await getAllSubcategoriesApi();
            console.log(response, "subcategory in thunk api")
            return response.data
        } catch (error) {
            throw error;
        }
    }
);


export const subcategorySlice = createSlice({
    name: 'SubcategoryData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddSubcategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddSubcategory.fulfilled, (state, action) => {
                console.log("line 51",action)
                state.isLoading = false;
                state.isSuccess = true;
                state.SubcategoryData =  [...state.SubcategoryData,action.payload];
                state.message = "Category Created successfully";
            })
            .addCase(AddSubcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "Category adding failed";
            })
            .addCase(getAllSubcategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSubcategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.SubcategoryData = action.payload
                state.message = "";
            })
            .addCase(getAllSubcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});
