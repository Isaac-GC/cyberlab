import Link from "next/link"
import { useAuth } from "./auth"
import NavMenu from "./navmenu"
import styles from "../styles/header.module.css"



const Header = (): React.ReactElement => {
    const { isAuthenticated } = useAuth();

    return (
        <header>
            <NavMenu />
        </header>

    )
}

export default Header;