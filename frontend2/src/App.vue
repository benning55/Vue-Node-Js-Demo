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
        <li v-else @click="atSignOut">Sign Out</li>
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
        getterLoginStatus: 'getLoginStatus',
      })
    },
    methods: {
      ...mapActions('auth', {
        actionSignOut: 'signOut'
      }),
      atToggle() {
        console.log("test2")
        this.isActive = !this.isActive
      },
      async atSignOut() {
        console.log("signOut")
        let result = await this.actionSignOut()
        if (result === true) {
          console.log("success")
        }
      }
    }
  }
</script>

<style scoped>
  .action {
    display: block;
    width: 100%;
    line-height: 3rem;
  }

  .action li {
    border-bottom: 2px solid black;
  }

  .changedirection {
    flex-direction: column;
  }
</style>