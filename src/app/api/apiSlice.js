import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL ||  'http://localhost:8080/api',
    credentials: 'include', 
  }),
  tagTypes: ['Meeting'], 
  endpoints: (builder) => ({}), 
})
