import { configureStore } from "@reduxjs/toolkit";
import booleanReducer from '@/features/boolyanSlice';
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/User-Management/employeeApi"
import { signupApi } from "../features/signupApi"
import { teacherApi } from "@/features/User-Management/teacherApi";
import { driverApi } from "@/features/User-Management/driverApi";
import { workerApi } from "@/features/User-Management/workerApi";
import { departmentApi } from "@/features/Organization-Setteings/departmentApi";
import { semesterApi } from "@/features/Organization-Setteings/semesterApi";
import { positionApi } from "@/features/Organization-Setteings/positionApi";
import { parentApi } from "@/features/User-Management/parentApi";
import { studentApi } from "@/features/User-Management/studentApi";
import { postApi } from "@/features/communication/postApi";
import { certificatesApi } from "@/features/Document-Management/certificatesApi";
import { achievementApi } from "@/features/Document-Management/achievementApi";
import { participationApi } from "@/features/Document-Management/participationApi";
import { professionalApi } from "@/features/Document-Management/professionalApi";
import { courseApi } from "@/features/Acadimic/courseApi";
import { employeePermissionApi } from "@/features/Organization-Setteings/employeePermissionApi";
import { departmentPermissionApi } from "@/features/Organization-Setteings/departmentPermissionApi";
import { bankApi } from "@/features/Financial/bankApi";
import { feesApi } from "@/features/Financial/feesApi";
import { classApi } from "@/features/Infrastructure/classApi";

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [feesApi.reducerPath]: feesApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [employeePermissionApi.reducerPath]: employeePermissionApi.reducer,
    [departmentPermissionApi.reducerPath]: departmentPermissionApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [participationApi.reducerPath]: participationApi.reducer,
    [professionalApi.reducerPath]: professionalApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [workerApi.reducerPath]: workerApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [parentApi.reducerPath]: parentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [achievementApi.reducerPath]: achievementApi.reducer,
    [certificatesApi.reducerPath]: certificatesApi.reducer,
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(achievementApi.middleware)
      .concat(employeePermissionApi.middleware)
      .concat(departmentPermissionApi.middleware)
      .concat(participationApi.middleware)
      .concat(professionalApi.middleware)
      .concat(certificatesApi.middleware)
      .concat(feesApi.middleware)
      .concat(courseApi.middleware)
      .concat(signupApi.middleware)
      .concat(employeeApi.middleware)
      .concat(classApi.middleware)
      .concat(bankApi.middleware)
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
