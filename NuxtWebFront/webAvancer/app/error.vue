<template>
  <div class="error-page">
    <h1>Error {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">Go back to Home</nuxt-link>
  </div>
</template>