import { ref } from 'vue'
import { myMSALObj, state } from './msalConfig'

export function useAuth() {
  const isAuthenticated = ref(false)

  const login = async () => {
    try {
      // Ensure MSAL is initialized
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }

      const loginResponse = await myMSALObj.loginRedirect()
      isAuthenticated.value = true
      console.log('Login success:', loginResponse)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = () => {
    try {
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }
      myMSALObj.logoutRedirect()
      isAuthenticated.value = false
      console.log('Logged out')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleRedirect = async () => {
    try {
      const response = await myMSALObj.handleRedirectPromise()
      state.isAuthenticated = myMSALObj.getAllAccounts().length > 0
      state.user = myMSALObj.getAllAccounts()[0] || null
      console.log('Redirect handled:', response)
    } catch (error) {
      console.error('Redirect error:', error)
    }
  }

  return { isAuthenticated, login, logout, handleRedirect }
}
