import { ref } from 'vue'
import { myMSALObj, state, graphScopes } from './msalConfig'

// Microsoft Graph endpoints for fetching user profile, roles, manager, and permissions
const graphProfileEndpoint = 'https://graph.microsoft.com/v1.0/me'
const graphRolesEndpoint = 'https://graph.microsoft.com/v1.0/me/memberOf'
const graphManagerEndpoint = 'https://graph.microsoft.com/v1.0/me/manager'
const graphPermissionsEndpoint = 'https://graph.microsoft.com/v1.0/me/transitiveMemberOf'

export function useAuth() {
  const isAuthenticated = ref(false)

  // Function to fetch user profile from Microsoft Graph
  const fetchUserProfile = async (accessToken) => {
    const profileResponse = await fetch(graphProfileEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const userProfile = await profileResponse.json()
    state.user = userProfile // Store the user profile in state
  }

  // Function to fetch user roles from Microsoft Graph
  const fetchUserRoles = async (accessToken) => {
    const rolesResponse = await fetch(graphRolesEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const rolesData = await rolesResponse.json()
    state.roles = rolesData.value // Store user roles in state
  }

  // Function to fetch user manager from Microsoft Graph
  const fetchUserManager = async (accessToken) => {
    const managerResponse = await fetch(graphManagerEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const managerData = await managerResponse.json()
    state.manager = managerData // Store manager information in state
  }

  // Function to fetch user transitive permissions from Microsoft Graph
  const fetchUserPermissions = async (accessToken) => {
    const permissionsResponse = await fetch(graphPermissionsEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const permissionsData = await permissionsResponse.json()
    state.permissions = permissionsData.value // Store user permissions in state
  }

  // Function to acquire token and fetch profile and roles
  const fetchUserDetails = async () => {
    const accessTokenRequest = {
      scopes: graphScopes.scopes
    }

    // Get access token silently if the user is already authenticated
    const response = await myMSALObj.acquireTokenSilent(accessTokenRequest)
    const accessToken = response.accessToken

    // Fetch profile, roles, manager, and permissions using the access token
    await fetchUserProfile(accessToken)
    await fetchUserRoles(accessToken)
    await fetchUserManager(accessToken)
    await fetchUserPermissions(accessToken)
  }

  // Handle login and fetch user details after successful login
  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
      }

      // Login using redirect
      await myMSALObj.loginRedirect(graphScopes)

      // After login, fetch user details (profile and roles)
      await fetchUserDetails()
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
      console.log('Logged out')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Handle redirect response after login
  const handleRedirect = async () => {
    try {
      const response = await myMSALObj.handleRedirectPromise()
      if (response) {
        state.isAuthenticated = myMSALObj.getAllAccounts().length > 0
        await fetchUserDetails() // Fetch user details after handling redirect
      }
    } catch (error) {
      console.error('Redirect error:', error)
    }
  }

  return { isAuthenticated, login, logout, handleRedirect }
}
