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
    },

    removeFromBag(state, productId){
      let updatedBag = state.productsInBag.filter(prod => prod.id != productId)
      state.productsInBag = updatedBag
    }
    
  },
  actions: {
    //Create an action to be called from components : 0 

    loadProducts({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data)
        })
    },
    
    addToBag({ commit }, product) {
      commit('addToBag', product)
    },

    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) {
        commit('removeFromBag', productId)
      }
    }

  },
  modules: {
  }
})
