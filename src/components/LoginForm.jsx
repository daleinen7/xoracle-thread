import React, { useState } from "react"
import { useAuth } from "../auth/AuthProvider"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, login, setUser } = useAuth()

  const handleLogin = async event => {
    event.preventDefault()
    await login(email, password)
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
export default LoginForm
