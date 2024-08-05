import { createBrowserRouter } from "react-router-dom";
import UserProfile from "../Pages/UserProfile";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/userprofile",
                element: <UserProfile/>
            },
            , {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp/>
            }
        ]
    }
])

export default router