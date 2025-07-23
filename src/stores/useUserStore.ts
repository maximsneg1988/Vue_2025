import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mockUsers } from '@/mock/mock-users'; // импортируем мок

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // имитируем задержку для загрузки, чтобы не сломать UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      users.value = mockUsers;
    } catch (err) {
      error.value = 'Не удалось загрузить пользователей';
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, error, fetchUsers };
});
