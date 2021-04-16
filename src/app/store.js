import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'

export default configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
  },
});
