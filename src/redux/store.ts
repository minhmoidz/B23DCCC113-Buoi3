// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Đảm bảo đường dẫn đúng

export const store = configureStore({
  reducer: {
    products: productReducer, // Đảm bảo rằng reducer được thêm đúng
  },
});
