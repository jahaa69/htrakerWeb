<template>
  <div class="goal-card-progress">
    <div class="goal-content">
      <div class="goal-main">
        <h3 class="goal-title">{{ goal.title }}</h3>
        <p class="goal-description">{{ goal.description }}</p>
      </div>

      <div class="goal-stats">
        <!-- Pour un objectif avec progression (heures ou pourcentage) -->
        <div v-if="progressType === 'time'" class="progress-value">
          {{ currentProgress }} / {{ targetProgress }}
        </div>
        <div v-else-if="progressType === 'percentage'" class="progress-value percentage">
          {{ progressPercentage }}%
        </div>
        <div v-else class="progress-value date">
          Avant le {{ formatDate(goal.deadline) }}
        </div>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="progress-bar-container">
      <div
        class="progress-bar-fill"
        :style="{ width: progressPercentage + '%' }"
        :class="progressColorClass"
      ></div>
    </div>

    <!-- Info supplémentaire (pourcentage ou date) -->
    <div class="goal-footer">
      <span v-if="progressType === 'percentage'" class="footer-text">
        {{ progressPercentage }}% complété
      </span>
      <span v-else-if="game" class="footer-text game-name"> 🎮 {{ game.title }} </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  goal: {
    type: Object,
    required: true,
  },
  game: {
    type: Object,
    default: null,
  },
});

// Détermine le type de progression
const progressType = computed(() => {
  if (props.goal.currentHours !== undefined && props.goal.targetHours !== undefined) {
    return "time";
  } else if (props.goal.progress !== undefined) {
    return "percentage";
  }
  return "deadline";
});

// Progression actuelle (texte)
const currentProgress = computed(() => {
  if (progressType.value === "time") {
    return `${props.goal.currentHours}h`;
  }
  return "";
});

// Progression cible (texte)
const targetProgress = computed(() => {
  if (progressType.value === "time") {
    return `${props.goal.targetHours}h`;
  }
  return "";
});

// Calcul du pourcentage
const progressPercentage = computed(() => {
  if (progressType.value === "time") {
    return Math.round((props.goal.currentHours / props.goal.targetHours) * 100);
  } else if (progressType.value === "percentage") {
    return props.goal.progress || 0;
  }
  return 0;
});

// Classe de couleur selon le pourcentage
const progressColorClass = computed(() => {
  const percentage = progressPercentage.value;
  if (percentage >= 80) return "progress-high";
  if (percentage >= 50) return "progress-medium";
  return "progress-low";
});

// Formater la date
const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>

<style scoped>
.goal-card-progress {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.goal-card-progress:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: rgba(139, 92, 246, 0.5);
}

.goal-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.goal-main {
  flex: 1;
}

.goal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 8px 0;
}

.goal-description {
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
}

.goal-stats {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.progress-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #10b981;
  white-space: nowrap;
}

.progress-value.percentage {
  color: #8b5cf6;
}

.progress-value.date {
  font-size: 0.9rem;
  color: #f59e0b;
}

/* Barre de progression */
.progress-bar-container {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease, background 0.3s;
}

.progress-bar-fill.progress-low {
  background: linear-gradient(90deg, #10b981, #059669);
}

.progress-bar-fill.progress-medium {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.progress-bar-fill.progress-high {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

/* Footer */
.goal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-size: 0.9rem;
  color: #64748b;
}

.footer-text.game-name {
  color: #94a3b8;
}

/* Responsive */
@media (max-width: 768px) {
  .goal-content {
    flex-direction: column;
  }

  .goal-stats {
    margin-left: 0;
    margin-top: 12px;
  }

  .goal-title {
    font-size: 1.1rem;
  }
}
</style>
