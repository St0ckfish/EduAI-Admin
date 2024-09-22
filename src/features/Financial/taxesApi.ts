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

export const taxesApi = createApi({
  reducerPath: "taxesApi",
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
    getAllTaxes: builder.query({
      query: () => "/api/v1/school-tax/all",
    }),
    //
    deleteTaxes: builder.mutation({
      query: id => ({
        url: `/api/v1/bank-account/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createTaxes: builder.mutation({
      query: formData => ({
        url: `/api/v1/school-tax`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getTaxeById: builder.query({
      query: id => `/api/v1/bank-account/${id}`,
    }),
    //
    updateTaxes: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/v1/bank-account/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllTaxesQuery,
  useDeleteTaxesMutation,
  useCreateTaxesMutation,
  useGetTaxeByIdQuery,
  useUpdateTaxesMutation,
} = taxesApi;
