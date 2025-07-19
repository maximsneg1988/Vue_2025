<template>
  <div class="login">
    <h1>Авторизация</h1>
    <form @submit.prevent="submit">
      <input type="text" v-model="username" placeholder="Логин" autocomplete="off" />
      <input type="password" v-model="password" placeholder="Пароль" autocomplete="new-password" />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Загрузка...' : 'Войти' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const reset = () => {
  username.value = '';
  password.value = '';
  error.value = '';
};

onMounted(() => {
  reset();
});

watch(
  () => route.fullPath,
  () => {
    reset();
  },
);

const submit = async () => {
  error.value = '';

  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Пожалуйста, введите логин и пароль';
    return;
  }

  loading.value = true;

  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      username: username.value,
      password: password.value,
    });

    if (res.status !== 201) throw new Error('Ошибка');

    await router.push('/composition');
  } catch (e) {
    error.value = 'Неверные данные или ошибка сети';
  } finally {
    loading.value = false;
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
