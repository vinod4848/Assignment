import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getproducts = createAsyncThunk(
  "product/getAllProduct",
  async (thunkAPI) => {
    try {
      return await productService.getAllProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getproduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getAproduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateproduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    try {
      return await productService.updateAproduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteproduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteAproduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (Productdata, thunkAPI) => {
    try {
      return await productService.createProduct(Productdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  products: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createproduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getproduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.productName = action.payload.getproduct.title;
      })
      .addCase(getproduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateproduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedproduct = action.payload;
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteproduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedproduct = action.payload;
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
