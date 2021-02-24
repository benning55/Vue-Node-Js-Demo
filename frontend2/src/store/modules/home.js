import axios from "axios";

const state = () => ({
    cart: []
  });
   
  const getters = {
      getCart(state){
          return state.cart
      }
  };
   
  const actions = {
    async getBeef({_}) {
        console.log(_)
        const header = {
            'Content-Type': 'application/json',
        }
        try{
            const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/home/beef`, header)
            return result.data.beef
        }
        catch (error) {
            return error.response.data
        }
    },
    addToCart({commit}, payload){
        console.log(payload)
        commit('saveToCart', payload)
    }
  };
   
  const mutations = {
      saveToCart(state, data){
          state.cart.push(data)
      },
      clearCart(state) {
        state.cart = []
      }
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }