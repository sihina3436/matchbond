import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/posts`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({ url: "/create-post", method: "POST", body: postData }),
    }),
    getPosts: builder.query({
      query: () => "/get-posts",
    }),
    getPostById: builder.query({
      query: (id) => `/get-post/${id}`,
    }),
    updatePostStatus: builder.mutation({
      query: ({ id, post_status }) => ({ url: `/status/${id}`, method: "PUT", body: { post_status } }),
    }),
    requestDeletePost: builder.mutation({
      query: (id) => ({ url: `/request-delete/${id}`, method: "POST" }),
    }),
    getAllDeleteRequestedPosts: builder.query({
      query: () => "/delete-requests",
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/delete-post/${id}`, method: "DELETE" }),
    }),
    editPost: builder.mutation({
      query: ({ id, postData }) => ({ url: `/edit-post/${id}`, method: "PUT", body: postData }),
    }),
    getPostByUser: builder.query({
      query: (id) => `/user-posts/${id}`,
    }),

    getPostByUserId: builder.query({
      query: (userId: string) => `/user-post/${userId}`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostStatusMutation,
  useRequestDeletePostMutation,
  useGetAllDeleteRequestedPostsQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByUserQuery,
  useGetPostByUserIdQuery,  // ✅ new
} = postAPI;
