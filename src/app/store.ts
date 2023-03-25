import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { DeliverySlice } from '../features/DeliveryDetaill/deliverySlice';
import DepartmentSlice from "../features/Department/depSlice";
import { OrderSlice } from '../features/Order/orderSlice';
import { ProductSlice } from '../features/Product/prodSlice';
import { ProfileSlice1 } from '../features/Profile/profileSlice1';
import { ReviewSlice } from '../features/Review1/reviewSlice';
import singleSlice, { SingleSlice11 } from '../features/Single/singleSlice';



export const store = configureStore({
  reducer: {
    departments: DepartmentSlice,
    profile: ProfileSlice1.reducer,
    products: ProductSlice.reducer,
    delivery: DeliverySlice.reducer,
    orders: OrderSlice.reducer,
    review: ReviewSlice.reducer,
    profile1: SingleSlice11.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
