import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { Profile } from '../../models/Profile';
import { Profile2 } from '../../models/Profile2';
import { getProfile, addProfile, delProfile, updProfile } from './profileAPI';


export interface ProfileState {
    profiles: Profile2 []
}


const initialState: {
    profiles: Profile2[];
  } = {
    profiles: []
  };



export const getProfileAsync = createAsyncThunk(
    'profile/getProfile',
    async () => {
      const response = await getProfile();
      return response;
    }
  );



export const addProfileAsync = createAsyncThunk(
    'profile/addProfile',
    async (profileData: Profile2) => {
      const response = await addProfile(profileData);
      return response.data;
    }
  );



export const delProfileAsync = createAsyncThunk(
    'profile/delProfile',
    async (id: number) => {
        const response = await delProfile(id);
        return response;
    }
);

// export const updProfileAsync = createAsyncThunk(
//     'profile/updProfile',
//     async ({ formData, id }: { formData: FormData; id: number }) => {
//       const response = await updProfile(formData, id);
//       // console.log(response);
//       return response;
//     }
//   );

export const updProfileAsync = createAsyncThunk(
  "profile/updProfile",
  async (pro: Profile2) => {
    const response = await updProfile(pro);
    return response.data;
  }
);






export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.profiles = action.payload;
          }).addCase(addProfileAsync.fulfilled, (state, action) => {
            console.log(action.payload)
            state.profiles.push(action.payload.data)

        }).addCase(delProfileAsync.fulfilled, (state, action) => {
            console.log(action.payload)
            state.profiles = state.profiles.filter(x => x.id !== action.payload)

        }).addCase(updProfileAsync.fulfilled, (state, action) => {
          console.log(action.payload)
          let temp = state.profiles.filter(x => x.id === action.payload.id)[0]
          temp.username = action.payload.username
          temp.first_name = action.payload.first_name
          temp.last_name = action.payload.last_name
          temp.email = action.payload.email
          temp.password = action.payload.password
          temp.items222 = action.payload.items222
          temp.is_staff = action.payload.is_staff
        });
    },
});

export const selectProfiles = (state: RootState) => state.profile.profiles

export default ProfileSlice.reducer





// addCase(updProfileAsync.fulfilled, (state, action) => {
//   console.log(action.payload);
//   const updatedProfileIndex = state.profiles.findIndex((p) => p.id === action.payload.id);
//   if (updatedProfileIndex !== -1) {
//     state.profiles[updatedProfileIndex] = action.payload;
//   }