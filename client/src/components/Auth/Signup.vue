<template>
<v-container text-xs-center mt-5 pt-5>
   <v-layout row wrap>
     <v-flex xs12 sm6 offset-sm3>
       <h1>Get Started Here</h1>
     </v-flex>
   </v-layout>

   <!-- Error Alert -->
   <v-layout v-if="error" row wrap>
     <v-flex xs12 sm6 offset-sm3>
       <form-alert :message= 'error.message'></form-alert>
     </v-flex>
   </v-layout>

  <!-- Signup Form -->
   <v-layout row wrap>
     <v-flex xs12 sm6 offset-sm3>
       <v-card color="accent" dark>
         <v-container>
           <v-form v-model="isFormValid" lazy-validation ref="form" 
           @submit.prevent="handleSignupUser">

             <v-layout row>
               <v-flex xs12>
                 <v-text-field :rules="usernameRules" v-model="username" 
                 prepend-icon="face" label="Username" type="text" required>
                 </v-text-field>
               </v-flex>
             </v-layout>

            <v-layout row>
               <v-flex xs12>
                 <v-text-field :rules="emailRules" v-model="email" 
                 prepend-icon="email" label="Email" type="email" required>
                 </v-text-field>
               </v-flex>
             </v-layout>

            <v-layout row>
               <v-flex xs12>
                 <v-text-field :rules="passwordRules" v-model="password" 
                 prepend-icon="extension" label="Password" type="password" required>
                 </v-text-field>
               </v-flex>
             </v-layout>

              <v-layout row>
               <v-flex xs12>
                 <v-text-field :rules="passwordRules" v-model="passwordConfirmation" 
                 prepend-icon="gavel" label="Confirm Password" type="password" required>
                 </v-text-field>
               </v-flex>
             </v-layout>

              <v-layout row>
               <v-flex xs12>
                 <v-btn :disabled="!isFormValid || loading" color="info" type="submit">Signin</v-btn>
                 <h3>Already have an account ? 
                 <router-link to="/signin">Signin</router-link>
                 </h3>
               </v-flex>
             </v-layout>

           </v-form>
         </v-container>
       </v-card>
     </v-flex>
   </v-layout>
</v-container>  
</template>

<script>
import { mapGetters } from 'vuex' 

export default {
  name: 'Signup',
  data() {
    return {
      isFormValid : true,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameRules: [
        // Check if username in input
        username => !!username || 'Username is required',
        // Make sure username is less tha 10 characters
        username => username.length < 10 || 'Username must be less than 10 characters'
      ],
      emailRules: [
        // Check if username in input
        email => !!email || 'Email is required',
        email => /.@+./.test(email) || 'Email must be valid'
      ],
      passwordRules: [
        // Check if username in input
        password => !!password || 'Password is required',
        password => password.length >= 4 || 'Password must be at least 4 characters',
        confirmation => confirmation === this.password || 'Passwords must match'
      ],
    }
  },
  computed: {
    ...mapGetters(['loading','error', 'user'])
  },
  watch: {
    user(value) {
      // if user value changes from null to object, redirect to home page
      if(value) {
        this.$router.push("/")
      }
    }
  },
  methods: {
    handleSignupUser () {
       if(this.$refs.form.validate()) {
      this.$store.dispatch("signupUser", {
        username: this.username,
        email: this.email,
        password: this.password
       })          
      }
    }
  }
}

</script>