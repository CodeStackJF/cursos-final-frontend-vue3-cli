<template>
  <nav class="indigo darken-4">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">{{msg}}</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!autenticado"><router-link to="/Login">Login</router-link></li>
        <li v-if="autenticado"><router-link to="/">Cursos</router-link></li>   
        <li v-if="autenticado"><router-link to="/Logout">Logout</router-link></li> 
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  },
  data(){
    return {
      autenticado: false
    }
  },
  mounted(){
    this.autenticado = localStorage.getItem('autenticado') == "S";
  }
}
</script>