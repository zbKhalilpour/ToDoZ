<template>
  <div>
    Register
    <br>
  <input type="email" name="email" v-model='email' placeholder="email">
  <br>
  <input type="name" name="name" v-model='name' placeholder="name">
  <br>
  <input type="password" name="password" v-model='password' placeholder="password">
  <br>
  <button @click="register">Register</button>
</div>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: 'zb@gmail.com',
      name: 'zb',
      password: '123456'
    }
  },
  methods: {
    async register () {
      console.log('register button was clicked', this.email, this.password, this.name)
      const response = await AuthenticationService.register({email: this.email, password: this.password, name: this.name})
      console.log(response.data)
    }
  }
}
</script>

<style scoped>
</style>
