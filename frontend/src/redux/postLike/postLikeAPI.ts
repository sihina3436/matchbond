import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../utils/baseURL';

export const postLikeAPI = createApi({
    reducerPath: 'postLikeAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/likes`,
        credentials: 'include',
    }),
    tagTypes: ["PostLikes"],
    endpoints: (builder) => ({
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/like/${postId}`,
                method: "POST",
            }),
            invalidatesTags: (result, error, postId) => [{ type: "PostLikes", id: postId }],
        }),
        getPostLikes: builder.query({
            query: (postId) => `/likes/${postId}`,
            providesTags: (result, error, postId) => [{ type: "PostLikes", id: postId }],
        }),
    }),
});

export const { 
    useLikePostMutation, //☑️
    useGetPostLikesQuery //☑️
} = postLikeAPI;