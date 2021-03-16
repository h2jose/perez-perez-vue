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
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  // },
	{
		path: '/instalacion',
		name: 'Instalacion',
		component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
	},
  {
    path: '/auto/nuevo',
    name: 'CarNew',
    component: () => import(/* webpackChunkName: "CarNew" */ '../views/car/New.vue')
  },
  {
    path: '/auto/listado',
    name: 'CarList',
    component: () => import(/* webpackChunkName: "CarList" */ '../views/car/List.vue')
  },
  {
    path: '/cliente/nuevo',
    name: 'CustomerNew',
    component: () => import(/* webpackChunkName: "CustomerNew" */ '../views/customer/New.vue')
  },
  {
    path: '/cliente/listado',
    name: 'CustomerList',
    component: () => import(/* webpackChunkName: "CustomerList" */ '../views/customer/List.vue')
  },
  {
    path: '/orden/nueva',
    name: 'OrderNew',
    component: () => import(/* webpackChunkName: "OrderNew" */ '../views/order/New.vue')
  },
  {
    path: '/orden/listado',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/order/List.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
