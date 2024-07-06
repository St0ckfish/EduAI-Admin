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

export const teacherApi = createApi({
    reducerPath: "teacherApi",
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
        getAllTeachers: builder.query({
            query: () => "/api/v1/management/teacher/all?size=1000000000&page=0&archived=false",
        }),
        //
        deleteTeachers: builder.mutation({
            query: id => ({
                url: `/api/v1/management/employee/account-lock/${id}?locked=true`,
                method: "PUT",
            }),
        }),
        //
        createTeachers: builder.mutation({
            query: formData => ({
                url: `/api/v1/management/employee/new?type=EMPLOYEE`,
                method: "POST",
                body: formData,
            }),
        }),
        //
        getTeacherById: builder.query({
            query: id => `/api/v1/management/employee/${id}`,
        }),
        //
        updateTeachers: builder.mutation({
            query: ({ formData, id }) => ({
                url: `cases/categories/${id}`,
                method: "PATCH",
                body: formData,
            }),
        }),
    }),
});

export const {
    useCreateTeachersMutation,
    useDeleteTeachersMutation,
    useGetAllTeachersQuery,
    useGetTeacherByIdQuery,
    useUpdateTeachersMutation
} = teacherApi;