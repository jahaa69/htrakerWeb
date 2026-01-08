<template>
  <div class="login-container">
    <div class="login-card">
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
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="loginForm.email"
            type="email"
            placeholder="votre@email.com"
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
        <button type="submit" class="btn-primary">Connexion</button>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="registerForm.name"
            type="text"
            placeholder="Votre nom"
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
        <button type="submit" class="btn-primary">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "@/lib/supabase";


</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #999;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
}
</style>
