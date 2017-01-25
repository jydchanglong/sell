import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/scss/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [
	{path: '/goods', component: goods},
	{path: '/ratings', component: ratings},
	{path: '/seller', component: seller}
];

let router = new VueRouter({
	routes,
	linkActiveClass: 'active'
});

new Vue({
	el: '#app',
	router,
	render: h => h(App),
	data: {
		eventHub: new Vue()
	}
}).$mount('#app');

router.push({
	path: '/goods'
});

