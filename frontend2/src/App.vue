<template>
  <div class="p-4 bg-white">
    <div class="flex justify-between w-full" :class="{changedirection: isActive}">
      <div class="flex flex-row w-6/12">
        <a href="#" class="mr-4 flex items-center text-xl">LOGO</a>
        <div style="width:2rem;">
          <a id="hamburgerbtn" class="sm:hidden bg-purple-800" @click="atToggle"><img src="./assets/square.svg"
              alt=""></a>
        </div>
      </div>
      <ul class="sm:flex w-6/12 justify-evenly hidden transition-transform items-center" :class="{'action': isActive}">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>

        <li v-if="getterLoginStatus !== 'Success'">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="getterLoginStatus !== 'Success'">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="getterLoginStatus === 'Success'" @click="atSignOut">Sign Out</li>
        <li v-if="getterLoginStatus === 'Success'">
          <div class="w-full relative" :class="{'changeSize': isActive}">
            <span class="cart-count">{{ getterGetCart.length }}</span><img src="./assets/shopping-cart.svg" class="w-8" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    components: {},
    data() {
      return {
        data: null,
        isActive: false
      }
    },
    computed: {
      ...mapGetters('auth', {
        getterLoginStatus: 'getLoginStatus'
      }),
      ...mapGetters('home', {
        getterGetCart: 'getCart' 
      })
    },
    methods: {
      ...mapActions('auth', {
        actionSignOut: 'signOut'
      }),
      atToggle() {
        this.isActive = !this.isActive
      },
      async atSignOut() {
        await this.actionSignOut()
      }
    }
  }
</script>

<style scoped>
  .action {
    display: block;
    width: 100%;
  }

  .action li {
    line-height: 3rem;
    border-bottom: 2px solid black;
  }

  .changedirection {
    flex-direction: column;
  }

  .changeSize {
    width: 40px;
    margin: 0.5rem 0;
  }

  .cart-count {
    font-size: 0.75rem;
    background-color: red;
    width: 1rem;
    text-align: center;
    color: #fff;
    z-index: 2;
    border-radius: 3px;
    position: absolute;
    line-height: 1.1rem;
    right: 0px;
  }
</style>