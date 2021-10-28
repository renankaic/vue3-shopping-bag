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

    loadBag(state, products) {
      state.productsInBag = products
    },

    addToBag(state, product) {
      state.productsInBag.push(product)
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },

    removeFromBag(state, productId){
      let updatedBag = state.productsInBag.filter(prod => prod.id != productId)
      state.productsInBag = updatedBag
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
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

    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")){
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")))
      }
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
