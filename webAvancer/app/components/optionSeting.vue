<template>
  <div class="optionSetting">
    <div id="titreDescription">
      <h2>Option Settings</h2>
      <p>Here you can configure your application settings.</p>
    </div>
    <div id="connexionDiv">
      <button id="connexionButton">
        <NuxtLink to="/loginPage" style="color: white; text-decoration: none">
          Se connecter
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.optionSetting {
  padding: 20px;
  border-radius: 8px;
}
#titreDescription {
  margin-bottom: 20px;
}
#connexionDiv {
  text-align: center;
}
#connexionButton {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#connexionButton:hover {
  background-color: #2563eb;
}
</style>
