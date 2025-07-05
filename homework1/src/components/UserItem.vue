<template>
  <div class="user-item">
    <strong>{{ user.name }}</strong> - <span>{{ user.email }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ user: { id: number; name: string; email: string } }>();
</script>

<style scoped>
.user-item {
  padding: 12px;
  margin: 8px 0;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}
</style>
