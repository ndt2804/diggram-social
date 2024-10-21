import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getCookie, setCookie, deleteCookie, axiosPrivate } from "../libs/api/api";
import { useSignOutAccount } from "../libs/react-query/react-query";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const { mutateAsync: signOut } = useSignOutAccount();

    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const userCookie = getCookie('user');
            if (userCookie) {
                const currentUser = JSON.parse(userCookie);
                console.log("Current user:", currentUser);
                setUser(currentUser);
                setIsAuthenticated(true);
                console.log("User authenticated");
                return true;
            }
            console.log("No current user found");
            return false;
        } catch (error) {
            console.error("Error checking auth user:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const logout = async (expired = false) => {
        try {
            await signOut(); // Gọi mutation logout
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            deleteCookie('user');
            setUser(null);
            setIsAuthenticated(false);
            setIsTokenExpired(expired);

            navigate("/sign-in");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    useEffect(() => {
        const cookieFallback = getCookie("user");
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate("/sign-in");
        }
        checkAuthUser();
        // Thêm interceptor để xử lý token hết hạn
        const interceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.isRefreshTokenExpired) {
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function
        return () => {
            axiosPrivate.interceptors.response.eject(interceptor);
        };
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        isTokenExpired,
        setIsTokenExpired,
        checkAuthUser,
        logout,

    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
