<template>
  <v-app>

		<toolbar />

    <slot />

		<v-snackbar
			shaped
			top
			centered
			:timeout="alert.timeout"
			:color="alert.color"
			v-model="alert.show">
				{{ alert.message }}
		</v-snackbar>
  </v-app>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		 components: {
			 Toolbar: () => import('@/components/core/Toolbar')
		 },
		 computed: {
			...mapState(['alert']),
		 }
		
	}
</script>

<style lang="scss" scoped>

</style>