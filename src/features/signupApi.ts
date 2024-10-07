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
    getValidUsername: builder.query({
      query: username => `/api/v1/auth/exists-by-username?username=${username}`,
    }),
    getAllReginionID: builder.query({
      query: () => "/api/v1/location/public/region?city-id",
    }),
    //
    getAllRoles: builder.query({
      query: () => "/api/v1/public/enumeration/employee-role",
    }),

    //
    getAllLevels: builder.query({
      query: () => "/api/v1/public/enumeration/study-level",
    }),
    //
    getAllRegistrations: builder.query({
      query: () => "/api/v1/public/enumeration/registration-type",
    }),
    //
    getAllLanguages: builder.query({
      query: () => "/api/v1/public/enumeration/language",
    }),
  }),
});

export const {
  useSignupApiDashboardMutation,
  useGetAllNationalitysQuery,
  useGetAllRolesQuery,
  useGetAllReginionIDQuery,
  useGetAllLevelsQuery,
  useGetAllRegistrationsQuery,
  useGetAllLanguagesQuery,
  useGetValidUsernameQuery,
} = signupApi;
