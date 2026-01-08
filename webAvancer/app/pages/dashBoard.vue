<template>
  <div class="dash-board-page">
    <HeaderApp />
    <div id="statText">
      <CardStatTime :Time="totalGamingTime" Description="Temps total joué." />
      <CardStatTime :Time="totalGamesOwned" Description="Jeux possédés." />
      <CardStatTime :Time="averageGamingTimePerDay" Description="Moyenne par jour." />
    </div>
    <div class="graphiqueArea">
      <TimeGraphiquePerWeek />
    </div>
    <div id="topGame">
      <TopGame
        id="top2"
        imageGame="/satisfactory.png"
        GameTitle="Satisfactory"
        hoursPlayed="95"
      />
      <div id="top1Case">
        <div id="hatCase">
          <img src="/hat.png" alt="Top Game Hat" />
        </div>
        <TopGame
          id="top1"
          imageGame="/arcRaiders.png"
          GameTitle="ARC Raiders"
          hoursPlayed="120"
        />
      </div>
      <TopGame
        id="top3"
        imageGame="/cyberpunk.png"
        GameTitle="Cyberpunk 2077"
        hoursPlayed="65"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { mockGamingData } from "../datas/mockGamingData";
import { mockStatData } from "../datas/mockStatDatats";

// Données statistiques globales depuis le mock
const totalGamingTime = computed(() => mockStatData.totalGamingTime);
const totalGamesOwned = computed(() => mockStatData.totalGamesOwned);
const averageGamingTimePerDay = computed(() => mockStatData.averageGamingTimePerDay);

// Animation du chapeau
onMounted(() => {
  const hat = document.getElementById("hatCase");
  if (!hat) return;
  let position = 0;
  let direction = 1;
  setInterval(() => {
    if (position >= 10) direction = -1;
    else if (position <= 0) direction = 1;
    position += direction;
    hat.style.transform = `translateY(-${position}px)`;
  }, 130);
});
</script>

<style scoped>
.dash-board-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7));
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
