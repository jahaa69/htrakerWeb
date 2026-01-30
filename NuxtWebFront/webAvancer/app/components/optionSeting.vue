<template>
  <div class="optionSetting">
    <div id="connexionDiv">
      <NuxtLink to="/loginPage">
        <MainButton
          :title="$t('buttons.login')"
          mainColor="#3b82f6"
          secondaryColor="#2563eb"
        />
      </NuxtLink>
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
