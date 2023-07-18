import React, { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { navigate } from "gatsby"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      setUser(data.user)
    }
    getUser()
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      setUser(data.user)

      console.log("User logged in successfully", user)
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
