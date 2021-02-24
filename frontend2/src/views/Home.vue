<template>
  <div class="container mx-auto">
    <div class="p-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <!--Card 1-->
      <div class="rounded overflow-hidden shadow-2xl bg-white" v-for="beef in data" :key="beef">
        <div>
          <img class="object-fill w-full h-72 " :src="beef.image" alt="Mountain">
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ beef.name }}</div>
          <p class="text-gray-600 text-base">
            {{ fullName(beef.description, 150) }}
          </p>
          <div class="font-bold text-l mt-2">
            Price: {{ beef.price }} Bath/Kg
          </div>
          <br>
          <button type="button"
            class="focus:outline-none text-white text-sm py-2.5 px-2.5 rounded-md bg-yellow-500 hover:bg-yellow-700 hover:shadow-lg flex items-center font-extrabold"
            @click="addToCart(beef)"
            >
            <img src="../assets/shopping-cart.svg" class="w-4 h-4 mr-2" alt="">
            Add To Cart
          </button>
        </div>
        <div class="px-6 pt-4 pb-2 flex">
          <div v-for="cook in beef.cutId.cook" :key="cook">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{ cook }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    components: {},
    data() {
      return {
        data: null
      }
    },
    computed: {
      fullName() {
        return (str, n) => (str.length > n) ? str.substr(0, n-1) + '...' : str;
      }
    },
    methods: {
      ...mapActions('home', {
        actionGetBeef: 'getBeef',
        actionAddCart: 'addToCart'
      }),
      ...mapGetters('home', {
        getterGetCart: 'getCart' 
      }),
      ...mapGetters('auth', {
        getterCheckLogIn: 'getLoginStatus' 
      }),
      async getBeef() {
        const result = await this.actionGetBeef()
        this.data = result
        console.log(this.data)
      },
      addToCart(beef) {
        let status = this.getterCheckLogIn()
        if (status !== "Success"){
          alert("You need to Sign In first to use cart")
        }else {
          this.actionAddCart(beef)
          this.getCart()
        }
      },
      getCart() {
        let cart = this.getterGetCart()
        console.log(cart)
      }
    },
    created() {
      this.getBeef()
    }
  }
</script>