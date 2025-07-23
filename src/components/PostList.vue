<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else>
    <h2>Посты</h2>
    <PostItem v-for="post in displayedPosts" :key="post.id" :post="post" />
    <div v-if="error">{{ error }}</div>
    <button @click="toggleShowAll" class="toggle-btn">
      {{ showAll ? 'Показать первые 10' : 'Показать все' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PostItem from './PostItem.vue';
import type { Post } from '@/types/Post';

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref('');
const showAll = ref(false);

const displayedPosts = computed(() => (showAll.value ? posts.value : posts.value.slice(0, 10)));

function toggleShowAll() {
  showAll.value = !showAll.value;
}

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
    posts.value = await res.json();
  } catch (err) {
    error.value = 'Не удалось загрузить посты';
    console.error('Ошибка при загрузке постов:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.toggle-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #b15e31;
  color: white;
  transition: background-color 0.3s;
}
.toggle-btn:hover {
  background-color: #944a27;
}
</style>
