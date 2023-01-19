import Vue from 'vue';
import VueRouter from 'vue-router';
import PageLayout from '../components/PageLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/conference',
    redirect: '/conference/video-call',
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  {
    path: '/conference',
    component: PageLayout,
    children: [{
      path: 'invite-to-call',
      name: 'Invitation',
      component: () => import(/* webpackChunkName: "invitation" */ '../components/Invitation.vue'),
    },
    {
      path: 'video-call',
      name: 'Video-Call',
      component: () => import(/* webpackChunkName: "video-calling" */ '../components/VideoCallPageLayout.vue'),
    },
    {
      path: 'add-users',
      name: 'Add-Users',
      component: () => import(/* webpackChunkName: "add-users" */ '../components/AddUsers.vue'),
    },
    {
      path: 'chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ '../components/ChatPageLayout.vue'),
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
