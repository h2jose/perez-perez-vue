
<template>
  <v-container fluid>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
          src="@/assets/logo.png"
          contain
          height="200"
      />
      </v-col>
	  
			<v-col cols="6" >
				<v-form v-model="formValidity">
				<v-row justify="center" align="center" style="background: #FAFAFA">
					<v-col cols="12" sm="6">
						<v-text-field 
							label="User"
							prepend-icon="mdi-account-circle"
              :rules="[rules.required, rules.email]"
							v-model="email"
							required
							color="primary"
						/>
					
							<v-text-field 
								label="Password"
								type="Password"
								prepend-icon="mdi-lock"
                :rules="[rules.required]"
								v-model="password"
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
							@click.stop="login()">
								LOGIN
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
	import { mapState } from 'vuex';
  export default {
		name: 'Login',
		created(){
		},
    data: () => ({
			loading: false,
			formValidity: false,
			email: '',
			password: '',
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
			login(){
				const me = this;
				me.loading = true
				me.email = me.email.trim().toLowerCase()
				me.password = me.password.trim()
				axios.post('user/login',{
				  email: me.email, password: me.password
				})
					.then( response => { return response.data })
					.then(data =>{
						this.$store.dispatch("userModule/saveToken",data.tokenReturn);
						me.loaging = false
						me.$router.push({name: 'Dashboard'});
          })
					.catch( function(e){
						let errorM = null
						if (e.response.status==404){
								errorM='No existe el usuario o las credenciales son incorrectas.';
						} else{
								errorM='Ocurrió un error con el servidor.';
						}
						me.loading = false
						me.$store.commit('SET_ALERT_MESSAGE', {
							show: true,
							color: 'error',
							message: errorM,
							timeout: 4000
						}, {root: true})

					});
			}

		},
		computed:{
			...mapState(['alert']),
		}
  }
</script>
