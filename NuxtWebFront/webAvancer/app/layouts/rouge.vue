<template>
  <div id="default-layout">
    <HeaderApp />
    <main id="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#default-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
