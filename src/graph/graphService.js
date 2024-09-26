// Microsoft Graph endpoints for fetching user profile, roles, manager, and permissions
const graphEndpoint = import.meta.env.VITE_MICROSOFT_GRAPH_URI

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
  return await fetchGraphData(graphEndpoint + 'me', accessToken)
}

export const fetchUserRoles = async (accessToken) => {
  return await fetchGraphData(graphEndpoint + 'me/memberOf', accessToken)
}

export const fetchUserPermissions = async (accessToken) => {
  return await fetchGraphData(graphEndpoint + 'me/transitiveMemberOf', accessToken)
}
