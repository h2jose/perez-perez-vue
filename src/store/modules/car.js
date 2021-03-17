import axios from 'axios';
const header = {"Token": localStorage.getItem("token") }
const configuration = {headers: header}

export default {
  namespaced: true,
  state: {
    cars: [],
    car: {}
  },
  mutations: {
    SET_CARS(state, payload) {
      state.cars = payload;
    },
    SET_CAR(state, payload) {
      state.car = payload;
    }
  },
  actions: {
    async getCars({ commit,dispatch }) {
      let arrayCars = [];
      commit("SET_LOADER", true, { root: true });
      try {
        await axios.get('car/list', configuration)
          .then(
            function (response) {
              arrayCars = response.data;
              commit("SET_LOADER", false, { root: true });
            })
          .catch(function (e) {
            console.log(e.message)
          })
        commit("SET_CARS", arrayCars);
      } catch (e) {
        console.log(e)
      }
    },

    async addCar({ commit, dispatch }, data) {
      let me = this
      await axios.post('car/add', {
        customer: data.customer,
        number: data.number,
        marca: data.marca,
        modelo: data.modelo,
        anno: data.anno,
      }, configuration)
        .then(function(response){
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Auto creado satisfactoriamente',
            timeout: 4000
          }, {root: true})
          dispatch('getCars')
        })
        .catch(function (e) {
          console.log(e.message)
        })
    },
    async updateCar({ commit, dispatch }, data) {
      let me = this;
      await axios.put('car/update', {
        _id: data._id,
        customer: data.customer,
        number: data.number,
        marca: data.marca,
        modelo: data.modelo,
        anno: data.anno,
      }, configuration)
        .then(function(response){
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Auto actualizado satisfactoriamente',
            timeout: 4000
          }, {root: true})
          dispatch('getCars')
        })
        .catch(function (e) {
          console.log(e.message)
        })

    },
    async deleteCar({commit}, id) {
      await axios.post('car/remove', {_id: id} ,configuration)
        .then(function (response) {
          commit('SET_ALERT_MESSAGE', {
            show: true,
            color: 'success',
            message: 'Auto eliminado satisfactoriamente',
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
