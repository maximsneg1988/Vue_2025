<template>
  <div class="login">
    <h1>Авторизация</h1>
    <form @submit.prevent="submit">
      <input type="text" v-model="username" placeholder="Логин" autocomplete="off" />
      <input type="password" v-model="password" placeholder="Пароль" autocomplete="new-password" />
      <button type="submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Загрузка...' : 'Войти' }}
      </button>
      <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');

// Очистка полей (по желанию)
const reset = () => {
  username.value = '';
  password.value = '';
  authStore.error = null;
};

const submit = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    authStore.error = 'Пожалуйста, введите логин и пароль';
    return;
  }

  // Вызываем login из стора
  await authStore.login(username.value, password.value);

  if (authStore.isAuthenticated) {
    reset();
    router.push('/composition');
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  background: #1f64ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 14px;
}
</style>
