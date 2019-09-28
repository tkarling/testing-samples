import React from 'react'

export const UserContext = React.createContext({
  user: null as { email: string; displayName: string } | null,
  setUser: (user: { email: string; displayName: string } | null) => {
    /**noop */
  }
})
