import Link from "next/link"
import { useAuth } from "./auth"
import styles from "../styles/header.module.css"


const Header = (): React.ReactElement => {
    const { isAuthenticated } = useAuth();

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <div className={styles.signedInStatus}>
                <p 
                    className={`nojs-show ${
                        !session && loading ? styles.loading : styles.loaded
                    }`}
                >
                {!session && (
                    <>
                        <span className={styles.noSignedInText}>
                            You are not signed in
                        </span>
                        <a
                            href={`/login`}
                            className={styles.buttonPrimary}
                            onClick={(e) => {
                                e.preventDefault()
                                signIn()
                            }}
                            >
                                Sign In
                            </a>
                        </>
                    )}
                    {session?.user && (
                        <>
                            <span className={styles.signedInText}>
                                <small>Signed in as</small>
                                <br />
                                <strong>{session.user.email ?? session.user.name}</strong>
                            </span>
                            <a
                                href={`/logout`}
                                className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                                >
                                    Sign Out
                            </a>
                        </>
                    )}
                </p>
            </div>
            <nav>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/lab">
                            <a>Lab</a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin">
                            <a>Admin</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;