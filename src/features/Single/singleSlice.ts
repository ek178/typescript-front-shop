import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProfileGet } from '../../models/Profile';
import { getProfile11 } from './singleAPI';




// export interface ProfileState {
//     profiles1: ProfileGet []
// }


// const initialState: ProfileState = {
//     profiles1: [],
//   };

export interface ProfileState {
    profiles1: ProfileGet | null;
  }
  
  const initialState: ProfileState = {
    profiles1: null,
  };


export const getSingleAsync1 = createAsyncThunk(
    'profile1/getProfile11',
    async () => {
      const response = await getProfile11();
      return response;
    }
  );




// export const delProfileAsync = createAsyncThunk(
//     'profile/delProfile1',
//     async (id: number) => {
//         const response = await delProfile1(id);
//         return response;
//     }
// );

// export const updProfileAsync = createAsyncThunk(
//     "profile/updProfile1",
//     async (pro: ProfileGet) => {
//       const response = await updProfile1(pro);
//       return response.data;
//     }
//   );

// export const updProfileAsync = createAsyncThunk(
//   "profile/updProfile1",
//   async (pro: Profile) => {
//     const response = await updProfile1(pro);
//     return response.data;
//   }
// );






export const SingleSlice11 = createSlice({
    name: 'profile1',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSingleAsync1.fulfilled, (state, action) => {
            state.profiles1 = action.payload;
          })

        //   .addCase(delProfileAsync.fulfilled, (state, action) => {
        //     console.log(action.payload)
        //     state.profiles = state.profiles.filter(x => x.id !== action.payload)

        // })
        
        // .addCase(updProfileAsync.fulfilled, (state, action) => {
        //     const updatedProfile = action.payload;
        //     const index = state.profiles.findIndex((p) => p.id === updatedProfile.id);
        //     if (index !== -1) {
        //       state.profiles[index] = updatedProfile;
        //     }
        //   });
    },
});
export const selectSingle = (state: RootState) => state.profile1.profiles1

export default SingleSlice11.reducer