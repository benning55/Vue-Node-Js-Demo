import axios from "axios";
import { jwtDecrypt } from "../../shared/jwtHelper";

const state = () => ({
    authData: {
      token: "",
      refreshToken: "",
      tokenExp: "",
      userId: "",
      userName: "",
      email: ""
    },
    loginStatus: ""
  });
   
  const getters = {
    getLoginStatus(state){
        return state.loginStatus;
    },
    getAuthUser(state) {
        return state.authData
    }
  };
   
  const actions = {
    signOut({commit}) {
        commit("home/clearCart", null, { root: true })
        commit('removeToken')
        return true
    },
    async login({commit},payload) {
        const header = {
            'Content-Type': 'application/json',
        }
        try{
            const result = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/signin`, payload, header)
            console.log("data", result.data)
            commit('saveTokenData', result.data)
            commit('setLoginStatus','Success')
            return "Success"
        }
        catch (error) {
            commit('setLoginStatus','Fail');
            return error.response.data
        }
    },
    async signUp(_, payload) {
        console.log(payload)
        const header = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            const result = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/signup`, payload, header)
            // commit('setLoginStatus','Fail');
            return result
        }
        catch (error) {
            // commit('setLoginStatus','Fail');
            return error.response
        }

    }
  };
   
  const mutations = {
      saveTokenData(state, data) {
          localStorage.setItem("token", data.token)

          const jwtDecodedValue = jwtDecrypt(data.token)

          console.log("JWT", jwtDecodedValue)

          const newTokenData = {
            token: data.token,
            refreshToken: "",
            tokenExp: "",
            userId: data.id,
            userName: data.name,
            email: data.email
          }

          console.log(newTokenData)

          state.authData = newTokenData
      },
      setLoginStatus(state, value) {
          state.loginStatus = value
      },
      removeToken(state){
          localStorage.removeItem("token")
          state.loginStatus = ""
      }
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }