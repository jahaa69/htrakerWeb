<template>
  <div class="card">
    <div class="card-header">
      <img :src="logo" :alt="title" class="card-logo" />
      <h2 class="card-title">{{ title }}</h2>
    </div>
    <div class="card-divider"></div>
    <p class="card-description">{{ description }}</p>

    <NuxtLink :to="dest">
      <MainButton :title="cath" mainColor="transparent" secondaryColor="#8B5CF6" />
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  logo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cath: {
    type: String,
    required: true,
  },
  dest: {
    type: [String, Object],
    required: true,
  },
});
</script>

<style scoped>
.card {
  border-radius: 8px;
  padding: 20px;
  background-color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  height: 200px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.card-divider {
  height: 1px;
  background-color: #666;
  margin: 16px 0;
}

.card-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
