import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#D7251C',
				secondary: '#F8B868',
				accent: '#FFF089',
				info: '#8D6E63',
				error: '#b71c1c',
			},
		},
	},
});