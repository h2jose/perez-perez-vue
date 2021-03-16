import Vue from 'vue'
import Vuex from 'vuex'
import * as userModule from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		alert: {
			type: "success",
			show: false,
			message: "",
			color: "primary",
		},
  },
  mutations: {
		SET_ALERT_MESSAGE: (state, data) => {
			state.alert.type = data.type;
			state.alert.show = data.show;
			state.alert.message = data.message;
			state.alert.color = data.color;
			setTimeout(() => {
				state.alert.type = "success";
				state.alert.show = false;
				state.alert.message = "";
				state.alert.color = "primary";
			}, data.timeout);
		},
  },
  actions: {
  },
  modules: {
		userModule
  }
})