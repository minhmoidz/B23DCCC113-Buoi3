// redux/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

interface ProductState {
  products: Product[];
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    searchProduct(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, searchProduct } = productSlice.actions;
export default productSlice.reducer;
