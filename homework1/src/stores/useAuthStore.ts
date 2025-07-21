import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        email,
        password,
      });

      if (response.status === 201) {
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', 'true'); // сохраняем статус
      } else {
        throw new Error('Неверный ответ от сервера');
      }
    } catch (err: any) {
      error.value = 'Ошибка авторизации';
      isAuthenticated.value = false;
      localStorage.removeItem('isAuthenticated');
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem('isAuthenticated');
  };

  return { isAuthenticated, isLoading, error, login, logout };
});
