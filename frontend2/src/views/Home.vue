<template>
  <div class="container mx-auto">
    <div class="p-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <!--Card 1-->
      <div class="rounded overflow-hidden shadow-2xl bg-white" v-for="beef in data" :key="beef">
        <div>
          <img class="object-fill h-48 w-full" :src="beef.image" alt="Mountain">
        </div>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ beef.name }}</div>
          <p class="text-gray-600 text-base">
            {{ beef.description }}
          </p>
          <div class="font-bold text-l mt-2">
            Price: {{ beef.price }} Bath/Kg
          </div>
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
  import { mapActions } from 'vuex'

  export default {
    components: {},
    data() {
      return {
        data: null
      }
    },
    methods: {
      ...mapActions('home', {
        actionGetBeef: 'getBeef'
      }),
      async getBeef() {
        const result = await this.actionGetBeef()
        this.data = result
        console.log(this.data)
      }
    },
    created () {
      this.getBeef()
    }
  }
</script>