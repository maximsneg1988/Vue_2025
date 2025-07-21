// stores/useThemeStore.ts
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkTheme = ref(false);

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
  };

  const themeClass = computed(() => (isDarkTheme.value ? 'dark-theme' : 'light-theme'));

  watch(
    isDarkTheme,
    (value) => {
      document.body.classList.toggle('dark-theme', value);
    },
    { immediate: true },
  );

  return { isDarkTheme, toggleTheme, themeClass };
});
