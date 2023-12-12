/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import Home from "../Pages/Home/Home"
import IndividualChatPage from "../Pages/IndividualChatPage/IndividualChatPage"
import SingInPage from "../Pages/auth/SingInPage"
import SingUpPage from "../Pages/auth/SingUpPage"
const AppRoutes = () => {
    /* protect routes here to prevent forced navigation whenever user tries to 
    force navigate then automatically the browser will refresh Because of 
    refresh the app will restart every component will reloaded then below useEffect will trigger 
    then checks in local storage if the token is present or not*/

    const navigate = useNavigate()
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/sign-in") : navigate("/")
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SingInPage />} />
            <Route path="/sign-up" element={<SingUpPage />} />
            <Route path="/chat/:name" element={<IndividualChatPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
export default AppRoutes;

