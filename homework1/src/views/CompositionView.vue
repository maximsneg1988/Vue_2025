<template>
  <div class="content">
    <p>Composition API</p>
    <UserList />
    <hr />
    <PostList />
    <hr />
    <UserForm />
  </div>
</template>

<script setup lang="ts">
import UserList from '@/components/UserList.vue';
import PostList from '@/components/PostList.vue';
import UserForm from '@/components/UserForm.vue';
</script>

<style lang="scss">
.content {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}
</style>
