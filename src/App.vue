<script setup lang="ts">
console.log('App.vue')
</script>

<template>
  <UApp>

    <header>
      <h1>My App Header</h1>
      <ULink to="/app">Go to App</ULink>
      <ULink to="/home">Go to Home</ULink>
      <ULink to="/creation">Go to Creation</ULink>
    </header>

    <RouterView />
  </UApp>
</template>

<style scoped></style>
