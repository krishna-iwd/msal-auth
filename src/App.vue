<template>
  <div v-if="state.isAuthenticated">
    <div>Welcome, {{ state.user?.name }}!</div>
    <div>Email: {{ state.user?.username }}!</div>
    <button @click="handleLogout">Log Out</button>
  </div>
  <div v-else>
    <button @click="handleLogin">Log In</button>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useAuth } from './config/useAuth'
import { myMSALObj, state } from './config/msalConfig'

export default {
  setup() {
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

    return {
      handleLogin,
      handleLogout,
      state
    }
  }
}
</script>
