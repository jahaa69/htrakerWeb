<template>
  <div class="game-card">
    <!-- Image du jeu -->
    <div class="game-image-container">
      <img :src="image" :alt="title" class="game-image" />
      <div class="image-overlay">
        <NuxtLink :to="`/gameDetail/${id}`" class="play-button">
          <span>👁️ Voir détails</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="game-content">
      <h3 class="game-title">{{ title }}</h3>
      <p class="game-hours">
        <span class="hours-icon">⏱️</span>
        <span class="hours-value">{{ hours }}h</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  hours: {
    type: [Number, String],
    required: true,
  },
});
</script>

<style scoped>
.game-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

/* Image Container */
.game-image-container {
  position: relative;
  width: 100%;
  padding-top: 133.33%; /* Ratio 3:4 pour les jaquettes */
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.game-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image {
  transform: scale(1.08);
}

/* Overlay au hover */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.game-card:hover .image-overlay {
  opacity: 1;
}

.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.play-button:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

/* Contenu */
.game-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.game-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.game-hours {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  color: #94a3b8;
}

.hours-icon {
  font-size: 1.1rem;
}

.hours-value {
  font-weight: 600;
  color: #00dc82;
}

/* Responsive */
@media (max-width: 768px) {
  .game-card {
    border-radius: 8px;
  }

  .game-title {
    font-size: 1rem;
  }

  .game-content {
    padding: 12px;
  }
}
</style>
