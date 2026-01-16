import React from 'react'

const DebugAuth = () => {
  const clearAuth = () => {
    localStorage.clear()
    window.location.href = '/admin/login'
  }

  const showAuth = () => {
    const auth = {
      isAuthenticated: localStorage.getItem('isAuthenticated'),
      userRole: localStorage.getItem('userRole'),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      userAvatar: localStorage.getItem('userAvatar')
    }
    alert(JSON.stringify(auth, null, 2))
  }

  return (
    <div style={{position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'red', padding: '10px'}}>
      <button onClick={clearAuth}>Clear Auth</button>
      <button onClick={showAuth}>Show Auth</button>
    </div>
  )
}

export default DebugAuth
