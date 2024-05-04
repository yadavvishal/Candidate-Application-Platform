// contains code for creating reducer 

import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer
    
  },
});
