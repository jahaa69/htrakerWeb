<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Rediriger vers la page de login par défaut
router.push('/')
</script>

<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
