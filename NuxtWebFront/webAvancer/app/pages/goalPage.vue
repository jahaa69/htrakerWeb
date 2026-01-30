<template>
  <div class="goals-page">
    <HeaderApp />

    <div class="goals-container">
      <!-- Header avec titre et bouton -->
      <div class="goals-header">
        <div class="header-title">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1>Mes Objectifs</h1>
        </div>
        <div class="header-actions">
          <button class="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
          <button class="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      <!-- Liste des objectifs actifs -->
      <div class="active-goals">
        <GoalCardProgress
          v-for="objectif in activeGoals"
          :key="objectif.id"
          :goal="objectif"
          :game="getGameById(objectif.gameId)"
        />
      </div>
    </div>

    <!-- Bouton d'ajout -->
    <div class="add-goal-section">
      <button class="btn-add-goal" @click="openAddGoalModal">Ajouter un Objectif</button>
    </div>
  </div>

  <!-- Modal d'ajout (optionnel) -->
  <AddGoalModal v-if="showAddModal" @close="showAddModal = false" />
</template>

<script setup>
import { ref, computed } from "vue";
import { mockGoals } from "~/datas/mocks/goal.mock";
import { mockGames } from "~/datas/mocks/games.mock";
import GoalCardProgress from "~/components/Goalcardprogress.vue";
import HeaderApp from "~/components/HeaderApp.vue";

// État
const showAddModal = ref(false);

// Récupérer un jeu par son ID
const getGameById = (gameId) => {
  return mockGames.find((game) => game.id === gameId);
};

// Objectifs actifs
const activeGoals = computed(() => {
  return mockGoals.filter((goal) => !goal.completed && goal.playerId === "player1");
});

// Ouvrir le modal d'ajout
const openAddGoalModal = () => {
  showAddModal.value = true;
};
</script>

<style scoped>
.goals-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  padding-bottom: 40px;
}

.goals-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.goals-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

/* Goals actifs */
.active-goals {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

/* Section Notes */
.notes-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Bouton d'ajout */
.add-goal-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-add-goal {
  padding: 16px 48px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-add-goal:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-add-goal:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .goals-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-title h1 {
    font-size: 1.5rem;
  }

  .btn-add-goal {
    width: 100%;
  }
}
</style>
