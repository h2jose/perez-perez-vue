<template>
  <v-container fluid>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
            src="@/assets/logo.png"
            contain
            height="200"
        />
        <h1>WEB-APP PEREZ & PEREZ</h1>
        <h2>INSTALACIÓN / REGISTRO DE USUARIO ADMIN</h2>
      </v-col>

      <v-col cols="6" >
        <v-form v-model="formValidity">
          <v-row justify="center" align="center" style="background: #FAFAFA">
            <v-col cols="12" sm="6">

              <v-text-field
                  label="Nombre"
                  prepend-icon="mdi-account-circle"
                  :rules="[rules.required]"
                  v-model="user.name"
                  required
                  color="primary"
              />

              <v-text-field
                  label="Correo electrónico"
                  prepend-icon="mdi-email"
                  :rules="[rules.required, rules.email]"
                  v-model="user.email"
                  required
                  color="primary"
              />

              <v-text-field
                  label="Password"
                  type="Password"
                  prepend-icon="mdi-lock"
                  :rules="[rules.required]"
                  v-model="user.password"
                  required
                  color="primary"
              />
            </v-col>
            <v-col cols="12" sm="12">
              <v-btn
                  :loading="loading"
                  x-large
                  color="primary"
                  class="white--text"
                  :disabled="!formValidity"
                  @click.stop="register()">
                REGISTRO
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-col>
    </v-row>

    <!-- <Notification /> -->
    <v-snackbar
        top
        right
        :timeout="alert.timeout"
        :color="alert.color"
        v-model="alert.show">
      {{ alert.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
const header = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*"
}
const configuration = {headers: header}
export default {
  name: 'RegisterView',
  created(){
  },
  data: () => ({
    alert: {
      timeout: 4000,
      color: 'red',
      show: ''
    },
    loading: false,
    formValidity: false,
    user: {
      name: '',
      email: '',
      password: '',
    },
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),
  methods: {
    register(){

      const me = this;
      me.loading = true

      axios.post('user/register',{
        name: me.user.name,
        email: me.user.email,
        password: me.user.password
      }, configuration)
        .then(function(response){
          me.$store.commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Registro creado satisfactoriamente',
            timeout: 4000
          }, {root: true})
          me.loadings = false
          me.$router.push({name: 'Home'});

        })
        .catch(function (e) {
          me.$store.commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'error',
            message: 'Sistema ya fue registrado',
            timeout: 4000
          }, {root: true})
          me.loading = false
          me.$router.push({name: 'Home'});
        })
    },
  },

}
</script>

<style scoped>

</style>