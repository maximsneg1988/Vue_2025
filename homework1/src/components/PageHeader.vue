<template>
  <header class="header">
    <h1>Моё приложение</h1>

    <nav class="nav">
      <router-link v-if="authStore.isAuthenticated" to="/composition" active-class="active"
        >Composition</router-link
      >
      <router-link v-if="authStore.isAuthenticated" to="/options" active-class="active"
        >Options</router-link
      >
      <router-link v-if="!authStore.isAuthenticated" to="/login" active-class="active"
        >Login</router-link
      >

      <button @click="toggleTheme" class="btn">
        {{ isDarkTheme ? '🌞 Светлая тема' : '🌙 Тёмная тема' }}
      </button>

      <button v-if="authStore.isAuthenticated" @click="handleLogout" class="btn logout">
        Выйти
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/useThemeStore';
import { useAuthStore } from '@/stores/useAuthStore';

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();

const isDarkTheme = computed(() => themeStore.isDarkTheme);
const toggleTheme = themeStore.toggleTheme;

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--header-bg);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  gap: 12px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

a.active {
  background-color: #1f64ff;
  color: white;
  box-shadow: 0 0 8px rgba(31, 100, 255, 0.7);
}

.btn {
  padding: 6px 12px;
  border: none;
  background-color: #ffffff20;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background-color: white;
  color: #333;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}

.logout {
  background-color: #ff4d4d;
}

.logout:hover {
  background-color: white;
  color: #ff4d4d;
  box-shadow: 0 0 6px rgba(255, 77, 77, 0.5);
}
</style>
