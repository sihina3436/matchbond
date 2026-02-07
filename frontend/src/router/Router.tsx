import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import Feed from "../pages/Feed";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path:"/home", element:<Home /> },
            {path:"/feed", element:<Feed /> }
        ]
    },
    {
        path:"/signin",
        element: <SignIn />
    },
    {
        path:"/signup",
        element: <SignUp />
    },
    {
        path:"/forgot-password",
        element: <ForgotPassword />
    },
    {
        path:"/verify-otp",
        element: <VerifyOTP />
    },



]);