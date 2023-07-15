import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { supabase } from "../lib/supabase"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async event => {
    event.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      navigate("/mypage")
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
