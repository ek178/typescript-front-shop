import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Review } from '../../models/Review';
import { getReview,addReview,delReview,updReview } from './reviewAPI';



export interface ReviewState {
  reviews: Review[]
}

const initialState: ReviewState = {
    reviews: []
};

export const getReviewAsync = createAsyncThunk(
  'review/getReview',
  async () => {
    const response = await getReview();
    return response;
  }
);
export const addReviewAsync = createAsyncThunk(
  'review/addReview',
  async (formData: FormData) => {
    const response = await addReview(formData);
    return response.data;
  }
);

export const delReviewAsync = createAsyncThunk(
  'review/delReview',
  async (id: number) => {
    const response = await delReview(id);
    return response;
  }
);

export const updReviewAsync = createAsyncThunk(
  'review/updReview',
  async ({ formData, id }: { formData: FormData, id: number }) => {
    const response = await updReview(formData,id);
    console.log(response);
    return response.data as Review;
  }
);



export const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.reviews = action.payload

    }).addCase(addReviewAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.reviews.push(action.payload)

    }).addCase(delReviewAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.reviews = state.reviews.filter(x => x.id !== action.payload)

    }).addCase(updReviewAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedReview = action.payload;
      const index = state.reviews.findIndex(p => p.id === updatedReview.id);
      if (index >= 0) {
        state.reviews[index] = updatedReview;
      }
    });

  },
});


export const selectReviews = (state: RootState) => state.review.reviews

export default ReviewSlice.reducer;