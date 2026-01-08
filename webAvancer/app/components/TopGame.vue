<template>
  <div class="top-game-container">
    <div class="top-game-card">
      <img :src="imageGame" alt="Top Game" class="top-game-image" />
      <div class="top-game-info">
        <h3 class="top-game-title">{{ GameTitle }}</h3>
        <p class="top-game-hours">{{ hoursPlayed }} hrs played</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageGame: {
    type: String,
    required: true,
  },
  GameTitle: {
    type: String,
    required: true,
  },
  hoursPlayed: {
    type: [Number, String],
    required: true,
  },
});
</script>

<style>
.top-game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.top-game-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 300px;
  text-align: center;
}
.top-game-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>
