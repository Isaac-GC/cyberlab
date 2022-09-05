import Link from "next/link"
import { useAuth } from "./auth"
import NavMenu from "./navmenu"
import styles from "../styles/header.module.css"



const Header = (): React.ReactElement => {
    const { isAuthenticated } = useAuth();

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <NavMenu />
        </header>

    )
}

export default Header;