<template>
  <div id="default-layout">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#default-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
</style>
