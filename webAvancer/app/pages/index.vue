<template>
  <div class="index-page">
    <h1>Track your gaming time, understand your habits</h1>
    <h2>Analyze your gameplay, set goals, and see your progress.</h2>
    <div class="button-main">
      <NuxtLink to="/dashBoard">
        <MainButton />
      </NuxtLink>
    </div>
    <div id="card-cath">
      <CardCath
        id="card-stats"
        logo="/stats.png"
        title="Game Stats"
        description="Analyze your addiction stats."
      />
      <CardCath
        id="card-time"
        logo="/TimeStats.png"
        title="Time Tracking"
        description="Track your gaming time."
      />
      <CardCath
        id="card-goals"
        logo="/goalMedal.png"
        title="Set Goals"
        description="Set and track your gaming goals."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "rouge",
});
</script>

<style scoped>
.index-page {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  justify-content: center;
  height: 91.9vh;
}
/* single background image blurred behind content */
.index-page::before {
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

/* gradient overlay to preserve legibility */
.index-page::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7));
  z-index: 1;
  pointer-events: none;
}

/* ensure page content sits above the background layers */
.index-page > * {
  position: relative;
  z-index: 2;
}

.index-page h1 {
  font-size: 36px;
  margin-bottom: 10px;
}
.index-page h2 {
  font-size: 24px;
}

.button-main {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

#card-cath {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
}
</style>
