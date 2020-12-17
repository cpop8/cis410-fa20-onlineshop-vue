import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import routes from './routes.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token: null,
        user: null,
        products: []
    },
    mutations:{
        storeTokenInApp(state, myToken){
            state.token = myToken
        },
        storeUserInApp(state, myUser){
            state.user = myUser
        },
        storeProducts(state, myProducts){
            state.products = myProducts
        },
        clearAuthData(state){
            state.token = null;
            state.user = null;
        }
    },
    actions:{
        getProducts({commit}){
            axios.get('/products')
            .then((myResponse)=>{
                console.log("response from getProducts action", myResponse);
                commit('storeProducts', myResponse.data)
            })
            .catch(()=>{console.log("error in getProducts action")})
        },
        logout({commit, state}){
            axios.post('/contacts/logout', null,{
                headers:{
                    Authorization: `Bearer ${state.token}`
                }
            });

            commit('clearAuthData');

            routes.replace("/");
        }
    }
})