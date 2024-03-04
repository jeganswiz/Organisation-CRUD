// store.js
import { configureStore } from '@reduxjs/toolkit';
import commonSliceReducer from './slices/commonSlice';

export default configureStore({
  reducer: {
    common: commonSliceReducer,
  },
});