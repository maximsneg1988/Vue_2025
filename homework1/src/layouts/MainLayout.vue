<template>
  <div :class="['layout', themeClass]">
    <PageHeader :is-dark-theme="isDarkTheme" @toggle-theme="toggleTheme" />
    <main class="main-section">
      <PageAside :is-dark-theme="isDarkTheme" />
      <section class="content">
        <router-view />
      </section>
    </main>
    <PageFooter :is-dark-theme="isDarkTheme" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import PageAside from '@/components/PageAside.vue';
import PageFooter from '@/components/PageFooter.vue';
import { useTheme } from '@/composables/useTheme';

const { isDarkTheme, toggleTheme, themeClass } = useTheme();
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-section {
  display: flex;
  flex-grow: 1;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}
</style>
