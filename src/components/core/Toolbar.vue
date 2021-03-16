<template>
	<div>
		<v-navigation-drawer
      v-model="drawer"
      app
			:permanent = drawer
			clipped
    >

		<v-list two-line subheader>
      <v-list-item :to="{ name: 'Dashboard' }">
				<v-list-item-action>
					<v-icon>mdi-view-dashboard</v-icon>
				</v-list-item-action>
      	<v-list-item-content>
          <v-list-item-title >Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
				<!-- Clientes -->
		<v-list>
      <v-list-item>
				<v-list-item-action>
					<v-icon>mdi-account-group</v-icon>
				</v-list-item-action>
      	<v-list-item-content>
          <v-list-item-title >CLIENTES</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

			<v-list-item :to="{ name: 'CustomerNew' }">
				<v-list-item-content>
					<v-list-item-title>Nuevo Cliente</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item :to="{ name: 'CustomerList' }">
				<v-list-item-content>
					<v-list-item-title>Listado de Clientes</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
    </v-list>
      <v-divider></v-divider>
		<!-- Productos -->
		<v-list>
      <v-list-item>
				<v-list-item-action>
					<v-icon>mdi-card-text</v-icon>
				</v-list-item-action>
      	<v-list-item-content>
          <v-list-item-title >AUTOS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

			<v-list-item :to="{ name: 'CarNew' }">
				<v-list-item-content>
					<v-list-item-title>Nuevo Producto</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item :to="{ name: 'carList' }">
				<v-list-item-content>
					<v-list-item-title>Listado de Productos</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
    </v-list>

    <v-divider></v-divider>
		<!-- Colecciones -->
		<v-list>
      <v-list-item>
				<v-list-item-action>
					<v-icon>mdi-card-bulleted-settings</v-icon>
				</v-list-item-action>
      	<v-list-item-content>
          <v-list-item-title >REPARACIONES</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

			<v-list-item :to="{ name: 'RepairNew' }">
				<v-list-item-content>
					<v-list-item-title>Nueva Reparación</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item :to="{ name: 'RepairList' }">
				<v-list-item-content>
					<v-list-item-title>Listado de Reparaciones</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
    </v-list>

    <v-divider></v-divider>
		<template v-slot:append>

			<div class="pa-2">
				<v-btn block @click.stop="logout" color="red darken-4" class="white--text">
					<v-icon class="mr-3">mdi-exit-to-app</v-icon>Salir
				</v-btn>
			</div>
			<Footer />
		</template>




		</v-navigation-drawer>

			<v-app-bar
				dark 
				color="primary"
				app 
				flat
				clipped-left
			>
				<v-app-bar-nav-icon color="white"  @click.stop="drawer = !drawer" />
				<v-toolbar-title>PÉREZ & PÉREZ - Taller</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn text  class="mr-3"  :to="{ name: 'Dashboard' }">
					<v-icon class="mr-2">mdi-view-dashboard</v-icon>
				</v-btn>
				<v-btn text  class="mr-3"  @click.stop="logout">
        	<v-icon class="mr-2">mdi-exit-to-app </v-icon>
      	</v-btn>
			</v-app-bar>

	</div>
</template>

<script>
	export default {
		name: 'ToolbarAdmin',
		components: {
			Footer: () => import('@/components/core/Footer')
		},
		data: () => ({
			drawer:null,
			permanente: true,
			settings: [],
		}),
		methods: {
			logout(){
				this.$store.dispatch("userModule/loggedOut",{root: true});
			}
		},
		computed: {
		},
		
	}
</script>

<style lang="scss" scoped>

</style>