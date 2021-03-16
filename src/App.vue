<template>
  <v-app>
		<v-main fluid fill-height>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
	},
	created(){
	},
  data: () => ({
    //
  }),
};
</script>