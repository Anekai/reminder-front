<template>
  <div class="login">
    <div class="wrapper wrapper-login wrapper-login-full p-0">
      <div :style="'background-image: url(' + fundo + '); background-size: cover'" class="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center">
        <!--<img :src="logo" alt="Reminder" style="background-color: #ffffffa6; padding: 20px; border-radius: 20px; max-width: 400px;">-->
        <div style="
          background-color: white;
          border-radius: 100px;
          font-size: 100px;
          padding-left: 40px;
          padding-right: 40px;
          font-family: sans-serif;"
        >
          Help Desk
        </div>
      </div>
      <div class="login-aside w-50 d-flex align-items-center justify-content-center bg-light">
        <div class="container container-login container-transparent animated fadeIn">
          <h1 class="text-center">Login</h1>
          <div class="login-form">
            <div class="form-group">
              <label for="email" class="placeholder">Email</label>
              <input
                id="email"
                name="email"
                ref="email"
                v-model="email"
                type="text"
                class="form-control"
                required
                @keyup.enter="signin"
              >
            </div>
            <div class="form-group">
              <label for="password" class="placeholder">Senha</label>
              <div class="position-relative">
                <input
                  id="password"
                  name="password"
                  ref="password"
                  v-model="password"
                  :type="passwordType"
                  class="form-control"
                  required
                  @keyup.enter="signin"
                >
                <div class="show-password">
                  <i class="icon-eye" @click="showPassword"></i>
                </div>
              </div>
              <small v-if="showLoginError" class="form-text text-muted">Login ou senha inválidos</small>
            </div>
            <div class="row form-sub m-0">
              <a href="/forgot-password" class="link float-right">Esqueceu a senha?</a>
            </div>
            <!--<div class="form-action mb-3">
              <button @click="signin" class="btn btn-primary btn-rounded btn-login">Logar</button>
            </div>-->
            <div class="row form-action">
              <div class="col-md-6">
                <a href="/sign-up" id="show-signin" class="btn btn-danger btn-link w-100 fw-bold">Criar Conta</a>
              </div>
              <div class="col-md-6">
                <button @click="signin" class="btn btn-secondary w-100 fw-bold">Fazer Login</button>
              </div>
            </div>
            <!--<div class="login-account">
					  	<span class="msg">Não possui uma conta?</span>
					  	<a href="/sign-up" id="show-signup" class="link">Cadastre-se</a>
					  </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "Login",
  mixins: [globalMixin],
  beforeMount(){
    if (this.getAuth) {
      this.goTo('/')
    }
  },
  mounted() {
    //setTimeout(() => {
    //  this.$refs.email.focus()
    //}, 1000)
  },
  data() {
    return {
      logo: require('~/assets/img/logo-univates.png'),
      fundo: require('~/assets/img/office_desk.jpg'),
      email: '',
      password: '',
      showLoginError: false,
      passwordType: 'password'
    }
  },
  methods:{
    async signin() {
      if (this.email == null || this.email == "") {
        this.$refs.username.focus()
      } else if (this.password == null || this.password == "") {
        this.$refs.password.focus()
      } else {
        this.showLoginError = false;

        const response =  await this.requestAPI('POST', '/login', {
          email: this.email,
          password: this.password
        })
        
        if (response.status && response.status == 404) {
          this.showLoginError = true
        } else {
          this.setAuth(response.data)

          try {
            const {data} = await this.requestAPI('GET', '/authenticated-user')
            this.setUser(data)

            await this.loadMenu()

            this.goTo(this.getUser.homePage) 
          } catch(error) {
            console.log("UserInfos: ", error)
          }
        }
      }
    },
    showPassword() {
      if (this.passwordType == 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    goTo(path) {
      this.$router.push(path)
    },
  }
}
</script>