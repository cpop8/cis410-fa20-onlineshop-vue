<template>
    <div>
        <h1>Login</h1>
        <div v-if="this.$route.query.signupsuccess" 
        class="alert alert-success">Thanks for signing up, please log in now.</div>
    
    <form @submit.prevent="onSubmit">
    <div class="form-group"><label for="exampleInputEmail">Email Address</label>
    
    <input type="email" id="exampleInputEmail" required="required" placeholder="Enter Email" 
    class="form-control" v-model="email">
    </div>

    <div class="form-group"><label for="exampleInputPassword1">Password</label>

    <input type="password" id="exampleInputPassword1" placeholder="Password" required="required" value="asdfasdf"
    class="form-control" v-model="password">
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
    
    <p v-if="credentialsError" class="form-text text-danger">Invalid credentials.</p>

    <p v-if="loginError" class="form-text text-danger">Could not log you in, please try again later.</p>
    </form>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data(){
        return {
            email: '',
            password: '',
            loginError: false,
            credentialsError: false
        }
    },
    methods:{
        onSubmit(){
            const myFormData={
                email: this.email,
                password: this.password
            };

            //console.log("form data:", myFormData)

             axios.post("/contacts/login", myFormData)
                 .then(myResponse=>{
                     console.log("here is my response", myResponse);

                     this.$store.commit("storeTokenInApp", myResponse.data.token)

                     this.$store.commit("storeUserInApp", myResponse.data.user);

                     localStorage.setItem("token", myResponse.data.token);
                     const now = new Date();
                     const expirationDate = new Date(now.getTime() + 60*60*1000);
                     //const expirationDate = new Date(now.getTime() + 6*1000);
                     localStorage.setItem("expiration", expirationDate);

                     this.$store.dispatch("setLogoutTimer");

                     this.$router.replace("/account")
                 })
                 .catch((myError)=>{
                     console.log("my error", myError.response.data)

                if(myError.response.data == 'Invalid user credentials'){
                    this.credentialsError = true
                }else{this.loginError = true}
                 })
         }
     }
}
</script>

<style scoped>

</style>