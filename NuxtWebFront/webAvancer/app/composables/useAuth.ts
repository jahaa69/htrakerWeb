import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Player } from '~/datas/mocks/players.mock'

export const useAuth = () => {
  const router = useRouter()

  // Récupère le joueur connecté
  const currentPlayer = computed(() => {
    if (process.client) {
      const player = localStorage.getItem('currentPlayer')
      return player ? JSON.parse(player) as Player : null
    }
    return null
  })

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = computed(() => {
    if (process.client) {
      return localStorage.getItem('isAuthenticated') === 'true'
    }
    return false
  })

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('currentPlayer')
    localStorage.removeItem('isAuthenticated')
    router.push('/loginPage')
  }

  return {
    currentPlayer,
    isAuthenticated,
    logout
  }
}