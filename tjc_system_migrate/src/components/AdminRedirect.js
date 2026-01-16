import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear all auth data
    localStorage.clear()
    // Force redirect to login
    navigate('/admin/login', { replace: true })
  }, [navigate])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div>Redirecting to login...</div>
    </div>
  )
}

export default AdminRedirect
