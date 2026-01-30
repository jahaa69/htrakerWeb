<template>
  <header class="header">
    <img src="/logoHtracker.png" alt="Mon logo" class="logo" />
    <nuxt-link to="/">
      <h1>Htracker</h1>
    </nuxt-link>
    <div id="spaceBettwen"></div>

    <!-- Dropdown de langue -->
    <div class="language-selector" @click="toggleLanguageDropdown">
      <div class="language-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          ></path>
        </svg>
        <span class="current-language">{{ currentLanguage }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          :class="{ rotate: isLanguageDropdownVisible }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <!-- Dropdown menu -->
      <Transition name="dropdown">
        <div v-if="isLanguageDropdownVisible" class="language-dropdown">
          <button
            v-for="lang in availableLanguages"
            :key="lang.code"
            class="language-option"
            :class="{ active: currentLocale === lang.code }"
            @click.stop="changeLanguage(lang.code)"
          >
            <span class="flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
            <svg
              v-if="currentLocale === lang.code"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              class="check-icon"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </Transition>
    </div>

    <img id="pp" :src="currentPlayer?.pp" alt="" />
    <div id="optionButton" @click="toggleSettings">
      <img id="logoParametre" src="/paramettre.png" alt="" />
    </div>
    <OptionSetting v-if="isSettingsVisible" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import OptionSetting from "./optionSeting.vue";
import { useAuth } from "/composables/useAuth";
import { useI18n } from "vue-i18n";

const swtchLocalePath = useSwitchLocalePath();
const router = useRouter();

const { currentPlayer, isAuthenticated } = useAuth();
const { locale } = useI18n();

// État pour le dropdown des paramètres
const isSettingsVisible = ref(false);
const toggleSettings = () => {
  isSettingsVisible.value = !isSettingsVisible.value;
  // Ferme le dropdown de langue si ouvert
  if (isLanguageDropdownVisible.value) {
    isLanguageDropdownVisible.value = false;
  }
};

// État pour le dropdown de langue
const isLanguageDropdownVisible = ref(false);
const toggleLanguageDropdown = () => {
  isLanguageDropdownVisible.value = !isLanguageDropdownVisible.value;
  // Ferme les paramètres si ouverts
  if (isSettingsVisible.value) {
    isSettingsVisible.value = false;
  }
};

// Langues disponibles
const availableLanguages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "frlol", name: "lolcarFr", flag: "🇫🇷" },
  { code: "enlol", name: "lolcatEn", flag: "🇬🇧" },
];

// Locale actuelle
const currentLocale = computed(() => locale.value);

// Nom de la langue actuelle (code en majuscules)
const currentLanguage = computed(() => {
  return currentLocale.value.toUpperCase();
});

// Changer de langue
const changeLanguage = (langCode: string) => {
  if (langCode !== currentLocale.value) {
    console.log("Changement de langue vers:", langCode);
    const newPath = swtchLocalePath(langCode);
    console.log("Chemin après changement:", newPath);
    navigateTo(newPath);
  }
  isLanguageDropdownVisible.value = false;
};

// Fermer les dropdowns si on clique ailleurs
if (process.client) {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".language-selector") && !target.closest("#optionButton")) {
      isLanguageDropdownVisible.value = false;
      isSettingsVisible.value = false;
    }
  });
}

console.log("Joueur connecté:", currentPlayer.value?.prenom, currentPlayer.value?.nom);
console.log("ID du joueur:", currentPlayer.value?.id);
</script>

<style scoped>
.logo {
  width: 50px;
  border-radius: 50%;
  height: auto;
  background-color: #ffffff;
}

#pp {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 10px;
}

.header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #0f172a;
  border-bottom: 2px solid #334155;
  position: relative;
  gap: 12px;
}

.header h1 {
  margin-left: 10px;
  font-size: 24px;
  color: #e5e7eb;
}

#spaceBettwen {
  flex-grow: 1;
}

/* Language Selector */
.language-selector {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e2e8f0;
  transition: all 0.2s;
}

.language-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
}

.current-language {
  font-size: 0.9rem;
  font-weight: 600;
  min-width: 24px;
}

.language-button svg {
  transition: transform 0.3s;
}

.language-button svg.rotate {
  transform: rotate(180deg);
}

/* Dropdown */
.language-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  min-width: 200px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;
}

.language-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.language-option:hover {
  background: rgba(139, 92, 246, 0.1);
}

.language-option.active {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}

.flag {
  font-size: 1.5rem;
}

.lang-name {
  flex: 1;
}

.check-icon {
  color: #10b981;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

#optionButton {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

#optionButton:hover {
  background: rgba(255, 255, 255, 0.05);
}

#logoParametre {
  width: 40px;
  height: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .language-button {
    padding: 6px 12px;
  }

  .current-language {
    font-size: 0.85rem;
  }

  .language-dropdown {
    min-width: 180px;
  }

  .header h1 {
    font-size: 20px;
  }

  #pp {
    width: 50px;
    height: 50px;
  }
}
</style>
