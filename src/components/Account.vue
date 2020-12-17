<template>
    <div>
        <h1>My Account</h1>
        <hr/>
        <h3> {{firstName}}'s Orders </h3>

        <p v-if="accountError" class="form-text text-danger">Can not get your account information, please try again later</p>
        
        <table v-if="ordersByUser" class="table">
            <thead>
                <th>Product ID</th>
                <th>Payment</th>
                <th>Product Name</th>
            </thead>
            <tbody>
                <tr v-for="thisOrder in ordersByUser" :key="thisOrder.OrderPK">
                    <th><router-link :to="`/products/${thisOrder.ProductFK}`">{{thisOrder.ProductID}}</router-link></th>
                    <th>{{thisOrder.Payment}}</th>
                    <th>{{thisOrder.productName}}</th>
                </tr>
        </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data(){
        return{
            ordersByUser: null,
            accountError: false
        }
    },
    computed:{
    firstName(){
        console.log(this.$store.state)
        return this.$store.state.user.NameFirst}
    },
    created(){
        axios.get("/orders/me", {
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`
            }
        })
        .then((response)=>{
            console.log("here is the orders/me response:", response)
            this.ordersByUser = response.data})
        .catch(()=>{
            this.accountError = true
        })
    }
  }
</script>

<style scoped>

</style>