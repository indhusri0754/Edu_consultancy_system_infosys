import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('authToken'))
  const [username, setUsernameState] = useState(() => localStorage.getItem('username'))
  const [isLoggedIn, setIsLoggedInState] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
  )

  const setToken = useCallback((t) => {
    setTokenState(t)
    localStorage.setItem('authToken', t)
  }, [])

  const setUsername = useCallback((u) => {
    setUsernameState(u)
    localStorage.setItem('username', u)
  }, [])

  const setLoginStatus = useCallback((status) => {
    setIsLoggedInState(status)
    localStorage.setItem('isLoggedIn', JSON.stringify(status))
  }, [])

  const logout = useCallback(() => {
    setTokenState(null)
    setUsernameState(null)
    setIsLoggedInState(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('username')
    localStorage.removeItem('isLoggedIn')
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, username, isLoggedIn, setToken, setUsername, setLoginStatus, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
