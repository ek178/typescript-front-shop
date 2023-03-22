import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Department } from '../../models/Department';
import { getDepartment, delDepartment, addDepartment, updDepartment } from './depAPI';


export interface DepartmentState {
  departments: Department[]
}

const initialState: DepartmentState = {
  departments: []
};

export const getDepartmentsAsync = createAsyncThunk(
  'department/getDepartments',
  async () => {
    const response = await getDepartment();
    return response;
  }
);



export const addDepartmentAsync = createAsyncThunk(
  'department/addDepartment',
  async (formData: FormData) => {
    try {
      const response = await addDepartment(formData);
      return response;
    } catch (error) {
      console.log('Error adding department:', error);
      throw error;
    }
  }
);

export const delDepartmentAsync = createAsyncThunk(
  'department/delDepartment',
  async (id: number) => {
    const response = await delDepartment(id);
    return response;
  }
);

export const updDepartmentAsync = createAsyncThunk(
  'department/updDepartment',
  async ({ formData, id }: { formData: FormData, id: number }) => {
    const response = await updDepartment(formData,id);
    console.log(response);
    return response.data as Department;
  }
);

// export const updDepartmentAsync = createAsyncThunk(
//   "department/updDepartment",
//   async (dep: Department) => {
//     const response = await updDepartment(dep);
//     return response.data;
//   }
// );


export const DepartmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.departments = action.payload

    }).addCase(addDepartmentAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.departments.push(action.payload)

    }).addCase(delDepartmentAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.departments = state.departments.filter(x => x.id !== action.payload)

    }).addCase(updDepartmentAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedDeprtment = action.payload;
      const index = state.departments.findIndex(p => p.id === updatedDeprtment.id);
      if (index >= 0) {
        state.departments[index] = updatedDeprtment;
      }
    });
  },
});


export const selectDepartments = (state: RootState) => state.department.departments;

export default DepartmentSlice.reducer;

// addCase(updDepartmentAsync.fulfilled, (state, action) => {
//   console.log(action.payload)
//   let temp = state.departments.filter(x => x.id === action.payload.id)[0]
//   temp.d_name = action.payload.d_name
//   temp.d_desc = action.payload.d_desc
//   temp.d_image = action.payload.d_image
// });


