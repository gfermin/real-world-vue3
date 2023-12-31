import AboutView from '@/views/AboutView.vue'
import EventListView  from '@/views/EventListView.vue'
import EventDetailsView from '@/views/EventDetailsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      //Parse and set the current page from the router using Function mode
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/event-details/:id',
      name: 'event-details',
      props: true,
      component: EventDetailsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
