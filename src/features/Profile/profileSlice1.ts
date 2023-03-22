import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Profile,ProfileGet } from '../../models/Profile';
import { getProfile1,addProfile1,delProfile1,updProfile1 } from './profileAPI1';
import { MY_SERVER_LOGIN } from '../../env';
import axios from 'axios';




export interface ProfileState {
    profiles: ProfileGet []
}


const initialState: ProfileState = {
    profiles: [],
  };



export const getProfileAsync = createAsyncThunk(
    'profile/getProfile1',
    async () => {
      const response = await getProfile1();
      return response;
    }
  );



export const addProfileAsync = createAsyncThunk(
    'profile/addProfile1',
    async (profileData: Profile) => {
      const response = await addProfile1(profileData);
      return response.data;
    }
  );


// const handleLogin = async (username: string, password: string) => {
//   try {
//     const response = await axios.post(MY_SERVER_LOGIN, {
//       username,
//       password,
//     });
//     const accessToken = response.data.access;
//     const refreshToken = response.data.refresh;

//     // Store the tokens securely on the frontend (e.g. in local storage or in an httpOnly cookie)
//     console.log('Login successful!');
//     console.log(`Access Token: ${accessToken}`);
//     console.log(`Refresh Token: ${refreshToken}`);

//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };

// export const addProfileAsync = createAsyncThunk(
//   'profile/addProfile1',
//   async (profileData: Profile) => {
//     const response = await addProfile1(profileData);
//     handleLogin(profileData.username, profileData.password);
//     return response.data;
//   }
// );


export const delProfileAsync = createAsyncThunk(
    'profile/delProfile1',
    async (id: number) => {
        const response = await delProfile1(id);
        return response;
    }
);

export const updProfileAsync = createAsyncThunk(
    "profile/updProfile1",
    async (pro: ProfileGet) => {
      const response = await updProfile1(pro);
      return response.data;
    }
  );

// export const updProfileAsync = createAsyncThunk(
//   "profile/updProfile1",
//   async (pro: Profile) => {
//     const response = await updProfile1(pro);
//     return response.data;
//   }
// );



interface ResponseData {
  profile: Profile;
  accessToken: string;
  refreshToken: string;
}


export const ProfileSlice1 = createSlice({
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
            const updatedProfile = action.payload;
            const index = state.profiles.findIndex((p) => p.id === updatedProfile.id);
            if (index !== -1) {
              state.profiles[index] = updatedProfile;
            }
          });
    },
});

export const selectProfiles1 = (state: RootState) => state.profile.profiles

export default ProfileSlice1.reducer

// addCase(updProfileAsync.fulfilled, (state, action) => {
//     console.log(action.payload)
//     let temp = state.profiles.filter(x => x.id === action.payload.id)[0]
//     temp.username = action.payload.username
//     temp.profile.name = action.payload.first_name
//     temp.profile.email = action.payload.email
//     temp.password = action.payload.password
//     temp.profile.items222 = action.payload.items222
//     temp.profile.is_staff = action.payload.is_staff
//   });

