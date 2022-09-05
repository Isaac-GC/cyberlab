import React, { useEffect } from "react";
import { useAuth } from "../components/auth";
import Layout from "../components/layout";

const Logout = (): React.ReactElement => {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    if (isAuthenticated) return null;
    return (
        <Layout>
            <h1 className="text-x1 pt-3 pb-5">You've been logged out</h1>
        </Layout>
    )
}

export default Logout;