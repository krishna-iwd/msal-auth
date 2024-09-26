import { PublicClientApplication } from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const graphScopes = {
  scopes: [
    'user.read',
    'openid',
    'profile',
    'User.ReadBasic.All',
    'Directory.Read.All', // Read roles
    'User.Read.All', // Read manager
    'GroupMember.Read.All' // For transitive memberships (user permissions)
  ]
}

export const state = reactive({
  isAuthenticated: false,
  user: null, // Store user profile info
  roles: [], // Store user roles
  manager: null, // Store manager information
  permissions: [] // Store user permissions (transitive memberships)
})

export const myMSALObj = new PublicClientApplication(msalConfig)
