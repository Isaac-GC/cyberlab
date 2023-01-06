import { useState } from "react";
import * as React from 'react';
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout";
import { useAuth } from "../components/auth";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const loginApi = async (username: string, password: string): Promise<void> => {
    const resp = await fetch("/api/login", {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (resp.status != 200) {
        throw new Error(await resp.text());
    }
    Router.push("/");
};

const ariaLabel = { 'aria-label': 'description' };

const Login = (): React.ReactElement => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { loading, isAuthenticated, login} = useAuth();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const ButtonItem = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setErrorMessage("");
        try {
            const resp = await login(username, password);
            if (resp.status === 401) {
                setErrorMessage("Invalid login credentials");
            }
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    if (!loading && isAuthenticated) Router.push("/");

    return (
        <Layout>
            <Box sx={{ 
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                }}>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate 
                sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    variant="standard"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setUsername(e.target.value)
                    }
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPassword(e.target.value)
                    }
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                </Button>
                    
                </Box>
            </Box>    
        </Layout>
    );
};

export default Login;