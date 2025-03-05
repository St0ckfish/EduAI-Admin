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

export const examsApi = createApi({
  reducerPath: "examsApi",
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
    getAllExams: builder.query({
      query: () => "/api/v1/academic/educationalAffairs/exams",
    }),
    //
    deleteExam: builder.mutation({
      query: id => ({
        url: `/api/v1/academic/educationalAffairs/exams/${id}`,
        method: "DELETE",
      }),
    }),
    //
    deleteExamResult: builder.mutation({
      query: id => ({
        url: `/api/v1/exam-results/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createExams: builder.mutation({
      query: formData => ({
        url: `/api/v1/academic/educationalAffairs/exams`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    createExamType: builder.mutation({
      query: formData => ({
        url: `/api/v1/academic/educationalAffairs/exam-types`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getExamResById: builder.query({
      query: id => `/api/v1/exam-results/exam/${id}`,
    }),
    //
    getExamTypeByCourseId: builder.query({
      query: id => `/api/v1/academic/educationalAffairs/exam-types/non-teacher/all-by-course/${id}`,
    }),
    //
    updateExam: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/v1/academic/educationalAffairs/exams/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllExamsQuery,
  useDeleteExamMutation,
  useCreateExamsMutation,
  useGetExamResByIdQuery,
  useCreateExamTypeMutation,
  useUpdateExamMutation,
  useGetExamTypeByCourseIdQuery,
  useDeleteExamResultMutation,
} = examsApi;
