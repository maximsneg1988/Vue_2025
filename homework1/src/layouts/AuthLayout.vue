<template>
  <div class="auth-layout">
    <main>
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--bg-color);
}
</style>
