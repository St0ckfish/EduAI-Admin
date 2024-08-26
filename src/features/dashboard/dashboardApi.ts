import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/components/BaseURL";

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
};

const getTokenFromCookie = () => {
    return getCookie("token");
};

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: headers => {
            const token = getTokenFromCookie();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: builder => ({
        getAllCurrentUser: builder.query({
            query: () => "/api/v1/my-account/profile/employee",
        }),
        //
        getAllEmployees: builder.query({
            query: () => "/api/v1/dashboard/employees-count",
        }),
        //
        getAllWorkers: builder.query({
            query: () => "/api/v1/dashboard/workers-count",
        }),
        //
        getAllStudents: builder.query({
            query: () => "/api/v1/dashboard/students-count",
        }),
        //
        getAllTeachers: builder.query({
            query: () => "/api/v1/dashboard/teachers-count",
        }),
        //
        getAllNotices: builder.query({
            query: () => "/api/v1/dashboard/notice-board",
        }),
        //
        getAllCountrys: builder.query({
            query: () => "/api/v1/management/country/all",
        }),
        //
        getTeacherAttendence: builder.query({
            query: () => "/api/v1/dashboard/teachers-attendance",
        }),
        //
        getEmployeeAttendence: builder.query({
            query: () => "/api/v1/dashboard/employees-attendance",
        }),
        //
        getWorkerAttendence: builder.query({
            query: () => "/api/v1/dashboard/workers-attendance",
        }),
    }),
});

export const {
    useGetAllCurrentUserQuery,
    useGetAllEmployeesQuery,
    useGetAllNoticesQuery,
    useGetAllWorkersQuery,
    useGetAllStudentsQuery,
    useGetAllTeachersQuery,
    useGetAllCountrysQuery,
    useGetTeacherAttendenceQuery,
    useGetEmployeeAttendenceQuery,
    useGetWorkerAttendenceQuery,
} = dashboardApi;