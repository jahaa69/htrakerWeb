<template>
  <header class="header">
    <img src="/logoHtracker.png" alt="Mon logo" class="logo" />
    <h1>Htracker</h1>
    <div id="spaceBettwen"></div>
    <div id="optionButton" @click="toggle">
      <img id="logoParametre" src="/paramettre.png" alt="" />
    </div>
    <OptionSetting v-if="isVisible" />
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import OptionSetting from "./optionSeting.vue";

const isVisible = ref(false);
const toggle = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.logo {
  width: 50px;
  border-radius: 50%;
  height: auto;
  background-color: #ffffff;
}
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #0f172a;
  border-bottom: 2px solid #334155;
}
.header h1 {
  margin-left: 10px;
  font-size: 24px;
  color: #e5e7eb;
}
#spaceBettwen {
  flex-grow: 1;
}
#optionButton {
  cursor: pointer;
}
#logoParametre {
  width: 40px;
  height: auto;
}
</style>
