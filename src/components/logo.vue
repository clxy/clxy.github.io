<script setup lang="ts">
import LogoImage from './logo-image.vue'

defineProps({
  // 控制是否禁用链接
  noLink: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <ULink to="/home" v-if="!noLink">
    <LogoImage />
  </ULink>
  <LogoImage v-else />
</template>

<style scoped></style>
