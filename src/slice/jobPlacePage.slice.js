import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  reducerPath: "hotelDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["job-application", "change-mail", "otp-verified"],
  endpoints: (builder) => ({
    getApplicationByID: builder.query({
      query: (id) => ({
        url: `/public/career/jobs/${id}`,
      }),
      providesTags: ["job-application"],
    }),
    checkApplicantToken: builder.query({
      query: (token) => ({
        url: `/public/check-applicant-token/${token}`,
      }),
      providesTags: ["job-application", "change-mail"],
    }),
    applicantVerifySuccessfully: builder.query({
      query: (token) => ({
        url: `/public/applicant-identify-successfully/${token}`,
      }),
      providesTags: ["otp-verified"],
    }),
    sendVerificationOtp: builder.mutation({
      query: (data) => ({
        url: "/public/identity-by-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["change-mail"],
    }),
    sendVerificationOtpUsingPassport: builder.mutation({
      query: (data) => ({
        url: "/public/identity-by-passport",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["change-mail"],
    }),
    otpVerification: builder.mutation({
      query: (data) => ({
        url: "/public/applicant-verify-by-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["otp-verified"],
    }),
    createApplicantBasicInfo: builder.mutation({
      query: (data) => ({
        url: "/public/career/jobs/apply/basic",
        method: "POST",
        body: data,
        headers: {
          "Content-Type":
            data instanceof FormData ? undefined : "application/json",
        },
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantBasicInfo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/public/career/jobs/apply/basic/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type":
            data instanceof FormData ? undefined : "application/json",
        },
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantNIDorCNICinfo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/public/career/jobs/apply/nid-or-cnic/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type":
            data instanceof FormData ? undefined : "application/json",
        },
      }),
      invalidatesTags: ["job-application"],
    }),
    updateApplicantLicenseInfo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/public/career/jobs/apply/license/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type":
            data instanceof FormData ? undefined : "application/json",
        },
      }),
      invalidatesTags: ["job-application"],
    }),
  }),
});

export const {
  useGetApplicationByIDQuery,
  useOtpVerificationMutation,
  useCheckApplicantTokenQuery,
  useSendVerificationOtpMutation,
  useCreateApplicantBasicInfoMutation,
  useUpdateApplicantBasicInfoMutation,
  useApplicantVerifySuccessfullyQuery,
  useUpdateApplicantLicenseInfoMutation,
  useUpdateApplicantNIDorCNICinfoMutation,
  useSendVerificationOtpUsingPassportMutation,
} = jobApplicationApi;
