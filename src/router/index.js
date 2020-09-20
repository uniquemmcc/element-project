import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
  },
  {
    path: '/menuview',
    name: 'menuview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "List" */ '../views/Menuview.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test3.vue')
  },
  {
    path: '/test_relation',
    name: 'test_relation',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test_relation.vue')
  },
  {
    path: '/test_sort',
    name: 'test_sort',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test_sort.vue')
  },
  {
    path: '/test_menu',
    name: 'test_menu',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test_menu.vue')
  },
  {
    path: '/test_city',
    name: 'test_city',
    component: () => import(/* webpackChunkName: "List" */ '../views/Test_city.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
