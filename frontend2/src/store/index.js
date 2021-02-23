import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authModule from './modules/auth'
import homeModule from './modules/home'

const store = createStore({
  modules: {
    auth: authModule,
    home: homeModule
  },
  plugins: [createPersistedState()]
})

export default store;
