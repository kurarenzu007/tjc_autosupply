import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const userRole = localStorage.getItem('userRole')

  useEffect(() => {
    // Optional: You can add additional validation here
    // For example, verify token with backend
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'driver') {
      return <Navigate to="/admin/delivery" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
