// Microsoft Graph endpoints for fetching user profile, roles, manager, and permissions
const graphEndpoint = import.meta.env.VITE_MICROSOFT_GRAPH_URI

const fetchGraphData = async (resource, accessToken) => {
  const endpoint = graphEndpoint + resource
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
  return await fetchGraphData('me', accessToken)
}

export const fetchUserRoles = async (accessToken) => {
  return await fetchGraphData('me/memberOf', accessToken)
}

export const fetchUserPermissions = async (accessToken) => {
  return await fetchGraphData('me/transitiveMemberOf', accessToken)
}

export const fetchUsers = async (accessToken) => {
  return await fetchGraphData('users', accessToken)
}
