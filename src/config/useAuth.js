import { ref } from 'vue'
import { myMSALObj, state, graphScopes } from './msalConfig'
import { fetchUserProfile, fetchUserRoles, fetchUserPermissions } from '@/graph/graphService'

const setActiveAccount = () => {
  const accounts = myMSALObj.getAllAccounts()
  if (accounts.length > 0) {
    myMSALObj.setActiveAccount(accounts[0])
  }
}

export function useAuth() {
  const isAuthenticated = ref(false)

  const fetchAccessToken = async () => {
    const accessTokenRequest = {
      scopes: graphScopes.scopes
    }
    const response = await myMSALObj.acquireTokenSilent(accessTokenRequest)
    return response.accessToken
  }

  const setUserDetails = async () => {
    const accessToken = await fetchAccessToken()

    state.user = await fetchUserProfile(accessToken)
    state.roles = (await fetchUserRoles(accessToken)).value
    state.permissions = (await fetchUserPermissions(accessToken)).value
  }

  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }
      await myMSALObj.loginRedirect(graphScopes)
      isAuthenticated.value = true
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
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleRedirect = async () => {
    try {
      const response = await myMSALObj.handleRedirectPromise()
      if (response) {
        state.isAuthenticated = myMSALObj.getAllAccounts().length > 0
        setActiveAccount()
        await setUserDetails()
      }
    } catch (error) {
      console.error('Redirect error:', error)
    }
  }

  return { isAuthenticated, login, logout, handleRedirect }
}
