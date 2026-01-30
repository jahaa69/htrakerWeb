<template>
  <div class="dash-board-page">
    <HeaderApp />

    <div id="statText">
      <CardStatTime :Time="String(totalGamingTime)" Description="Temps total joué." />
      <CardStatTime :Time="String(totalGamesOwned)" Description="Jeux possédés." />
      <CardStatTime
        :Time="String(averageGamingTimePerDay)"
        Description="Moyenne par jour."
      />
    </div>

    <div class="graphiqueArea">
      <TimeGraphiquePerWeek :sessions="allSessions" />
    </div>

    <div id="topGame">
      <div id="top1Case">
        <NuxtLink :to="`gameDetail/${topGames[0]?.id}`">
          <TopGame
            :imageGame="topGames[0]?.image || ''"
            :GameTitle="topGames[0]?.title || 'N/A'"
            :hoursPlayed="topGames[0]?.totalHours || 0"
          />
        </NuxtLink>
      </div>
      <div id="top2">
        <NuxtLink :to="`gameDetail/${topGames[1]?.id}`">
          <TopGame
            :imageGame="topGames[1]?.image || ''"
            :GameTitle="topGames[1]?.title || 'N/A'"
            :hoursPlayed="topGames[1]?.totalHours || 0"
          />
        </NuxtLink>
      </div>
      <div id="top3">
        <NuxtLink :to="`gameDetail/${topGames[2]?.id}`">
          <TopGame
            :imageGame="topGames[2]?.image || ''"
            :GameTitle="topGames[2]?.title || 'N/A'"
            :hoursPlayed="topGames[2]?.totalHours || 0"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TopGame from "/components/TopGame.vue";

//import due useAuth
import { useAuth } from "~/composables/useAuth";

// Importe tes nouveaux mocks organisés
import { mockPlayers } from "~/datas/mocks/players.mock";
import { mockGames } from "~/datas/mocks/games.mock";
import { mockSessions } from "~/datas/mocks/sessions.mock";

const { currentPlayer, isAuthenticated } = useAuth();

// Afficher le nom du joueur connecté
console.log("Joueur connecté:", currentPlayer.value?.prenom, currentPlayer.value?.nom);
console.log("ID du joueur:", currentPlayer.value?.id);

// Calcul des statistiques du temp de jeu de currentPlayer (affiche que un chiffre a 2 décimales )
const totalGamingTime = computed(() => {
  const total = mockSessions
    .filter((session) => session.playerId === currentPlayer.value?.id)
    .reduce((total, session) => total + session.hours, 0);
  return total.toFixed(2);
});

const totalGamesOwned = computed(() => {
  return mockGames.length;
});

const averageGamingTimePerDay = computed(() => {
  const uniqueDays = new Set(mockSessions.map((s) => s.date)).size;
  return uniqueDays > 0 ? (totalGamingTime.value / uniqueDays).toFixed(2) : 0;
});

// Calcul du Top 3 des jeux de Jean
const topGames = computed(() => {
  // 1. Récupère les heures jouées par jeu de Jean
  const gameHours = {};
  mockSessions.forEach((session) => {
    if (session.playerId === currentPlayer.value?.id) {
      // 👤 Jean
      if (!gameHours[session.gameId]) {
        gameHours[session.gameId] = 0;
      }
      gameHours[session.gameId] += session.hours;
    }
  });

  // 2. Transforme en tableau avec les infos du jeu
  const gamesWithHours = Object.keys(gameHours).map((gameId) => {
    const game = mockGames.find((g) => g.id === gameId);
    return {
      id: gameId,
      title: game ? game.title : "Unknown",
      image: game ? game.image : "",
      totalHours: gameHours[gameId],
    };
  });

  // 3. Trie par heures jouées (du plus grand au plus petit)
  gamesWithHours.sort((a, b) => b.totalHours - a.totalHours);

  // 4. Retourne les 3 premiers
  return gamesWithHours.slice(0, 3);
});

// Toutes les sessions pour le graphique
const allSessions = computed(() => mockSessions);

// 🐛 DEBUG - Vérifie que tout fonctionne
onMounted(() => {
  console.log("🎮 Top Games:", topGames.value);
  console.log("📊 Total Gaming Time:", totalGamingTime.value);
  console.log("🎯 Sessions:", mockSessions);
});
</script>

<style scoped>
body {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7));
}
.dash-board-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  /*overflow: hidden;*/
  min-height: 100vh;
}

#statText {
  display: flex;
  gap: 20px;
  margin-top: 50px;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.graphiqueArea {
  display: flex;
  margin-top: 50px;
  width: 100%;
  justify-content: center;
}

#topGame {
  display: flex;
  gap: 30px;
  margin-top: 80px;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

#top1Case {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#hatCase {
  margin-bottom: -40px;
  z-index: 1;
  transition: transform 0.13s ease;
}

#hatCase img {
  width: 60px;
  height: auto;
}

#top2 {
  margin-top: 40px;
}

#top3 {
  margin-top: 80px;
}

@media (max-width: 768px) {
  #statText {
    flex-direction: column;
    align-items: center;
  }

  #topGame {
    flex-direction: column;
    align-items: center;
  }

  #top2,
  #top3 {
    margin-top: 0;
  }
}
</style>
