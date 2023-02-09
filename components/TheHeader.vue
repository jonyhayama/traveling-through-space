<template>
  <nav class="container-fluid">
    <ul>
      <li><NuxtLink to="/"><strong>Traveling Through Space</strong></NuxtLink></li>
    </ul>
    <ul>
      <li><NuxtLink to="/about">About</NuxtLink></li>
    </ul>
  </nav>
  <TheGithubCorner />
</template>

<style lang="scss" scoped>
nav {
  height: var(--header-height);
  padding-right: calc(var(--githubcorner-size) + var(--spacing));
}
</style>