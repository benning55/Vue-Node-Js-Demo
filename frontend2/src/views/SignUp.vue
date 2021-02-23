<template>
    <div>
        <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
            <div class="py-8 px-8 rounded-xl">
                <h1 class="font-medium text-2xl mt-3 text-center">Sign Up</h1>
                <form action="" class="mt-6" @submit.prevent="login">
                    <div class="my-5 text-sm">
                        <label for="Name" class="block text-black">Name</label>
                        <input type="text" autofocus id="Name"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Name" :class="{'border-2 border-red-500': isNameError}" v-model="form.name"/>
                        <div class="input-errors" v-for="err in v$.form.name.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is required</span>
                            <span v-if="err.$validator === 'alpha'" class="text-red-500">This field need to be alphabet char</span>
                        </div>
                    </div>
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
                    </div>

                    <div class="my-5 text-sm">
                        <label for="repassword" class="block text-black">Re-Type Password</label>
                        <input type="password" id="repassword"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="repassword" :class="{'border-2 border-red-500': isRePasswordError}" v-model="repassword"/>
                        <div class="input-errors" v-for="err in v$.repassword.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is required</span>
                        </div>
                    </div>

                    <button
                        class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
  // @ is an alias to /src
  import { mapActions, mapGetters } from 'vuex'
  import { required, email, alpha } from '@vuelidate/validators'
  import { notGmail, recheckPassword } from '../validators'
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
            name: "",
            email: "",
            password: "",
        },
        repassword: "",
        isEmailError: false,
        isPasswordError: false,
        isNameError: false,
        isRePasswordError: false
      }
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                    alpha
                },
                email: {
                    required,
                    email,
                    notGmail
                },
                password: {
                    required
                }
            },
            repassword: {
                required,
                recheckPassword: recheckPassword(this.form.password, this.repassword)
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
        console.log(this.v$.form.password.$errors)
        console.log(this.v$.repassword.$errors)

        if(!isFormCorrect) {
            this.isNameError = (this.v$.form.email.$error) ? true : false
            this.isEmailError = (this.v$.form.email.$error) ? true : false
            this.isPasswordError = (this.v$.form.password.$error) ? true : false
            this.isRePasswordError = (this.v$.repassword.$error) ? true : false
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