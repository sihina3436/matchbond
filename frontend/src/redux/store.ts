import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userAuth/userAuthSlice"; 
import { userAuthAPI } from "./userAuth/userAuthAPI"; 
import adminAuthReducer from "./adminAuth/adminAuthSlice";
import { adminAuthAPI } from "./adminAuth/adminAuthApi";
import { chatAPI } from "./chatRequests/chatApi";
import { imageAPI } from "./image/imageAPI";
import { postAPI } from "./post/postAPI";
import { postLikeAPI } from "./postLike/postLikeAPI";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin : adminAuthReducer,

    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    [adminAuthAPI.reducerPath]: adminAuthAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [imageAPI.reducerPath]: imageAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [postLikeAPI.reducerPath]: postLikeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        userAuthAPI.middleware,
        adminAuthAPI.middleware,
        chatAPI.middleware,
        imageAPI.middleware,
        postAPI.middleware,
        postLikeAPI.middleware

    ),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;