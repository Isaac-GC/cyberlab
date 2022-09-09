import React, { useState, useEffect, useContext } from "react";

const API_BASE = "http://localhost:8000/api"

/**
 URLS Used:
 - /token/
 - /token/refresh
 - /user/
 **/

interface User {
    id: string;
    email: string;
    name: string;
    username: string;
}

interface TokenResponse {
    access: string;
    access_expires: number;
}

const makeUrl = (endpoint: string): string => {
    return API_BASE + endpoint;
}

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

const fetchNewToken = (): Promise<Response> => {
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

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(null);

    const setNotAuthenticated = (): void => {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
    }

    const accessTokenValid = (): boolean => {
        if(accessToken === "") {
            return false;
        }
        const expiry = new Date(accessTokenExpiry);
        console.log("Checking token expiry: ", expiry);
        return expiry.getTime() > Date.now();
    };

    const initAuth = async (): Promise<void> => {
        setLoading(true);
        if (!accessTokenValid()) {
            console.log("Invalid access token. Trying to refetch the token...");
            await refreshToken();
        } else {
            setIsAuthenticated(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        initAuth();
    }, []);

    const initUser = async (token: string): Promise<void> => {
        const resp = await fetchUser(token);
        const user = await resp.json();
        setUser(user);
    };

    const refreshToken = async (): Promise<string> => {
        setLoading(true);
        const resp = await fetchNewToken();
        if (!resp.ok) {
            setNotAuthenticated();
            return;
        }
        const tokenData = await resp.json();
        handleNewToken(tokenData);
        if (user === null) {
            console.log("No user is loaded. Attempting to load from refreshed token...");
            await initUser(tokenData.access);
        }
        return tokenData.access;
    };

    const handleNewToken = (data: TokenResponse): void => {
        setAccessToken(data.access);
        const expiryInt = data.access_expires * 1000;
        setAccessTokenExpiry(expiryInt);
        setIsAuthenticated(true);
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

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        getToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): any => useContext(AuthContext);