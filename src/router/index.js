import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
		meta: { public: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		meta: { admin: true },
  },
	{
		path: '/instalacion',
		name: 'Instalacion',
		component: () => import(/* webpackChunkName: "instalation" */ '../views/Instalation.vue'),
		meta: { admin: true },
	},
	{
		path: '/cliente/listado',
		name: 'CustomerView',
		component: () => import(/* webpackChunkName: "CustomerView" */ '../views/customer/Index.vue'),
		meta: { admin: true },
	},
  {
    path: '/auto/listado',
    name: 'CarList',
    component: () => import(/* webpackChunkName: "CarList" */ '../views/car/List.vue'),
		meta: { admin: true },
  },
  {
    path: '/orden/listado',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/order/List.vue'),
		meta: { admin: true },
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	store.dispatch("userModule/autoLogin");
	if (to.matched.some(record => record.meta.public)) {

		if (store.state.userModule.user && store.state.userModule.user.role === 'ADMIN') {
			next({ name: "Dashboard" });
		} else {
			next();
		}

	} else if (store.state.userModule.user && store.state.userModule.user.role === 'ADMIN') {
		if (to.matched.some((record) => record.meta.admin)) {
			next();
		}
	} else {
		next({ name: 'Home' });
	}
});

export default router
