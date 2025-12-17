import { configureStore } from '@reduxjs/toolkit';
import { hhApi } from '../api/hhApi';
import vacanciesReducer from './vacanciesSlice';

export const store = configureStore({
   reducer: {
      vacancies: vacanciesReducer,
      [hhApi.reducerPath]: hhApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(hhApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;