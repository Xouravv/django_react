import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode' // import dependency
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await auth();
            } catch (error) {
                console.error("Authorization check failed:", error);
                setIsAuthorized(false);
            }
        };

        checkAuth();
    }, []);

    const refreshToken = async () => {
        const refToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("api/token/refresh/", { refresh: refToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExp < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Currently Loading....</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
