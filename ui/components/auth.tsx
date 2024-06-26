import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Router } from "@mui/icons-material";
import { Constants } from "../utils/constants";

/**
 URLS Used:
 - /token/
 - /token/refresh
 - /user/
 **/

// TODO Clean up and make authentication flow cleaner

// Interfaces used to parse responses
interface User {
    id: string;
    email: string;
    username: string;
    is_admin: number;
}

interface TokenResponse {
    access: string;
    access_expires: number;
}

// Utility Functions

const makeUrl = (endpoint: string): string => {
    return Constants.API_BASE + endpoint;
}


// Functions used to connect and retrieve the tokens
const fetchToken = (username: string, password: string): Promise<Response> => {
    const url = makeUrl("/token/");

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type" : "application/json",
        },
        credentials: "include"
    });
};

const fetchRefreshToken = (): Promise<Response> => {
    const url = makeUrl("/token/refresh/");
    
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        credentials: "include",
    });
}

async function fetchUser(token: string): Promise<Response> {
    const url = makeUrl("/profile/");

    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}


// Set up the Authentication context to ensure users are properly auth'd
type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<Response>;
    logout: () => void;
    getToken: () => Promise<string>;
}

const AuthContext = React.createContext<Partial<AuthContextProps>>({});
interface AuthProviderProps {
    children: React.ReactNode;
}


// Setup the Authorization and Authentication provider
export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Server side checks
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Client properties/checks/props
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(null);

    const setNotAuthenticated = (): void => {
        setIsAuthenticated(false);
        setIsAuthorized(false);
        setLoading(false);
        setUser(null);
    }

    const accessTokenValid = (): boolean => {
        if(accessToken === "") {
            return false;
        }
        const expiry = new Date(accessTokenExpiry!);
        console.log("Checking token expiry: ", expiry);
        return expiry.getTime() > Date.now();
    };

    const refreshToken = async(): Promise<string> => {
        setLoading(true);

        // Try to refresh the token
        const resp = await fetchRefreshToken();
        if (!resp.ok) {
            setNotAuthenticated();
            return '';
        }
        // Get the Access token after receiving the new 'refreshed' token
        const tokenData = await resp.json();
        if (user === null) {
            console.log("No user is loaded. Attempting load from refreshed token...");
            await initUser(tokenData.access);
        }
        return tokenData.access;
    }

    const initAuth = async (): Promise<void> => {
        setLoading(true);
        if (!accessTokenValid()) {
            if (accessToken == '' || accessTokenExpiry == null) {
                return;
            }
            console.log("Invalid access token. Trying to refetch the token...");
            await refreshToken();
        } else {
            setIsAuthenticated(true);
            setIsAuthorized(true);
            setLoading(false);
        }
        if (user?.is_admin === 1) {
            setIsAdmin(true);
        }
    };



    const initUser = async (token: string): Promise<void> => {
        const resp = await fetchUser(token);
        const user = await resp.json();
        setUser(user);
    };


    const handleNewToken = (data: TokenResponse): void => {
        setAccessToken(data.access);
        const expiryInt = data.access_expires * 1000;
        setAccessTokenExpiry(expiryInt);
        setIsAuthenticated(true);
        setIsAuthorized(true);
        setLoading(false);
    };

    const login = async (username: string, password: string): Promise<Response> => {
        const resp = await fetchToken(username, password);
        if (resp.ok) {
            const tokenData = await resp.json();
            handleNewToken(tokenData);
            await initUser(tokenData.access);
        } else {
            setIsAuthenticated(false);
            setLoading(true);
        }
        return resp;
    };

    const getToken = async (): Promise<string> => {
        console.log("Getting access token...");
        if (accessTokenValid()) {
            console.log("Existing access token is still valid");
            return Promise.resolve(accessToken);
        } else if (loading) {
            while(loading) {
                console.log("Getting access token. Waiting for token to be refreshed...");
            }
            return Promise.resolve(accessToken);
        } else {
            console.log("Retrieving a new access token...");
            const token = await refreshToken();
            return token;
        }
    };

    const logout = (): void => {
        setAccessToken("");
        setAccessTokenExpiry(null);
        setNotAuthenticated();
        const url = makeUrl("/token/logout/");
        fetch(url, {
            method: "POST",
            credentials: "include"
        });
    };


    // Authenticated Route Guarding Logic
    const routeCheck = (url: string): void => {
        const currentPagePath = url.split('?')[0];

        // if (!isAuthenticated) {
        //     setNotAuthenticated();
        //     router.push({
        //         pathname: '/login',
        //     })
        // Doing a double check if authenticated
        // } else if (!isAuthorized && isAuthenticated) {
        //     // setIsAuthenticated(false);
        //     console.log("Either page doesn't exist or users doesn't have permissions to access the page");
        //     router.push({
        //         pathname: '/home',
        //     })
        // } else {
        //     setNotAuthenticated();
        //     console.log("An error occurred. Returning user to login page");
        // }

        // function returnToLoginPage() {
        //     isAuthorized(false);
        //     router.push({
        //         pathname: loginPage,
        //         query: { returnUrl: router.asPath }
        //     });
        // }

        // if (isAuthenticated) {
        //     console.log("authenticated")
        //     if (user === null) {
        //         isAuthorized(false);
        //         console.log("Authenticated, but not authorized")
        //         // returnToLoginPage();
        //     } else {
        //         // initAuth();
        //     }
        // } else {
        //     setNotAuthenticated();
        //     // returnToLoginPage();
        //     console.log("Not authenticated");
        // }

        // if (!authorized)  {
        //     if (!loginPage.includes(currentPagePath) || !homePage.includes(currentPagePath)) {
        //         // returnToLoginPage();
        //         console.log(currentPagePath);
        //         console.log("Not authorized");
        //     } else if (isAuthenticated) {
        //         initAuth();
        //     }
        // } else {
        //     setIsAuthenticated(true);
        //     setIsAuthorized(true);
        // }
        if (isAuthenticated) {
            if (user === null) {
                setIsAuthorized(false);

            } else {
                initAuth();
            }
        } else {
            setNotAuthenticated();
        }
    };


    useEffect(() => {
        
        routeCheck(router.asPath);

        // const hideContent = () => setIsAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);
        
        router.events.on('routeChangeComplete', routeCheck);

        return () => {
            // router.events.off('routeChangeStart', hideContent);
            router.events.on('routeChangeComplete', routeCheck);
        }
        
    }, []);


    // Values that can be used in other component/page logic
    const value = {
        isAuthenticated,
        isAuthorized,
        isAdmin,
        user,
        loading,
        login,
        logout,
        getToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): any => useContext(AuthContext);


