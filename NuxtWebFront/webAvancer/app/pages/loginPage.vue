<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Tabs Navigation -->
        <div class="tabs">
          <button
            :class="['tab', { active: activeTab === 'login' }]"
            @click="activeTab = 'login'"
          >
            Connexion
          </button>
          <button
            :class="['tab', { active: activeTab === 'register' }]"
            @click="activeTab = 'register'"
          >
            Inscription
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="form">
          <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input
              id="pseudo"
              v-model="loginForm.pseudo"
              type="text"
              placeholder="votre.pseudo"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" class="btn-primary" :disabled="isLoading">
            {{ isLoading ? "Connexion..." : "Connexion" }}
          </button>
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="form">
          <div class="form-group">
            <label for="name">Nom d'utilisateur</label>
            <input
              id="name"
              v-model="registerForm.login"
              type="text"
              placeholder="Votre nom d'utilisateur"
              required
            />
          </div>
          <div class="form-group">
            <label for="reg-email">Email</label>
            <input
              id="reg-email"
              v-model="registerForm.email"
              type="email"
              placeholder="votre@email.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="reg-password">Mot de passe</label>
            <input
              id="reg-password"
              v-model="registerForm.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="form-group">
            <label for="reg-password-confirm">Confirmer le mot de passe</label>
            <input
              id="reg-password-confirm"
              v-model="registerForm.passwordConfirm"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" class="btn-primary" :disabled="isLoading">
            {{ isLoading ? "Inscription..." : "S'inscrire" }}
          </button>
          <p v-if="registerError" class="error-message">{{ registerError }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mockPlayers } from "~/datas/mocks/players.mock";

const router = useRouter();

// State
const activeTab = ref<"login" | "register">("login");
const isLoading = ref(false);
const loginError = ref("");
const registerError = ref("");

// Form Data
const loginForm = ref({
  pseudo: "",
  password: "",
});

const registerForm = ref({
  login: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

/**
 * Gère la soumission du formulaire de connexion
 */
const handleLogin = async () => {
  loginError.value = "";
  isLoading.value = true;

  try {
    // Simule un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Cherche le joueur dans mockPlayers
    const player = mockPlayers.find(
      (p) => p.plseudo === loginForm.value.pseudo && p.mdp === loginForm.value.password
    );

    if (!player) {
      loginError.value = "Pseudo ou mot de passe incorrect";
      return;
    }

    // Stocke les infos du joueur connecté dans localStorage
    localStorage.setItem("currentPlayer", JSON.stringify(player));
    localStorage.setItem("isAuthenticated", "true");

    console.log("✅ Connexion réussie :", player);

    // Réinitialise le formulaire
    loginForm.value = { pseudo: "", password: "" };

    // Redirection vers le dashboard
    await router.push("/dashBoard");
  } catch (error: any) {
    loginError.value = error.message || "Une erreur est survenue";
    console.error("❌ Erreur de connexion :", error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Gère la soumission du formulaire d'inscription
 */
const handleRegister = async () => {
  registerError.value = "";

  // Validation des mots de passe
  if (registerForm.value.password !== registerForm.value.passwordConfirm) {
    registerError.value = "Les mots de passe ne correspondent pas";
    return;
  }

  if (registerForm.value.password.length < 6) {
    registerError.value = "Le mot de passe doit contenir au moins 6 caractères";
    return;
  }

  // Vérifie si le pseudo existe déjà
  if (mockPlayers.some((p) => p.plseudo === registerForm.value.login)) {
    registerError.value = "Ce pseudo est déjà utilisé";
    return;
  }

  isLoading.value = true;

  try {
    // Simule un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    // ℹ️ Note: L'inscription dans un vrai système aurait une API
    // Ici on simule juste un succès puis on passe à la connexion

    console.log("✅ Inscription simulée réussie");

    // Passe à l'onglet de connexion
    activeTab.value = "login";
    loginForm.value.pseudo = registerForm.value.login;
    loginForm.value.password = registerForm.value.password;
    registerError.value = "";
    registerForm.value = { login: "", email: "", password: "", passwordConfirm: "" };
  } catch (error: any) {
    registerError.value = error.message || "Une erreur est survenue";
    console.error("❌ Erreur d'inscription :", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* Fond avec image et dégradé */
.login-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/wp.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(6px);
  -webkit-filter: blur(6px);
  transform: scale(1.03);
  z-index: 0;
  pointer-events: none;
}

/* Overlay dégradé pour la lisibilité */
.login-page::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.85));
  z-index: 1;
  pointer-events: none;
}

.login-container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  padding: 40px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.tab {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.9);
}

.tab.active {
  color: #00dc82;
  border-bottom-color: #00dc82;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-group input:focus {
  outline: none;
  border-color: #00dc82;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.1);
}

.btn-primary {
  padding: 12px 16px;
  background: linear-gradient(135deg, #00dc82 0%, #00a155 100%);
  color: rgba(15, 23, 42, 0.95);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 220, 130, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
