<template>
  <div class="game-detail-page">
    <HeaderApp />

    <!-- Hero Banner -->
    <div class="hero-banner">
      <img :src="image" :alt="title" class="banner-image" />
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1 class="game-title">{{ title }}</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="game-container">
      <div class="content-wrapper">
        <!-- Left Column - Game Image -->
        <div class="left-column">
          <div class="game-cover">
            <img :src="image" :alt="title" class="cover-image" />
          </div>
        </div>

        <!-- Right Column - Stats -->
        <div class="right-column">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <!-- Total Hours -->
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <p class="stat-label">Temps total joué</p>
                <p class="stat-value">{{ hoursPlayed }}<span>h</span></p>
              </div>
            </div>

            <!-- Sessions -->
            <div class="stat-card">
              <div class="stat-icon">🎮</div>
              <div class="stat-content">
                <p class="stat-label">Nombre de sessions</p>
                <p class="stat-value">{{ sessionCount }}</p>
              </div>
            </div>

            <!-- Average -->
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <p class="stat-label">Moyenne par session</p>
                <p class="stat-value">{{ averagePerSession }}<span>h</span></p>
              </div>
            </div>

            <!-- Last Played -->
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <p class="stat-label">Dernière session</p>
                <p class="stat-value">{{ lastSessionDate }}</p>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-section">
            <h3>Progression</h3>
            <div class="progress-bar-container">
              <div
                class="progress-bar-fill"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <p class="progress-text">{{ progressPercentage }}% du temps cible atteint</p>
          </div>
        </div>
      </div>

      <!-- Sessions History -->
      <div class="sessions-section">
        <h3>Historique des sessions</h3>
        <div class="sessions-list">
          <div
            v-for="(session, index) in recentSessions"
            :key="index"
            class="session-item"
          >
            <div class="session-date">{{ formatDate(session.date) }}</div>
            <div class="session-hours">{{ session.hours }}h</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import HeaderApp from "~/components/HeaderApp.vue";
import { mockGames } from "~/datas/mocks/games.mock";
import { mockSessions } from "~/datas/mocks/sessions.mock";

const route = useRoute();
const gameId = route.params.id as string;

const game = mockGames.find((g) => g.id === gameId);
const title = game ? game.title : "Jeu inconnu";
const image = game ? game.image : "";

// Sessions du jeu
const gameSessions = computed(() =>
  mockSessions.filter((session) => session.gameId === gameId)
);

// Heures totales jouées
const hoursPlayed = computed(() =>
  gameSessions.value.reduce((total, session) => total + session.hours, 0).toFixed(2)
);

// Nombre de sessions
const sessionCount = computed(() => gameSessions.value.length);

// Moyenne par session
const averagePerSession = computed(() => {
  if (sessionCount.value === 0) return "0.00";
  return (parseFloat(hoursPlayed.value) / sessionCount.value).toFixed(2);
});

// Dernière session
const lastSessionDate = computed(() => {
  if (gameSessions.value.length === 0) return "Jamais";
  const lastSession = gameSessions.value[gameSessions.value.length - 1];
  return formatDate(lastSession.date);
});

// Sessions récentes (dernières 5)
const recentSessions = computed(() => gameSessions.value.slice(-5).reverse());

// Progression (sur une cible de 50h par exemple)
const progressPercentage = computed(() => {
  const target = 50;
  const progress = (parseFloat(hoursPlayed.value) / target) * 100;
  return Math.min(progress, 100).toFixed(0);
});

// Formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
</script>

<style scoped>
.game-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f1f5f9;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  height: 350px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) blur(2px);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 40px 20px 20px;
  width: 100%;
}

.game-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Main Container */
.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 60px;
}

/* Left Column */
.left-column {
  display: flex;
  justify-content: center;
}

.game-cover {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.cover-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.game-cover:hover .cover-image {
  transform: scale(1.05);
}

/* Right Column - Stats */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #00dc82;
  margin: 0;
}

.stat-value span {
  font-size: 1rem;
  color: #64748b;
  margin-left: 4px;
}

/* Progress Section */
.progress-section {
  padding: 24px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.progress-section h3 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00dc82, #10b981);
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-text {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
}

/* Sessions Section */
.sessions-section {
  padding: 30px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.sessions-section h3 {
  margin: 0 0 20px 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.session-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.session-date {
  color: #94a3b8;
  font-size: 0.9rem;
}

.session-hours {
  font-weight: 600;
  color: #00dc82;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .banner-content {
    padding: 20px 20px 10px;
  }

  .game-title {
    font-size: 2rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .game-container {
    padding: 20px;
  }
}
</style>
