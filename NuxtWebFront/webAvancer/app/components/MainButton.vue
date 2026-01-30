<template>
  <button
    id="main-button"
    class="main-button"
    :style="{ '--main-color': mainColor, '--hover-color': secondaryColor }"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true, default: 'test' },
  mainColor: { type: String, required: true, default: '#3b82f6' },
  secondaryColor: { type: String, required: true, default: '#2563eb' }
})

</script>

<style scoped>
.main-button {
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: var(--main-color);
}

.main-button:hover {
  background-color: var(--hover-color);
}
</style>
