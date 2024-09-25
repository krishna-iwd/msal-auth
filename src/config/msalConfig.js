import { PublicClientApplication } from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', //Replace with actual ClientId
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', //Replace with actual TenantId
    redirectUri: 'http://localhost:8080/' // Replace with your actual redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const graphScopes = {
  scopes: ['user.read', 'openid', 'profile']
}

export const state = reactive({
  isAuthenticated: false,
  user: null
})

export const myMSALObj = new PublicClientApplication(msalConfig)
