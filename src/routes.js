import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Account from './components/Account.vue';
import Login from './components/Login.vue';
import Products from './components/Products.vue';
import ProductDetails from './components/productDetails.vue'
import ReviewCreate from './components/ReviewCreate.vue';
import NotFound from './components/NotFound.vue';
import SignUp from './components/SignUp.vue';
import store from './store.js';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/account', component: Account, beforeEnter(to, from, next){
        if(store.state.token)
            {next()}
            else{next('/signin')}
    }},
    {path: '/signin', component: Login},
    {path: '/products', component: Products},
    {path: '/products/:pk', component: ProductDetails,
        children: [
        {path: 'review', component: ReviewCreate}
        ]},
    {path: '/signup', component: SignUp},
    {path: '/:invalidroute(.*)', component: NotFound}
]

export default new VueRouter({mode: 'history', routes:routes})