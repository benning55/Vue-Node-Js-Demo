<template>
    <div>
        <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
            <div class="py-8 px-8 rounded-xl">
                <h1 class="font-medium text-2xl mt-3 text-center">Sign In</h1>
                <form action="" class="mt-6" @submit.prevent="login">
                    <div class="my-5 text-sm">
                        <label for="Email" class="block text-black">Email</label>
                        <input type="text" autofocus id="Email"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Email" :class="{'border-2 border-red-500': isEmailError}" v-model="form.email"/>
                        <div class="input-errors" v-for="err in v$.form.email.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is required</span>
                            <span v-if="err.$validator === 'email'" class="text-red-500">Not valid email value</span>
                        </div>
                    </div>
                    <div class="my-5 text-sm">
                        <label for="password" class="block text-black">Password</label>
                        <input type="password" id="password"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Password" :class="{'border-2 border-red-500': isPasswordError}" v-model="form.password"/>
                        <div class="input-errors" v-for="err in v$.form.password.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is required</span>
                        </div>
                        <div class="flex justify-end mt-2 text-xs text-gray-600">
                            <a href="../../pages/auth/forget_password.html hover:text-black">Forget Password?</a>
                        </div>
                    </div>

                    <button
                        class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full" type="submit">Login</button>
                </form>

                <p class="mt-5 text-xs text-center font-light text-gray-400"> Don't have an account? <a
                        href="/signup" class="text-black font-medium"> Create One </a> </p>

            </div>
        </div>
    </div>
</template>


<script>
  // @ is an alias to /src
  import { mapActions, mapGetters } from 'vuex'
  import { required, email } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'

  export default {
    components: {},
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
      return {
        form: {
            email: "",
            password: ""
        },
        isEmailError: false,
        isPasswordError: false
      }
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        }
    },
    methods: {
      ...mapActions('auth', {
        actionLogin: 'login'
      }),
      ...mapGetters('auth', {
            getterLoginStatus: 'getLoginStatus',
            getAuthUserDetail: 'getAuthUser'
      }),
      async checkLogin() {
        let loginStatus = this.getterLoginStatus()
        if(loginStatus === "Success"){
            this.$router.push({
                path: '/'
            })
        }
      },
      async login() {
        const isFormCorrect = await this.v$.$validate()

        console.log(this.v$.form.email.$error)
        console.log(this.v$.form.password.$error)

        if(!isFormCorrect) {
            this.isEmailError = (this.v$.form.email.$error) ? true : false
            this.isPasswordError = (this.v$.form.password.$error) ? true : false
            return
        }
        this.isEmailError = false
        this.isPasswordError = false 
        const result = await this.actionLogin({
            email: this.form.email,
            password: this.form.password
        })
        if(result === 'Success') {
            this.$router.push({
                path: '/'
            })
        } else {
            alert(result.message)
        }
      }
    },
    created () {
        this.checkLogin()
    }
  }
</script>