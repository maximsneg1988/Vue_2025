<template>
  <div>
    <h2>Пользователи</h2>
    <UserItem v-for="user in displayedUsers" :key="user.id" :user="user" />
    <button class="toggle-btn" @click="toggleShowAll">
      {{ showAll ? 'Показать первые 10' : 'Показать всех' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import UserItem from './UserItem.vue';
import { mockUsers } from '@/mock/mock-users';

const showAll = ref(false);
const displayedUsers = computed(() => (showAll.value ? mockUsers : mockUsers.slice(0, 10)));
function toggleShowAll() {
  showAll.value = !showAll.value;
}
</script>

<style scoped>
.toggle-btn {
  margin-top: 10px;
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
