import Link from "next/link"

export default function AccessDenied() {
    return (
        <>
            <h1>Access Denied</h1>
            <p>
                {/* <Link 
                    href="/logout"
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                /> */}
                    You must be signed in to view this page
            </p>
        </>
    )
}