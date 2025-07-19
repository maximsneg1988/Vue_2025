import { ref, watch, computed } from 'vue';

const isDarkTheme = ref(false);

watch(isDarkTheme, (value) => {
  document.body.classList.toggle('dark-theme', value);
});

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
}

const themeClass = computed(() => (isDarkTheme.value ? 'dark-theme' : 'light-theme'));

export function useTheme() {
  return { isDarkTheme, toggleTheme, themeClass };
}
