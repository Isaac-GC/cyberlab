import Link from "next/link"
import { useAuth } from "./auth"
import NavMenu from "./navmenu"
import styles from "../styles/header.module.css"
import Script from "next/script"


const Header = (): React.ReactElement => {
    const { isAuthenticated } = useAuth();

    return (
        <header>
            <Script src="scripts/xterm.js" />
            <NavMenu />
        </header>

    )
}

export default Header;