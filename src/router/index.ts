import { createRouter, createWebHistory } from 'vue-router';
import CompositionView from '@/views/CompositionView.vue';
import OptionsView from '@/views/OptionsView.vue';
import LoginView from '@/views/LoginView.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

import { useAuthStore } from '@/stores/useAuthStore';
import { createPinia, setActivePinia } from 'pinia';

// Активируем Pinia для использования в этом файле
const pinia = createPinia();
setActivePinia(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/composition',
    },
    {
      path: '/composition',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'composition',
          component: CompositionView,
        },
      ],
    },
    {
      path: '/options',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'options',
          component: OptionsView,
        },
      ],
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/composition',
    },
  ],
});

// Навигационный гард
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const protectedRoutes = ['composition']; // Названия защищённых маршрутов

  if (protectedRoutes.includes(to.name as string) && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
