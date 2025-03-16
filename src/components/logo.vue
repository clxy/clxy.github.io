<template>
  <ULink to="/home" v-if="!noLink">
    <LogoImage />
  </ULink>
  <LogoImage v-else />
</template>

<script setup lang="ts">

const LogoImage = {
  template: `<img src="/assets/logo.png" alt="Clxy Studio" class="h-6 w-auto" />`
}

defineProps({
  // 控制是否禁用链接
  noLink: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped></style>
