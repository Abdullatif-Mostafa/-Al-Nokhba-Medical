import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const CREDENTIALS = {
  username: 'admin',
  password: 'test123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return sessionStorage.getItem('clinic_admin') ? { username: 'admin' } : null
  })

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem('clinic_admin', '1')
      setUser({ username })
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('clinic_admin')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
