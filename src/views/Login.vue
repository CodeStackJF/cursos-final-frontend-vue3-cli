<template>
  <div class="card card-panel indigo darken-4">
    <form method="post" @submit.prevent="login">
      <div class="row">
        <div class="input-field col m4">
          <input type="text" class="white-text active" v-model="Usuario">
          <label class="white-text">Usuario</label>
          <ul class="collection" v-show="UsuarioValidation.length > 0">
            <li v-for="val in UsuarioValidation" class="collection-item" v-bind:key="val">{{val}}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m4">
          <input type="password" class="white-text active" v-model="Clave">
          <label class="white-text">Contraseña</label>
          <ul class="collection" v-show="ClaveValidation.length > 0">
            <li v-for="val in ClaveValidation" class="collection-item" v-bind:key="val">{{val}}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m4">
          <button :disabled="Autenticando" type="submit" class="btn white black-text">Iniciar Sesión</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'Login',
  data(){
    return {
      Usuario: '',
      UsuarioValidation: [],
      Clave: '',
      ClaveValidation: [],
      ErrorMessage: '',
      Autenticando: false
    }
  },
  mounted()
  {
    M.AutoInit();
  },
  methods:{
    login()
    {
        this.UsuarioValidation = [];
        this.ClaveValidation = [];
        this.ErrorMessage = '';
        var payload = {
          Usuario: this.Usuario,
          Clave: this.Clave
        };
        this.Autenticando = true;
        this.axios.post('Login', payload)
        .then(response => {
          localStorage.setItem('token', response.data);
          localStorage.setItem('autenticado', 'S');
          this.$router.push('/');
        })
        .catch(error => {
          if(error.response.status == 403)
          {
              M.toast({html: 'Usuario o contraseña no válida.'});
              return;
          }
          var data = error.response.data;

          if(data.type == "M")
          {
            if(data.modelErrors.find(x=>x.key == "Usuario") != undefined)
              this.UsuarioValidation = data.modelErrors.find(x=>x.key == "Usuario").messages;
            if(data.modelErrors.find(x=>x.key == "Clave") != undefined)
              this.ClaveValidation = data.modelErrors.find(x=>x.key == "Clave").messages;
          }

          if(data.type == "C")
          {
            this.ErrorMessage = data.message;
            M.toast({html: data.message});
          }

        })
        .then(() => {
          this.Autenticando = false;
        });
    }
  }
}
</script>