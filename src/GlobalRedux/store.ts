import { configureStore } from "@reduxjs/toolkit";
import { advicesApi } from "../features/advicesApi";


export const store = configureStore({
  reducer: {
    [advicesApi.reducerPath]: advicesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(advicesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
