import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/employeeApi"
import { signupApi } from "../features/signupApi"
import { teacherApi } from "@/features/teacherApi";
import { driverApi } from "@/features/driverApi";
import { workerApi } from "@/features/workerApi";
import booleanReducer from '@/features/boolyanSlice';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [workerApi.reducerPath]: workerApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(signupApi.middleware)
      .concat(employeeApi.middleware)
      .concat(teacherApi.middleware)
      .concat(driverApi.middleware)
      .concat(workerApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
