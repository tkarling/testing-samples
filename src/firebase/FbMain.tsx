import React, { useEffect } from 'react'
import useAuth from './useAuth'

const FbMain = () => {
  const { user, login, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      login()
    }
  }, [login, user])

  return user ? (
    <div>
      <div>Logged in as {user.displayName}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  ) : (
    <div />
  )
}

export default FbMain
