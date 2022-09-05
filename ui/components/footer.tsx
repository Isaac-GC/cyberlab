import Link from "next/link"
import styles from "../styles/footer.module.css"
import packageJSON from "../package.json"
import Copyright from "./copyright"

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <hr />
        <Copyright />
    </footer>
  )
}