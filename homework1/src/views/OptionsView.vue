<template>
  <div class="wrapper" :class="{ 'dark-theme': isDarkTheme }">
    <PageHeader :is-dark-theme="isDarkTheme" @toggle-theme="toggleTheme" />
    <section class="main-section">
      <PageAside :is-dark-theme="isDarkTheme" />
      <div class="content">
        <p>Тестовый параграф</p>
      </div>
    </section>
    <PageFooter :is-dark-theme="isDarkTheme" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import PageAside from '@/components/PageAside.vue';

export default defineComponent({
  components: {
    PageHeader,
    PageFooter,
    PageAside,
  },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --header-bg: #b15e31;
  --content-bg: #f5f5f5;
}

.dark-theme {
  --bg-color: #121212;
  --text-color: #ffffff;
  --header-bg: #b15e31;
  --content-bg: #1f1f1f;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 30px;
  transition: all 0.3s ease;
  margin: 0;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-section {
  display: flex;
  flex-grow: 1;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--content-bg);
  color: var(--text-color);
}
</style>
