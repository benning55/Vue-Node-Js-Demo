import axios from "axios";

const state = () => ({
  });
   
  const getters = {
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
    }
  };
   
  const mutations = {
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }