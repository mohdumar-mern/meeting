// meetingApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const meetingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query({
      query: () => ({
        url: "/meetings",
        validateStatus: (response, result) => {
          return response.status === 200 && !result?.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Meeting", id: _id })),
              { type: "Meeting", id: "LIST" },
            ]
          : [{ type: "Meeting", id: "LIST" }],
    }),

    createMeeting: builder.mutation({
      query: (meeting) => ({
        url: "/meetings",
        method: "POST",
        body: meeting,
      }),
      invalidatesTags: [{ type: "Meeting", id: "LIST" }],
    }),

    updateMeeting: builder.mutation({
      query: ({ id, ...meeting }) => ({
        url: `/meetings/${id}`,
        method: "PATCH",
        body: meeting,
      }),
      invalidatesTags: (result, error, arg) =>
        result?.data
          ? [{ type: "Meeting", id: arg.id }]
          : [{ type: "Meeting", id: "LIST" }],
    }),

    completeMeeting: builder.mutation({
      query: ({ id, meeting }) => ({
        url: `/meetings/${id}/complete`,
        method: "PATCH",
        body: meeting,
      }),
      invalidatesTags: (result, error, arg) =>
        result?.data
          ? [{ type: "Meeting", id: arg.id }]
          : [{ type: "Meeting", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMeetingsQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useCompleteMeetingMutation,
} = meetingApiSlice;
