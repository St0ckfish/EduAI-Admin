import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/employeeApi"

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(employeeApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
