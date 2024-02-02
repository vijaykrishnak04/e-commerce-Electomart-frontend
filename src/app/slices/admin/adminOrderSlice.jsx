import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllOrdersApi} from '../../../services/adminServices';


const initialState = {
    orderData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const getAllOrders = createAsyncThunk(
    "admin/get-all-orders",
    async () =>{
        try{
            const response = await getAllOrdersApi()
            return response.data
        }catch(error){
            throw error
        }
    }
)

export const adminOrderSlice = createSlice({
    name: 'orderData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderData = action.payload;
                state.message = "";
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.message = "";
            })
    },
});



