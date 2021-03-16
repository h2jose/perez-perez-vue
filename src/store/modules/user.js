import decode from 'jwt-decode';
import router from '../../router';

export const namespaced = true;

export const state = () => ({
	token: null,
	user: null,
})

export const mutations = {
	SET_TOKEN(state, token){
		state.token = token
	},
	SET_USER(state, user) {
		state.user = user
	}
}

export const actions = {
	saveToken({commit}, token){
    commit("SET_TOKEN", token)
    commit("SET_USER", decode(token))
    localStorage.setItem("token", token)
  },
	autoLogin({commit}){
		let token = localStorage.getItem("token");
		if(token) {
			commit("SET_TOKEN", token);
			commit("SET_USER", decode(token));
		}
	},
	loggedOut({commit}){
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
		localStorage.removeItem("token");
		router.push({name: 'Login'});
	}
}

export const getters = {
	getterValue: state => {
		return state.value
	}
}
