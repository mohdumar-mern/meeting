import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api', // Optional: useful when you have multiple APIs
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    credentials: 'include', // This should be inside baseQuery options
  }),
  tagTypes: ['Meeting'], // Tag for cache invalidation
  endpoints: (builder) => ({}), // Keep empty for now, add endpoints later
})
