<template>
	<Layout>
		<v-container>
			<v-row>
				<v-col>
					<v-data-table
						:loading="loading"
						:headers="headers"
						:items="customers"
						:search="search"
					>

						<!-- slot Top table -->
						<template v-slot:top>
							<v-toolbar flat color="white">
								<v-toolbar-title><h2><v-icon large class="mr-2">mdi-account-group</v-icon>GESTIÓN DE CLIENTES</h2></v-toolbar-title>
								<v-divider class="mx-4" inset vertical></v-divider>
        				<v-spacer></v-spacer>
								<v-btn class="mt-2" fab dark color="primary" @click.stop="newCar">
									<v-icon dark>mdi-plus</v-icon>
								</v-btn>
							</v-toolbar>
						</template>

						<!-- columna accion -->
						<template v-slot:item.action="{ item }">
							<v-icon
								class="action_button"
								@click.stop="editCustomer(item)"
							>
								mdi-file-edit
							</v-icon>
							<v-icon
								class="action_button"
								@click="removeCustomer(item)"
								color="red"
							>
								mdi-delete
							</v-icon>
						</template>

						<!-- template Active -->
							<template v-slot:item.active="{ item }">
								<v-layout justify-center>
									<v-switch
										color="success"
										v-model="item.active"
										@change="toogleActive(item)"
									/>
								</v-layout>
							</template>



					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
		
		<customer-dialog />

	</Layout>
</template>

<script>
	import axios from 'axios';
	import { mapState, mapActions } from "vuex";
	import store from '@/store'
	import CustomerDialog from '@/components/Dialog/CustomerDialog.vue'
	const header = {"Token": store.state.userModule.token}
	const configuration = {headers: header}

	export default {
		name: 'CustomerView',
		components: { CustomerDialog },
		data: ()=>({
			search: '',
			headers: [
				{ text: 'DNI', align: 'start', value: 'dni', width: '10%'},
				{ text: 'NOMBRE', value: 'name', width: '25%' },
				{ text: 'EMAIL', value: 'email' },
				{ text: 'TELEFONO', value: 'phone', },
				{ text: 'ESTADO', value: 'active'},
				{text: '', value: 'action', sortable: false,align: 'end', },
			],
			items: [],
			editedIndex: -1,
			editedItem: [{
				_id: '',
				dni: '',
				name: '',
				email: '',
				address: '',
				phone: '',
				notes: '',
			}],

		}),
		mounted(){
			this.getCustomers()
		},
		methods: {

			...mapActions('customerModule',['getCustomers','deleteCustomer']),

			async getData2(){
				let me = this;
				await axios.get('customer/list', configuration)
					.then(
						function (response) {
							me.customers = response.data;
						})
					.catch(function (e) {
						console.log(e.message)
					})
			},
			newCar(){
				this.$store.commit('customerModule/setCustomer', [], { root: true } )
				this.$store.commit('setDialog', true, { root: true })
			},
			editCustomer(item){
				this.editedItem = Object.assign({}, item)
				this.$store.commit('customerModule/setCustomer', this.editedItem, { root: true } )
				this.$store.commit('setDialog', true, { root: true })
			},
			async toogleActive(item){
				let me = this;
				await axios.put('customer/toggle', {'_id': item._id, 'active': item.active},configuration)
					.then(
						function (response) {
							me.$store.commit('SET_ALERT_MESSAGE', {
								show: true,
								color: 'success',
								message: 'Actualizado Estado',
								timeout: 4000
							}, {root: true})
						})
					.catch(function (e) {
						console.log(e.message)
					})
			},
			async removeCustomer(item){
				await this.$confirm('Realmente quiere eliminar definitivamente este cliente?', { 
					title: 'Warning', 
					color: 'error', 
					icon: 'mdi-hand', 
					buttonTrueColor: 'primary',
					})
						.then(res => {
							if (res){
								const id = item._id
								this.deleteCustomer(id)
								const index = this.customers.findIndex(item => item._id === id);
								this.customers.splice(index, 1);						
							}
				})
			}


		},
		computed: {
			...mapState(['loading']),
			...mapState('customerModule',['customers','customer']),
		}
		
	}
</script>

<style lang="scss" scoped>
	.action_button {
	margin: 0px 10px 10px 0px;
    font-size: xx-large;
}

</style>