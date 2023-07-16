import React from "react"
import { Link } from "gatsby"
import { useAuth } from "../auth/AuthProvider"
import "../styles/tailwind.css"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  console.log("USER", user)

  return (
    <>
      <header>
        <h1 className="text-center">Oracle Thread</h1>
        <nav>
          <ul
            style={{
              display: `flex`,
              justifyContent: `space-evenly`,
              listStyle: `none`,
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/createdeck">Create Deck</Link>
            </li>
            <li>
              {user ? (
                <>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
