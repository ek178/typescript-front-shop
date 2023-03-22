import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Order } from '../../models/Order';
import { getOrder,addOrder,delOrder,updOrder } from './orderAPI';


export interface OrderState {
  orders: Order[]
}

const initialState: OrderState = {
    orders: []
};

export const getOrderAsync = createAsyncThunk(
  'order/getOrder',
  async () => {
    const response = await getOrder();
    return response;
  }
);
export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (formData: FormData) => {
    const response = await addOrder(formData);
    return response.data;
  }
);

export const delOrderAsync = createAsyncThunk(
  'order/delOrder',
  async (id: number) => {
    const response = await delOrder(id);
    return response;
  }
);
export const updOrderAsync = createAsyncThunk(
  'order/updOrder',
  async ({ formData, id }: { formData: FormData, id: number }) => {
    const response = await updOrder(formData,id);
    console.log(response);
    return response.data as Order;
  }
);



export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.orders = action.payload

    }).addCase(addOrderAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.orders.push(action.payload)

    }).addCase(delOrderAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.orders = state.orders.filter(x => x.id !== action.payload)

    }).addCase(updOrderAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(p => p.id === updatedOrder.id);
      console.log(index)

      if (index >= 0) {
        state.orders[index] = updatedOrder;
      }
    });

  },
});


export const selectOrders = (state: RootState) => state.order.orders

export default OrderSlice.reducer;