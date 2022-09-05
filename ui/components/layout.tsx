import Header from "./header"
import Footer from "./footer"


const Layout = ({ children }): React.ReactElement => {
    return (
        <>
            <Header />
                <main>{children}</main>
            <Footer />
        </>

    )
}

export default Layout