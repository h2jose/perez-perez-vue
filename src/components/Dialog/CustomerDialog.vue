<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition" >
				<v-card>
					<v-toolbar dark color="primary">
						<v-btn icon dark @click="closeDialog">
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-toolbar-title>{{ formTitle }} </v-toolbar-title>
						<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn :loading="saving" dark text @click.stop="saveCustomer()" > <v-icon color="white">mdi-check-circle</v-icon> Guardar</v-btn>
							<v-btn dark text @click="closeDialog"> <v-icon color="white">mdi-close</v-icon> Cancelar</v-btn>
						</v-toolbar-items>
					</v-toolbar>
					<v-card-text>
							<v-container class="pt-5">
								<v-form ref="form" v-model="valid">	
									<v-row justify="center">   
										<v-col cols="12" md="4">
											<v-text-field
												color="primary"
												v-model="editedItem.dni"
												label="DNI"
												:rules="[rules.required]"
												dense
												outlined
											/>
											<v-text-field
												color="primary"
												v-model="editedItem.name"
												label="Nombre completo"
												:rules="[rules.required]"
												dense
												outlined
											/>
										</v-col>
										<v-col cols="12" md="4">
											<v-text-field
												color="primary"
												v-model="editedItem.email"
												label="Correo electrónico"
												:rules="[rules.required, rules.email]"
												dense
												outlined 
											/>
											<v-text-field
												color="primary"
												v-model="editedItem.phone"
												label="Teléfono"
												dense
												outlined
											/>
			
										</v-col>
										<v-col cols="12" md="8">
											<v-textarea
												color="primary"
												filled
												outlined
												v-model="editedItem.address"
												label="Dirección"
												:value="editedItem.address" 
											/>
											<v-textarea
												color="primary"
												filled
												outlined
												v-model="editedItem.notes"
												label="Observaciones"
												:value="editedItem.notes" 
											/>
										</v-col>
									</v-row>
								</v-form>
							</v-container>
					</v-card-text>
				</v-card>
		</v-dialog>
		
		<v-snackbar
			v-model="snackbar"
			color='success'
		>
			Registro procesado satisfactoriamente
		</v-snackbar>
	</v-row>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'CustomerDialog',
		data () {
      return {
				snackbar: false,
				saving: false,
				editedIndex: -1,
				valid: true,
				editedItem: {
					_id: '',
					dni: '',
					name: '',
					email: '',
					address: '',
					phone: '',
					notes: '',
				},
				rules: {
					required: value => !!value || 'Campo obligatorio.',
					email: value => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Invalid Correo electrónico'
					},
				},
				
      }
		},
		methods: {
			...mapActions('customerModule',['getCustomers','addCustomer','updateCustomer']),
			closeDialog() {
				this.$store.commit('setDialog', false, { root: true })
			},
			validate () {
				if (this.$refs.form.validate()) {
					this.saveCustomer()
				} 
			},
			saveCustomer(){
				this.saving = true;
				if (this.customer._id != null) {
					this.updateCustomer(this.editedItem)
					} else {
					this.addCustomer(this.editedItem)
				}
				this.getCustomers()
				//this.snackbar = true
				this.editedItem = {
					_id: '',
					dni: '',
					name: '',
					email: '',
					address: '',
					phone: '',
					notes: '',
				}
				this.$refs.form.resetValidation()
				setTimeout(() => { this.closeDialog() }, 2500);
				this.saving = false;
			},


		},
		computed: {
			...mapState(['loading', 'dialog']),
			...mapState('customerModule',['customers','customer']),
			formTitle () {
        return this.customer._id != null ? 'Editar Cliente' : 'Nuevo Cliente'
			},
		},
		watch: {
		'customer': function() {
			if (this.customer != null){
				this.editedItem = this.customer;
			} 
		}
}

	}
</script>

<style lang="scss" scoped>
</style>