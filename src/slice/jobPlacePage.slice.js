import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  reducerPath: "hotelDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["job-application"],
  endpoints: (builder) => ({
    getApplicationByID: builder.query({
      query: (id) => ({
        url: `/public/career/jobs/${id}`,
      }),
      providesTags: ["job-application"],
    }),
    createApplicantBasicInfo: builder.mutation({
      query: (data) => ({
        url: "/public/career/jobs/apply/basic",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": data instanceof FormData ? undefined : "application/json",
        },
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantBasicInfo: builder.mutation({
      query: (data) => ({
        url: "/public/career/jobs/apply/basic",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantNIDorCNICinfo: builder.mutation({
      query: (data) => ({
        url: "/secured/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantLicenseInfo: builder.mutation({
      query: (data) => ({
        url: "/secured/order/finish",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["job-application"],
    })
  }),
});

export const {
  useGetApplicationByIDQuery,
  useCreateApplicantBasicInfoMutation,
  useUpdateApplicantBasicInfoMutation,
  useUpdateApplicantLicenseInfoMutation,
  useUpdateApplicantNIDorCNICinfoMutation,
} = jobApplicationApi;
