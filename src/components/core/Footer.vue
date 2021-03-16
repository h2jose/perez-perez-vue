<template>
  <v-footer  padless color="secondary darken-2" dark>
    <v-col
      class="text-center"
      cols="12"
    >
       <strong>PEREZ&PEREZ</strong>. &copy;{{ anno }}.
    </v-col>
  </v-footer>
</template>
<script>
export default {
	name: 'Footer',
	computed: {
		anno() {
			return new Date().getFullYear();
		}
	}
}
	
</script>
