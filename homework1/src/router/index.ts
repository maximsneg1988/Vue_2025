import { createRouter, createWebHistory } from 'vue-router';
import CompositionView from '@/views/CompositionView.vue';
import OptionsView from '@/views/OptionsView.vue';
import LoginView from '@/views/LoginView.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Редирект с корня на Composition API страницу
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
    // Обработка несуществующих путей
    {
      path: '/:pathMatch(.*)*',
      redirect: '/composition',
    },
    // {
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (About.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
