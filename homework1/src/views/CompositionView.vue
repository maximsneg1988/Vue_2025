<template>
  <div class="wrapper" :class="{ 'dark-theme': isDarkTheme }">
    <PageHeader :is-dark-theme="isDarkTheme" @toggle-theme="toggleTheme" />
    <section class="main-section">
      <PageAside :is-dark-theme="isDarkTheme" />
      <div class="content">
        <p>Composition API</p>
        <UserList />
        <hr />
        <PostList />
        <hr />
        <UserForm />
      </div>
    </section>
    <PageFooter :is-dark-theme="isDarkTheme" />
  </div>
</template>

<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageAside from '@/components/PageAside.vue';
import { ref } from 'vue';
import UserList from '@/components/UserList.vue';
import PostList from '@/components/PostList.vue';
import UserForm from '@/components/UserForm.vue';

// реактивная переменная темы
const isDarkTheme = ref(false);

// метод переключения темы
function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}
</script>

<style lang="scss" scoped>
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
