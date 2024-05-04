// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: [],
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    },
  },
  actions: {
    fetchClients({ commit }) {
      // Aqui você pode fazer a requisição para obter os clientes do servidor
      // Exemplo com axios:
      // axios.get('/clients').then(response => {
      //   commit('setClients', response.data);
      // });
      // Substitua a linha acima pelo seu código para obter os clientes do servidor
      // por enquanto, usaremos um array vazio
      const clients = [];
      commit("setClients", clients);
    },
  },
  modules: {},
});
