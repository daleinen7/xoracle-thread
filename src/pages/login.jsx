import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { supabase } from "../lib/supabase"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      navigate("/mypage")
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  )
}

export default Login
