import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedUserRoute from "./ProtectedUserRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

// Auth pages
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Public pages
import Home from "../pages/public/Home";
import Feed from "../pages/public/Feed";
import PostDetails from "../pages/public/PostDetails";

// User pages
import Profile from "../pages/user/profile/Profile";
import UpdateProfile from "../pages/user/profile/UpdateProfile";
import AddPost from "../pages/user/post/AddPost";
import ChatRequest from "../pages/user/chat/ChatRequest";


// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSignIn from "../pages/auth/admin/AdminSignIn";
import AdminForgotPassword from "../pages/auth/admin/AdminForgotPassword";

// Error pages
import Unauthorized from "../components/Unauthorized";
import NotFound from "../components/NotFound";
import ContactAdmin from "../pages/user/post/ContactAdmin";
import ChatPage from "../pages/user/chat/ChatPage";
import UpdatePost from "../pages/user/post/UpdatePost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // PUBLIC ROUTES
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: "feed", 
        element: <Feed /> 
      },
      { 
        path: "post/:id", 
        element: <PostDetails /> 
      },
      // PROTECTED USER ROUTES
      { 
        path: "profile", 
        element: (
          <ProtectedUserRoute>
            <Profile />
          </ProtectedUserRoute>
        ) 
      },
      { 
        path: "update-profile", 
        element: (
          <ProtectedUserRoute>
            <UpdateProfile />
          </ProtectedUserRoute>
        ) 
      },
      { 
        path: "add-post", 
        element: (
          <ProtectedUserRoute>
            <AddPost />
          </ProtectedUserRoute>
        ) 
      },
      {
        path: "update-post/:id",
        element: (
          <ProtectedUserRoute>
            <UpdatePost/>
          </ProtectedUserRoute>
        )
      },
      { 
        path: "chat-requests", 
        element: (
          <ProtectedUserRoute>
            <ChatRequest />
          </ProtectedUserRoute>
        ) 
      },
      ,
      {
        path: "contact-admin",
        element: (
          <ProtectedUserRoute>
            <ContactAdmin/>
          </ProtectedUserRoute>
        )
      },
      {
        path: "chat",
        element: <ProtectedUserRoute><ChatPage/></ProtectedUserRoute>,
      },
      // PROTECTED ADMIN ROUTES
      { 
        path: "admin", 
        element: (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        ) 
      },
      // ERROR ROUTES
      { 
        path: "unauthorized", 
        element: <Unauthorized /> 
      },
    ],
  },
  // AUTH ROUTES (Outside App layout)
  { 
    path: "/signin", 
    element: <SignIn /> 
  },
  { 
    path: "/signup", 
    element: <SignUp /> 
  },
  { 
    path: "/forgot-password", 
    element: <ForgotPassword /> 
  },
  { 
    path: "/reset-password", 
    element: <ResetPassword /> 
  },
  // ADMIN AUTH ROUTES
  { 
    path: "/admin/signin", 
    element: <AdminSignIn /> 
  },
  { 
    path: "/admin/forgot-password", 
    element: <AdminForgotPassword /> 
  },
  { 
    path: "/2", 
    element: <NotFound /> 
  },
]);

export default router;
