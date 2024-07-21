import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/User-Management/employeeApi"
import { signupApi } from "../features/signupApi"
import { teacherApi } from "@/features/User-Management/teacherApi";
import { driverApi } from "@/features/User-Management/driverApi";
import { workerApi } from "@/features/User-Management/workerApi";
import { departmentApi } from "@/features/Organization-Setteings/departmentApi";
import booleanReducer from '@/features/boolyanSlice';
import { semesterApi } from "@/features/Organization-Setteings/semesterApi";
import { positionApi } from "@/features/Organization-Setteings/positionApi";
import { parentApi } from "@/features/User-Management/parentApi";
import { studentApi } from "@/features/User-Management/studentApi";
import { postApi } from "@/features/communication/postApi";

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [workerApi.reducerPath]: workerApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    [parentApi.reducerPath]: parentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(signupApi.middleware)
      .concat(employeeApi.middleware)
      .concat(departmentApi.middleware)
      .concat(teacherApi.middleware)
      .concat(driverApi.middleware)
      .concat(workerApi.middleware)
      .concat(semesterApi.middleware)
      .concat(parentApi.middleware)
      .concat(positionApi.middleware)
      .concat(studentApi.middleware) 
      .concat(postApi.middleware) 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
