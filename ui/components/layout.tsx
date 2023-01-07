import Header from "./header"
import Footer from "./footer"

import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container';
import Script from "next/script";


const Layout = ({ children, ...props }: any ): React.ReactElement => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

    return (
        <>
            <ThemeProvider  theme={theme}>
                <CssBaseline />
                <Header />
                    <Container maxWidth={false} component="main">
                        <main>{children}</main>
                    </Container>
                    <Script src="scripts/demo.js" strategy="lazyOnload" />
                {/* <Footer /> */}
            </ThemeProvider>
        </>

    )
}

export default Layout