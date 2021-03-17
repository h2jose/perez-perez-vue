import axios from 'axios';
const header = {"Token": localStorage.getItem("token") }
const configuration = {headers: header}

export default {
  namespaced: true,
  state: {
    customers: [],
    customer: {}
  },
  mutations: {
    SET_CUSTOMERS(state, payload) {
      state.customers = payload;
    },
    setCustomer(state, payload) {
      state.customer = payload;
    }
  },
  actions: {

    async getCustomers({ commit }) {
    
			let arrayCustomers = [];
      commit("setLoader", true, { root: true });
    
			try {
				await axios.get('customer/list', configuration)
					.then(
						function (response) {
							arrayCustomers = response.data;
						})
					.catch(function (e) {
						console.log(e.message)
					})
        commit("SET_CUSTOMERS", arrayCustomers);
      } catch (error) {
        console.log(error);
      } finally {
          commit("setLoader", false, { root: true });
      }
    },

    async addCustomer({ commit, dispatch }, data) {
			let me = this
			await axios.post('customer/add', {
					dni: data.dni,
					name: data.name,
					email: data.email,
					address: data.password,
					phone: data.phone,
					address: data.address,
					notes: data.notes,
				}, configuration)
					.then(function(response){
						commit('SET_ALERT_MESSAGE', {
							show: true,
							color: 'success',
							message: 'Cliente creado satisfactoriamente',
							timeout: 4000
						}, {root: true})
						dispatch('getCustomers')
					})
					.catch(function (e) {
						console.log(e.message)
					})



    },
    async updateCustomer({ commit, dispatch }, data) {
			let me = this;
				await axios.put('customer/update', {
					_id: data._id,
					dni: data.dni,
					name: data.name,
					email: data.email,
					address: data.address,
					phone: data.phone,
					notes: data.notes,

				}, configuration)
					.then(function(response){
						commit('SET_ALERT_MESSAGE', {
							show: true,
							color: 'success',
							message: 'Cliente actualizado satisfactoriamente',
							timeout: 4000
						}, {root: true})
						dispatch('getCustomers')
					})
					.catch(function (e) {
						console.log(e.message)
					})

    },
    async deleteCustomer({commit}, id) {
			await axios.post('customer/remove', {_id: id} ,configuration)
				.then(function (response) {
					commit('SET_ALERT_MESSAGE', {
							show: true,
							color: 'success',
							message: 'Cliente eliminado satisfactoriamente',
							timeout: 4000
						}, {root: true})
				})
				.catch(function (e) {
					console.log(e.message)
				})
    },
  },
  getters: {}
};
