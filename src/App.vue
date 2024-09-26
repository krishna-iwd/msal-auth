<script setup>
import { onMounted } from 'vue'
import { useAuth } from './config/useAuth'
import { myMSALObj, state } from './config/msalConfig'

const { login, logout, handleRedirect } = useAuth()

const handleLogin = async () => {
  await login()
}

const handleLogout = () => {
  logout()
}

const initialize = async () => {
  try {
    await myMSALObj.initialize()
  } catch (error) {
    console.log('Initialization error:', error)
  }
}

onMounted(async () => {
  await initialize()
  await handleRedirect()
})

console.log(state)
</script>

<template>
  <div v-if="state.isAuthenticated">
    <div>
      <h3>Welcome, {{ state.user.displayName }}!</h3>
      <p>Email: {{ state.user.mail }}</p>
      <p>Job Title: {{ state.user.jobTitle }}</p>

      <!-- Display user roles -->
      <p><strong>User Roles:</strong></p>
      <ul>
        <li v-for="role in state.roles" :key="role.id">{{ role.displayName }}</li>
      </ul>

      <!-- Display user permissions (transitive memberships) -->
      <p><strong>User Permissions (Transitive Memberships):</strong></p>
      <ul>
        <li v-for="permission in state.permissions" :key="permission.id">
          {{ permission.displayName }} ({{ permission['@odata.type'] }})
        </li>
      </ul>
    </div>
    <button @click="handleLogout">Log Out</button>
  </div>
  <div v-else>
    <button @click="handleLogin">Log In</button>
  </div>
</template>
