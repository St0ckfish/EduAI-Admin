import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/components/BaseURL";

const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const getTokenFromCookie = () => {
    return getCookie("token");
};

export const employeeApi = createApi({
    reducerPath: "employeeApi",
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
            query: () => "api/v1/management/employee/all?size=1000000000&page=0&type=EMPLOYEE",
        }),
        //
        deleteEmployees: builder.mutation({
            query: id => ({
                url: `cases/categories/${id}`,
                method: "DELETE",
            }),
        }),
        //
        createEmployees: builder.mutation({
            query: formData => ({
                url: `cases/categories`,
                method: "POST",
                body: formData,
            }),
        }),
        //
        getEmployeeById: builder.query({
            query: id => `/api/v1/management/employee/${id}`,
        }),
        //
        updateEmployees: builder.mutation({
            query: ({ formData, id }) => ({
                url: `cases/categories/${id}`,
                method: "PATCH",
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useDeleteEmployeesMutation,
    useCreateEmployeesMutation,
    useGetEmployeeByIdQuery,
    useUpdateEmployeesMutation,
} = employeeApi;