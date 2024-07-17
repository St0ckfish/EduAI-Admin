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

export const studentApi = createApi({
    reducerPath: "studentApi",
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
        getAllStudents: builder.query({
            query: () => "/api/v1/management/student/all?size=1000000&page=0&archived=false",
        }),
        //
        deleteStudents: builder.mutation({
            query: id => ({
                url: `/api/v1/management/student/account-lock/${id}?locked=true`,
                method: "PUT",
            }),
        }),
        //
        createStudents: builder.mutation({
            query: formData => ({
                url: `/api/v1/management/student/new`,
                method: "POST",
                body: formData,
            }),
        }),
        //
        getStudentById: builder.query({
            query: id => `/api/v1/management/student/${id}`,
        }),
        //
        updateStudents: builder.mutation({
            query: ({ formData, id }) => ({
                url: `cases/categories/${id}`,
                method: "PATCH",
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetAllStudentsQuery,
    useDeleteStudentsMutation,
    useCreateStudentsMutation,
    useGetStudentByIdQuery,
    useUpdateStudentsMutation,
} = studentApi;