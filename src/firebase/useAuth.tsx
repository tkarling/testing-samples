import { useContext, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebaseui'

import { UserContext } from './UserContext'

import firebaseConfig from './fbConfig'

declare var firebaseui: any

firebase.initializeApp(firebaseConfig)
const ui = new firebaseui.auth.AuthUI(firebase.auth())

const useAuth = () => {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    return () => {
      if (ui) {
        ui.reset()
      }
    }
  }, [])

  const login = () => {
    ui.reset()
    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function(
          authResult: { user: { email: string; displayName: string } },
          redirectUrl: string
        ) {
          // User successfully signed in.
          setUser({
            email: authResult.user.email,
            displayName: authResult.user.displayName
          })
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false
        }
      },
      signInSuccessUrl: 'http://localhost:3000',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    })
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setUser(null)
      })
      .catch(function(error) {
        // An error happened
        console.error('logout -> error', error)
      })
    ui.reset()
  }

  return { user, login, logout }
}

export default useAuth
