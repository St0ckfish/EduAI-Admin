import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/employeeApi"
import { signupApi } from "../features/signupApi"
import { teacherApi } from "@/features/teacherApi";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(signupApi.middleware)
      .concat(employeeApi.middleware)
      .concat(teacherApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
