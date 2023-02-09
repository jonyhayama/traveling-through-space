<script setup>
useHead({
  title: 'Traveling Through Space'
})
</script>

<template>
  <div data-theme="dark">
    <TheHeader />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
:root {
  --header-height: 70px;
  --githubcorner-size: 70px;
}

html {
  min-width: 1024px;
  min-height: 400px;
}
</style>
