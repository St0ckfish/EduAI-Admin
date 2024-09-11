import { configureStore } from "@reduxjs/toolkit";
import booleanReducer from "@/features/boolyanSlice";
import languageSlice from "@/features/language/languageSlice";
import { loginApi } from "../features/loginApi";
import { employeeApi } from "../features/User-Management/employeeApi";
import { signupApi } from "../features/signupApi";
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
import { reportApi } from "@/features/Organization-Setteings/reportApi";
import { employeePermissionApi } from "@/features/Organization-Setteings/employeePermissionApi";
import { departmentPermissionApi } from "@/features/Organization-Setteings/departmentPermissionApi";
import { bankApi } from "@/features/Financial/bankApi";
import { busApi } from "@/features/Infrastructure/busApi";
import { dashboardApi } from "@/features/dashboard/dashboardApi";
import { feesApi } from "@/features/Financial/feesApi";
import { notificationsApi } from "@/features/communication/notficationsApi";
import { classApi } from "@/features/Infrastructure/classApi";
import { labApi } from "@/features/Infrastructure/labApi";
import { officeApi } from "@/features/Infrastructure/officeApi";
import { eventsApi } from "@/features/events/eventsApi";
import { attendanceApi } from "@/features/attendance/attendanceApi";
import { examsApi } from "@/features/Acadimic/examsApi";
import { scheduleApi } from "@/features/Acadimic/scheduleApi";

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    language: languageSlice,
    [loginApi.reducerPath]: loginApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [examsApi.reducerPath]: examsApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [feesApi.reducerPath]: feesApi.reducer,
    [labApi.reducerPath]: labApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    [busApi.reducerPath]: busApi.reducer,
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
      .concat(labApi.middleware)
      .concat(employeePermissionApi.middleware)
      .concat(scheduleApi.middleware)
      .concat(busApi.middleware)
      .concat(departmentPermissionApi.middleware)
      .concat(notificationsApi.middleware)
      .concat(examsApi.middleware)
      .concat(reportApi.middleware)
      .concat(officeApi.middleware)
      .concat(participationApi.middleware)
      .concat(professionalApi.middleware)
      .concat(eventsApi.middleware)
      .concat(certificatesApi.middleware)
      .concat(feesApi.middleware)
      .concat(courseApi.middleware)
      .concat(signupApi.middleware)
      .concat(attendanceApi.middleware)
      .concat(employeeApi.middleware)
      .concat(classApi.middleware)
      .concat(bankApi.middleware)
      .concat(departmentApi.middleware)
      .concat(teacherApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(driverApi.middleware)
      .concat(workerApi.middleware)
      .concat(semesterApi.middleware)
      .concat(parentApi.middleware)
      .concat(positionApi.middleware)
      .concat(studentApi.middleware)
      .concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;