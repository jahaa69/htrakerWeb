<template>
  <div class="bibliotheque-page">
    <HeaderApp />

    <!-- Search Bar -->
    <div class="searchbar-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un jeu..."
        class="searchbar"
      />
    </div>

    <!-- Games Grid -->
    <div class="GameLibraryGrid">
      <CardeLibraryGame
        v-for="game in filteredGames"
        :key="game.id"
        :id="game.id"
        :image="game.image"
        :title="game.title"
        :hours="getTotalHours(game.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { mockGames } from "~/datas/mocks/games.mock";
import { mockSessions } from "~/datas/mocks/sessions.mock";

// État
const searchQuery = ref("");

// Récupère tous les jeux
const games = mockGames;

// Calcule les heures totales par jeu
const getTotalHours = (gameId: string) => {
  return mockSessions
    .filter((session) => session.gameId === gameId)
    .reduce((total, session) => total + session.hours, 0)
    .toFixed(2);
};

// Filtre les jeux selon la recherche
const filteredGames = computed(() => {
  if (!searchQuery.value) return games;

  return games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.bibliotheque-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding-bottom: 40px;
}

/* Search Bar */
.searchbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 20px;
}

.searchbar {
  width: 100%;
  padding: 14px 20px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #f1f5f9;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.searchbar::placeholder {
  color: #64748b;
}

.searchbar:focus {
  outline: none;
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
}

/* Games Grid */
.GameLibraryGrid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

/* Responsive */
@media (max-width: 1024px) {
  .GameLibraryGrid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .searchbar-container {
    padding: 20px 20px 15px;
  }

  .GameLibraryGrid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  .searchbar {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .GameLibraryGrid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    padding: 12px;
  }
}
</style>
