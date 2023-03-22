import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { DeliveryDetail } from '../../models/DeliveryDetail';
import { getDelivery,addDelivery,delDelivery,updDelivery } from './deliveryAPI';


export interface DeliveryState {
  deliveries: DeliveryDetail[]
}

const initialState: DeliveryState = {
    deliveries: []
};

export const getDeliveryAsync = createAsyncThunk(
  'delivery/getDelivery',
  async () => {
    const response = await getDelivery();
    return response;
  }
);
export const addDeliveryAsync = createAsyncThunk(
  'delivery/addDelivery',
  async (formData: FormData) => {
    const response = await addDelivery(formData);
    return response.data;
  }
);

export const delDeliveryAsync = createAsyncThunk(
  'delivery/delDelivery',
  async (id: number) => {
    const response = await delDelivery(id);
    return response;
  }
);
export const updDeliveryAsync = createAsyncThunk(
  'delivery/updDelivery',
  async ({ formData, id }: { formData: FormData, id: number }) => {
    const response = await updDelivery(formData,id);
    console.log(response);
    return response.data as DeliveryDetail;
  }
);



export const DeliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeliveryAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.deliveries = action.payload

    }).addCase(addDeliveryAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.deliveries.push(action.payload)

    }).addCase(delDeliveryAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.deliveries = state.deliveries.filter(x => x.id !== action.payload)

    }).addCase(updDeliveryAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedDelivery = action.payload;
      const index = state.deliveries.findIndex(p => p.id === updatedDelivery.id);
      if (index >= 0) {
        state.deliveries[index] = updatedDelivery;
      }
    });

  },
});


export const selectDeliveries = (state: RootState) => state.delivery.deliveries

export default DeliverySlice.reducer;