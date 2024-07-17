import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/components/BaseURL";

export const signupApi = createApi({
    reducerPath: "signupApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: builder => ({
        signupApiDashboard: builder.mutation({
            query: credentials => ({
                url: "/api/v1/auth/employee-registration",
                method: "POST",
                body: credentials,
            }),
        }),
        //
        getAllNationalitys: builder.query({
            query: () => "/api/v1/public/enumeration/nationality",
        }),
        //
        getAllRoles: builder.query({
            query: () => "/api/v1/public/enumeration/employee-role",
        }),
        //
    }),
});

export const { useSignupApiDashboardMutation, useGetAllNationalitysQuery, useGetAllRolesQuery } = signupApi;