// stores/useThemeStore.ts
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // читаем из localStorage при инициализации
  const isDarkTheme = ref(localStorage.getItem('theme') === 'dark');

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
  };

  const themeClass = computed(() => (isDarkTheme.value ? 'dark-theme' : 'light-theme'));

  watch(
    isDarkTheme,
    (value) => {
      document.body.classList.toggle('dark-theme', value);
      localStorage.setItem('theme', value ? 'dark' : 'light'); // сохраняем в localStorage
    },
    { immediate: true },
  );

  return { isDarkTheme, toggleTheme, themeClass };
});
