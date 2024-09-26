// Microsoft Graph endpoints for fetching user profile, roles, manager, and permissions
const graphEndpoint = 'https://graph.microsoft.com/v1.0/'
const profileEndpoint = graphEndpoint + 'me'
const rolesEndpoint = graphEndpoint + 'me/memberOf'
const permissionsEndpoint = graphEndpoint + 'me/transitiveMemberOf'

const fetchGraphData = async (endpoint, accessToken) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    return null
  }
}

export const fetchUserProfile = async (accessToken) => {
  return await fetchGraphData(profileEndpoint, accessToken)
}

export const fetchUserRoles = async (accessToken) => {
  return await fetchGraphData(rolesEndpoint, accessToken)
}

export const fetchUserPermissions = async (accessToken) => {
  return await fetchGraphData(permissionsEndpoint, accessToken)
}
