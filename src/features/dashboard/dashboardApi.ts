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
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetAllNoticesQuery,
    useGetAllWorkersQuery,
    useGetAllStudentsQuery,
    useGetAllTeachersQuery,
} = dashboardApi;