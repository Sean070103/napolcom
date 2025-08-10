"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from './data-store'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: 'user' | 'admin' | 'super_admin') => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = () => {
      try {
        const sessionUser = localStorage.getItem('napolcom_user')
        if (sessionUser) {
          setUser(JSON.parse(sessionUser))
        }
      } catch (error) {
        console.error('Error loading session:', error)
        localStorage.removeItem('napolcom_user')
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string, role?: 'user' | 'admin' | 'super_admin'): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate authentication with the data store
      const { dataStore } = await import('./data-store')
      
      // Find user by email
      const foundUser = dataStore.getUserByEmail(email)
      
      if (!foundUser) {
        return false
      }

      if (!foundUser.isActive) {
        return false
      }

      // If role is specified, check if it matches the user's actual role
      if (role && foundUser.role !== role) {
        return false
      }

      // In a real app, you would verify the password hash
      // For demo purposes, we'll accept any password for existing users
      // In production, use: bcrypt.compare(password, foundUser.passwordHash)
      
      // Update last login
      const updatedUser = dataStore.updateUser(foundUser.id, {
        lastLoginAt: new Date().toISOString()
      })

      if (updatedUser) {
        setUser(updatedUser)
        localStorage.setItem('napolcom_user', JSON.stringify(updatedUser))
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('napolcom_user')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
