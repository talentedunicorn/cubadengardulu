<template>
  <main id="top">
    <Icons />
    <div class="content">
      <Nuxt />
    </div>
    <ScrollToTop scroll-to-id="top" />
    <Footer class="footer" />
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-flow: column;
}

.content {
  flex: 1;
}

.footer {
  margin-top: auto;
}
</style>
