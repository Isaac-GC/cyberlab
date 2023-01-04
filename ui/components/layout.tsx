import Header from "./header"
import Footer from "./footer"

import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container';


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
                    <Container maxWidth="lg" component="main">
                        <main>{children}</main>
                    </Container>
                {/* <Footer /> */}
            </ThemeProvider>
        </>

    )
}

export default Layout