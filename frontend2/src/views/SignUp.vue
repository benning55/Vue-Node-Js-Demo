<template>
    <div>
        <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
            <div class="py-8 px-8 rounded-xl">
                <h1 class="font-medium text-2xl mt-3 text-center">Sign Up</h1>
                <form action="" class="mt-6" @submit.prevent="signUp">
                    <div class="my-5 text-sm">
                        <label for="Name" class="block text-black">Name</label>
                        <input type="text" autofocus id="Name"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Name"
                            :class="{'border-2 border-red-500': isNameError}" v-model="form.name" />
                        <div class="input-errors" v-for="err in v$.form.name.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is
                                required</span>
                            <span v-if="err.$validator === 'alpha'" class="text-red-500">This field need to be alphabet
                                char</span>
                        </div>
                    </div>
                    <div class="my-5 text-sm">
                        <label for="Email" class="block text-black">Email</label>
                        <input type="text" autofocus id="Email"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Email"
                            :class="{'border-2 border-red-500': isEmailError}" v-model="form.email" />
                        <div class="input-errors" v-for="err in v$.form.email.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is
                                required</span>
                            <span v-if="err.$validator === 'email'" class="text-red-500">Not valid email value</span>
                            <span v-if="err.$validator === 'notGmail'" class="text-red-500">Need to be gmail account</span>
                        </div>
                    </div>
                    <div class="my-5 text-sm">
                        <label for="password" class="block text-black">Password</label>
                        <input type="password" id="password"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Password" :class="{'border-2 border-red-500': isPasswordError}"
                            v-model="form.password" />
                        <div class="input-errors" v-for="err in v$.form.password.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is
                                required</span>
                            <span v-if="err.$validator === 'minLength'" class="text-red-500">This field is required at
                                least 8 char</span>
                        </div>
                    </div>
                    <div class="my-5 text-sm">
                        <label for="repassword" class="block text-black">Re-Password</label>
                        <input type="password" id="repassword"
                            class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Re-Password" :class="{'border-2 border-red-500': isRePasswordError}"
                            v-model="form.repassword" />
                        <div class="input-errors" v-for="err in v$.form.repassword.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is
                                required</span>
                            <span v-if="err.$validator === 'recheckPassword'" class="text-red-500">This field doesn't
                                match with password</span>
                        </div>
                    </div>
                    <div class="my-5 text-sm">
                        <label for="Image" class="block text-black">Image</label>
                        <div class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            :class="{'border-2 border-red-500': isFileError}">
                            <input type="file" id="Image" @change="onChangeFileUpload" />
                            <img style="width: 100%" :src="url" alt="">
                        </div>
                        <div class="input-errors" v-for="err in v$.url.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is
                                required</span>
                        </div>
                    </div>

                    <!-- <div class="my-5 text-sm">
                        <label for="repassword" class="block text-black">Re-Type Password</label>
                        <input type="password" id="repassword" class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="repassword" :class="{'border-2 border-red-500': isRePasswordError}" v-model="form.repassword"/>
                        <div class="input-errors" v-for="err in v$.form.repassword.$errors" :key="err">
                            <span v-if="err.$validator === 'required'" class="text-red-500">This field is required</span>
                        </div>
                    </div> -->

                    <button
                        class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
                        type="submit">Sign Up</button>
                </form>
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
    import {
        required,
        email,
        alpha,
        sameAs,
        minLength
    } from '@vuelidate/validators'
    import {
        notGmail,
        recheckPassword
    } from '../validators'
    import useVuelidate from '@vuelidate/core'

    //   const recheckPassword = (param1) => function(value) {
    //         return value === param1
    //     }

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
                    repassword: "",
                    file: null
                },
                isEmailError: false,
                isPasswordError: false,
                isNameError: false,
                isRePasswordError: false,
                isFileError: false,
                url: null
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
                        required,
                        minLength: minLength(8)
                    },
                    repassword: {
                        required,
                        recheckPassword: recheckPassword(this.form.password),
                        sameAsPassword: sameAs(this.form.password)
                    }
                },
                url: {
                    required
                }
            }
        },
        methods: {
            ...mapActions('auth', {
                actionLogin: 'login',
                actionSignUp: 'signUp'
            }),
            ...mapGetters('auth', {
                getterLoginStatus: 'getLoginStatus',
                getAuthUserDetail: 'getAuthUser'
            }),
            async checkLogin() {
                let loginStatus = this.getterLoginStatus()
                if (loginStatus === "Success") {
                    this.$router.push({
                        path: '/'
                    })
                }
            },
            onChangeFileUpload(e) {
                this.form.file = e.target.files[0];
                this.url = URL.createObjectURL(this.form.file);
            },
            async signUp() {
                const isFormCorrect = await this.v$.$validate()

                if (!isFormCorrect) {
                    this.isNameError = (this.v$.form.name.$error) ? true : false
                    this.isEmailError = (this.v$.form.email.$error) ? true : false
                    this.isPasswordError = (this.v$.form.password.$error) ? true : false
                    this.isRePasswordError = (this.v$.form.repassword.$error) ? true : false
                    this.isFileError = (this.v$.url.$error) ? true : false
                    return
                }
                this.isNameError = false
                this.isEmailError = false
                this.isPasswordError = false
                this.isRePasswordError = false
                let payload = new FormData()
                payload.append('name', this.form.name)
                payload.append('email', this.form.email)
                payload.append('password', this.form.password)
                payload.append('file', this.form.file)
                const result = await this.actionSignUp(payload)
                if (result.status === 200) {
                    console.log("its in")
                    this.$router.push({
                        path: '/signin'
                    })
                } else {
                    alert(result.data.message)
                }
            }
        },
        created() {
            this.checkLogin()
        }
    }
</script>