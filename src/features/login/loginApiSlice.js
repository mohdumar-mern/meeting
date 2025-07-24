// features/auth/authApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";
import AdminLogin from "./AdminLogin";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    AdminLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useAdminLoginMutation } = authApiSlice;
