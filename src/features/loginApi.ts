import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/components/BaseURL";

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: builder => ({
        loginDashboard: builder.mutation({
            query: credentials => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginDashboardMutation } = loginApi;