import axios from 'axios';
const header = {"Token": localStorage.getItem("token") }
const configuration = {headers: header}

export default {
  namespaced: true,
  state: {
    orders: [],
    order: {}
  },
  mutations: {
    SET_ORDERS(state, payload) {
      state.orders = payload;
    },
    SET_ORDER(state, payload) {
      state.order = payload;
    }
  },
  actions: {
    async getOrders({ commit,dispatch }) {
      let arrayOrders = [];
      commit("SET_LOADER", true, { root: true });
      try {
        await axios.get('order/list', configuration)
          .then(
            function (response) {
              arrayOrders = response.data;
              commit("SET_LOADER", false, { root: true });
            })
          .catch(function (e) {
            console.log(e.message)
          })
        commit("SET_ORDERS", arrayOrders);
      } catch (e) {
        console.log(e)
      }
    },
    async addOrder({ commit, dispatch }, data) {
      let me = this
      await axios.post('order/add', {
        car: data.car,
        notes: data.notes,
        status: data.status,
      }, configuration)
        .then(function(response){
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Orden creada satisfactoriamente',
            timeout: 4000
          }, {root: true})
          dispatch('getOrders')
        })
        .catch(function (e) {
          console.log(e.message)
        })
    },
    async updateOrder({ commit, dispatch }, data) {
      let me = this;
      await axios.put('order/update', {
        _id: data._id,
        car: data.car,
        notes: data.notes,
        status: data.status,
      }, configuration)
        .then(function(response){
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Orden actualizada satisfactoriamente',
            timeout: 4000
          }, {root: true})
          dispatch('getOrders')
        })
        .catch(function (e) {
          console.log(e.message)
        })

    },
    async deleteOrder({commit}, id) {
      await axios.post('car/remove', {_id: id} ,configuration)
        .then(function (response) {
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Orden eliminada satisfactoriamente',
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
