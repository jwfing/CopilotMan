<template>
  <div id="app">
    <h1>Github Copilot 席位管理系统</h1>
    <RegistrationForm />
    <RemovalForm />
    <UserList />
  </div>
</template>

<script>
import RegistrationForm from './components/RegistrationForm.vue'
import RemovalForm from './components/RemovalForm.vue'
import UserList from './components/UserList.vue'

export default {
  name: 'App',
  components: {
    RegistrationForm,
    RemovalForm,
    UserList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>