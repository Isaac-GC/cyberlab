import React, { useEffect } from "react";
import { useAuth } from "../components/auth";
import Layout from "../components/layout";

const Logout = (): React.ReactElement => {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        logout();
        const timer = setTimeout(() => {
            window.location.pathname = '/login';
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // if (isAuthenticated) return null;
    return (
        <Layout>
            <h1 className="text-x1 pt-3 pb-5">You've been logged out</h1>
            <h4>You'll be redirected to the login page within 5 seconds...</h4>
        </Layout>
    )
}

export default Logout;