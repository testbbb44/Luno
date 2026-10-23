import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const baseUrl = "http://localhost:8000/api/";
export const baseUrl = "https://luno-api-mw19.onrender.com/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

 
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    initiateLogin: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
 
    postData: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        body: data,
      }),
    }),
    getData: builder.query({
      query: ({ url, params }) => ({
        url,
        method: "GET",
        params,
      }),
    }),
    patchData: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteData: builder.mutation({
      query: ({ url }) => ({
        url,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useInitiateLoginMutation,
  usePostDataMutation,
  useGetDataQuery,
  usePatchDataMutation,
  useDeleteDataMutation,
} = api;
