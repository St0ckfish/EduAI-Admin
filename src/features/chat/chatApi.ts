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

export const chatApi = createApi({
  reducerPath: "chatApi",
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
    getAllChats: builder.query({
      query: () =>
        `/api/v1/chat/all`,
    }),
    //
    getAllStudentsAttend: builder.query({
      query: ({ size, page }) =>
        `/api/v1/student-attendance/all?date=&size=${size}&page=${page}`,
    }),
    //
    getAllSchools: builder.query({
      query: () => `/api/v1/public/school/basic-info?name&size=1000000&page=0`,
    }),
    //
    getDriversCount: builder.query({
      query: () => `/api/v1/dashboard/drivers-count`,
    }),
    //
    getDriversAttend: builder.query({
      query: () => `/api/v1/dashboard/drivers-attendance?status=PRESENT`,
    }),
    //
    getChatMessages: builder.query({
      query: id => ({
        url: `/api/v1/messages/messagesInChat/${id}`,
      }),
    }),
    //
    createAttendance: builder.mutation({
      query: formData => ({
        url: `/api/v1/employee-attendance`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getBusById: builder.query({
      query: id => `/api/v1/bus/${id}`,
    }),
    //
    updateAttendance: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/v1/employee-attendance/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    //
    updateStudentAttendance: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/v1/student-attendance/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllChatsQuery,
  useGetAllSchoolsQuery,
  useGetAllStudentsAttendQuery,
  useGetDriversCountQuery,
  useGetDriversAttendQuery,
  useGetChatMessagesQuery,
  useCreateAttendanceMutation,
  useGetBusByIdQuery,
  useUpdateAttendanceMutation,
  useUpdateStudentAttendanceMutation,
} = chatApi;
