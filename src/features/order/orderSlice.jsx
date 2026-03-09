import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder,fetchAllOrders,updateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:null,
  totalOrders:0
  
};

export const createOrderAsync = createAsyncThunk(
  "product/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data; // ✅ no .data
  },
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "product/fetchAllOrders ",
  async ({sort, pagination}) => {
    const response = await fetchAllOrders ({sort, pagination});
    return response.data; // ✅ no .data
  },
);


export const updateOrderAsync = createAsyncThunk(
  "product/updateOrder ",
  async (order) => {
    const response = await updateOrder (order);
    return response.data; // ✅ no .data
  },
);

// export const fetchProductsByFiltersAsync = createAsyncThunk(
//   "product/fetchProductsByFilters",
//   async ({ filter, sort ,pagination }) => {
//     const response = await fetchProductsByFilters(filter, sort, pagination );
//     return response.data; // important
//   },
// );

// export const fetchBrandsAsync = createAsyncThunk(
//   "product/fetchBrands",
//   async () => {
//     const response = await fetchBrands();
//     return response; // ✅ no .data
//   },
// );
// export const fetchCategoriesAsync = createAsyncThunk(
//   "product/fetchCategories",
//   async () => {
//     const response = await fetchCategories();
//     return response; // ✅ no .data
//   },
// );
// export const fetchProductByIdAsync = createAsyncThunk(
//   "product/fetchProductById",
//   async (id) => {
//     const response = await fetchProductById(id);
//     return response; // ✅ no .data
//   },
// );

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
  resetOrder: (state) => {
    state.currentOrder = null;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder= action.payload
      })
       .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
       .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});
export const {resetOrder} = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
