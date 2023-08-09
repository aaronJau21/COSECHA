// import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export const ProtectedRoute = () => {
    // const [isAuth, setIsAuth] = useState(false)
    const auth = useAuth()
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
