<template>
  <div class="post-item">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ post: { id: number; title: string; body: string } }>();
</script>

<style scoped>
.post-item {
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: var(--content-bg);
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}
</style>
