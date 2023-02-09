<template>
  <div class="wrapper">
    <div>
      <h1>About</h1>
      <p>👋 Hey there, I'm <NuxtLink to="https://jony.dev" target="_blank">Jony Hayama</NuxtLink>.</p>
      <p>The amazing "traveling through space" animation was created by <NuxtLink to="https://dev.to/eyudinkov" target="_blank">Eduard ludinkov</NuxtLink> on <NuxtLink to="https://dev.to/eyudinkov/creating-the-effect-of-traveling-through-space-mfg" target="blank">this article</NuxtLink>.</p>
      <p>I've added a couple of controls around it so it's a bit easier to play around with the variables and check out different effects.</p>
      <p>You may also notice that I've tweaked a couple of things here and there, hope you enjoy it.</p>
      <hr />
      <p>Things I've used in this project:</p>
      <ul style="width: auto;">
        <li><NuxtLink to="https://nuxt.com/" target="_blank">Nuxt</NuxtLink></li>
        <li><NuxtLink to="https://vueuse.org/" target="_blank">VueUse</NuxtLink></li>
        <li><NuxtLink to="https://picocss.com/" target="_blank">PicoCSS</NuxtLink></li>
        <li><NuxtLink to="https://github.com/tholman/github-corners" target="_blank">Github Corner</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 8px;
  text-align: center;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}

ul li {
  list-style: none;

  &:before {
    content: '• '
  }
}
</style>