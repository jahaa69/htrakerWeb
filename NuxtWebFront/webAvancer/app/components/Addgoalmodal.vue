<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Ajouter un Objectif</h2>
        <button class="btn-close" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form class="modal-form" @submit.prevent="handleSubmit">
        <!-- Titre -->
        <div class="form-group">
          <label for="title">Titre de l'objectif</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Ex: Terminer The Witcher 3"
            required
          />
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Décrivez votre objectif..."
            rows="3"
          ></textarea>
        </div>

        <!-- Jeu -->
        <div class="form-group">
          <label for="game">Jeu associé</label>
          <select id="game" v-model="formData.gameId" required>
            <option value="">Sélectionnez un jeu</option>
            <option v-for="game in games" :key="game.id" :value="game.id">
              {{ game.title }}
            </option>
          </select>
        </div>

        <!-- Type d'objectif -->
        <div class="form-group">
          <label>Type d'objectif</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="formData.type" value="time" />
              <span>Temps de jeu</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.type" value="percentage" />
              <span>Pourcentage</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.type" value="deadline" />
              <span>Date limite</span>
            </label>
          </div>
        </div>

        <!-- Champs conditionnels selon le type -->
        <div v-if="formData.type === 'time'" class="form-row">
          <div class="form-group">
            <label for="currentHours">Heures actuelles</label>
            <input
              id="currentHours"
              v-model.number="formData.currentHours"
              type="number"
              min="0"
              step="0.5"
              placeholder="0"
            />
          </div>
          <div class="form-group">
            <label for="targetHours">Heures cibles</label>
            <input
              id="targetHours"
              v-model.number="formData.targetHours"
              type="number"
              min="1"
              step="0.5"
              placeholder="50"
              required
            />
          </div>
        </div>

        <div v-else-if="formData.type === 'percentage'" class="form-group">
          <label for="progress">Progression actuelle (%)</label>
          <input
            id="progress"
            v-model.number="formData.progress"
            type="number"
            min="0"
            max="100"
            placeholder="0"
          />
        </div>

        <div v-else-if="formData.type === 'deadline'" class="form-group">
          <label for="deadline">Date limite</label>
          <input id="deadline" v-model="formData.deadline" type="date" required />
        </div>

        <!-- Boutons -->
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Annuler
          </button>
          <button type="submit" class="btn-primary">Créer l'objectif</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mockGames } from "~/datas/mocks/games.mock";

const emit = defineEmits(["close", "submit"]);

const games = ref(mockGames);

const formData = ref({
  title: "",
  description: "",
  gameId: "",
  type: "time",
  currentHours: 0,
  targetHours: 50,
  progress: 0,
  deadline: "",
});

const handleSubmit = () => {
  // Créer un nouvel objectif
  const newGoal = {
    id: `goal${Date.now()}`,
    playerId: "player1", // À adapter selon ton système d'auth
    gameId: formData.value.gameId,
    title: formData.value.title,
    description: formData.value.description,
    timestamp: Date.now(),
    completed: false,
  };

  // Ajouter les champs spécifiques selon le type
  if (formData.value.type === "time") {
    newGoal.currentHours = formData.value.currentHours;
    newGoal.targetHours = formData.value.targetHours;
  } else if (formData.value.type === "percentage") {
    newGoal.progress = formData.value.progress;
  } else if (formData.value.type === "deadline") {
    newGoal.deadline = new Date(formData.value.deadline).getTime();
  }

  emit("submit", newGoal);
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

.btn-close {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.08);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.2s;
}

.radio-label:hover {
  background: rgba(255, 255, 255, 0.05);
}

.radio-label input[type="radio"] {
  width: auto;
  margin: 0;
}

.radio-label span {
  color: #e2e8f0;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    max-height: 100vh;
    border-radius: 0;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .radio-group {
    flex-direction: column;
  }
}
</style>
