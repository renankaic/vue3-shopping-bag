import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [1, 2, 3],
    productsInBag: []
  },
  mutations: {
    //Create an mutation to be called by an action and commit the change to state

    loadProducts(state, products) {
      state.products = products
    },

    addToBag(state, product) {
      state.productsInBag.push(product)
    }
    
  },
  actions: {
    //Create an action to be called from component

    loadProducts({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data)
        })
    },
    
    addToBag({ commit }, product) {
      commit('addToBag', product)
    }

  },
  modules: {
  }
})
