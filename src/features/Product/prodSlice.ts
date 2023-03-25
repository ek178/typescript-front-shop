import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Product } from '../../models/Product';
import { getProduct,addProduct,delProduct,updProduct, get1Product } from './productAPI';


export interface ProductState {
  products: Product[]
  product: Product | null


}

const initialState: ProductState = {
  products: [],
  product: null
};





export const getProductAsync = createAsyncThunk(
  'product/getProduct',
  async () => {
    const response = await getProduct();
    return response;
  }
);
export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (formData: FormData) => {
    const response = await addProduct(formData);
    return response.data;
  }
);

export const delProductAsync = createAsyncThunk(
  'product/delProduct',
  async (id: number) => {
    const response = await delProduct(id);
    return response;
  }
);
export const updProductAsync = createAsyncThunk(
  'product/updProduct',
  async ({ formData, id }: { formData: FormData, id: number }) => {
    const response = await updProduct(formData,id);
    console.log(response);
    return response.data as Product;
  }
);

// export const updProductAsync = createAsyncThunk(
//   "product/updProduct",
//   async (pro: Product) => {
//     const response = await updProduct(pro);
//     return response.data;
//   }
// );

export const get1ProductAsync = createAsyncThunk(
  'product/get1Product',
  async (id: number) => {
    const response = await get1Product(id);
    return response;
  }
);


export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.products = action.payload

    }).addCase(addProductAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.products.push(action.payload)

    }).addCase(delProductAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.products = state.products.filter(x => x.id !== action.payload)

    }).addCase(updProductAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      const updatedProduct = action.payload;
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index >= 0) {
        state.products[index] = updatedProduct;
      }
    }).addCase(get1ProductAsync.fulfilled, (state, action) => {
      // Append or replace the fetched product
      const productIndex = state.products.findIndex((p) => p.id === action.payload.id);
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    })

  },
});


export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (state: RootState, id: number | null) =>
  id ? state.products.products.find((product) => product.id === id) : null;

export default ProductSlice.reducer;

// let temp = state.products.filter(x => x.id === action.payload.id)[0]
// temp.p_name = action.payload.p_name
// temp.p_image = action.payload.p_image
// temp.p_price = action.payload.p_price
// temp.p_amount = action.payload.p_amount
// temp.p_name = action.payload.p_name
// temp.p_desc = action.payload.p_desc
// });
