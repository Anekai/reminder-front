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
        <div class="container container-signup container-transparent animated fadeIn">
          <h3 class="text-center">Sign Up</h3>
          <div class="login-form">
            <div class="form-group">
              <label for="fullname" class="placeholder"><b>Nome Completo</b></label>
              <input v-model="name" ref="name" id="fullname" name="fullname" type="text" class="form-control" required>
              <small v-for="(error,i) in getErrors('name')" :key="i" class="form-text text-muted">{{ error }}</small>
            </div>
            <div class="form-group">
              <label for="email" class="placeholder"><b>Email</b></label>
              <input v-model="email" ref="email" id="email" name="email" type="email" class="form-control" required>
              <small v-for="(error,i) in getErrors('email')" :key="i" class="form-text text-muted">{{ error }}</small>
            </div>
            <div class="form-group">
              <label for="passwordsignin" class="placeholder"><b>Senha</b></label>
              <div class="position-relative">
                <input v-model="password" ref="password" id="passwordsignin" name="passwordsignin" :type="passwordType" class="form-control" required>
                <small v-for="(error,i) in getErrors('password')" :key="i" class="form-text text-muted">{{ error }}</small>
                <div class="show-password">
                  <i class="icon-eye" @click="showPassword"></i>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmpassword" class="placeholder"><b>Confirmar Senha</b></label>
              <div class="position-relative">
                <input v-model="confirm_password" ref="confirm_password" id="confirmpassword" name="confirmpassword" :type="confirmPasswordType" class="form-control" required>
                <div class="show-password">
                  <i class="icon-eye" @click="showConfirmPassword"></i>
                </div>
              </div>
            </div>
            <div class="row form-action">
              <div class="col-md-6">
                <a href="/login" id="show-signin" class="btn btn-danger btn-link w-100 fw-bold">Cancelar</a>
              </div>
              <div class="col-md-6">
                <button @click="signup" class="btn btn-secondary w-100 fw-bold">Cadastrar</button>
              </div>
            </div>
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
  data() {
    return {
      logo: require('~/assets/img/logo-univates.png'),
      fundo: require('~/assets/img/office_desk.jpg'),
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      passwordType: 'password',
      confirmPasswordType: 'password',
      errors: {}
    }
  },
  methods:{
    async signup() {
      const response =  await this.requestAPI('POST', '/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirm_password
      })
      
      if (response.status && response.status == 422) {
        this.errors = response.data.error
      } else {
        this.setAuth(response.data)

        try {
          const {data} = await this.requestAPI('GET', '/authenticated-user')
          this.setUser(data)

          await this.loadMenu()

          this.goTo('/home') 
        } catch(error) {
          console.log("UserInfos: ", error)
        }
      }
    },
    getErrors(field) {
      if (this.errors) {
        return this.errors[field]
      } else {
        return null
      }
    },
    showPassword() {
      if (this.passwordType == 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    showConfirmPassword() {
      if (this.confirmPasswordType == 'password') {
        this.confirmPasswordType = 'text'
      } else {
        this.confirmPasswordType = 'password'
      }
    },
    goTo(path) {
      this.$router.push(path)
    },
  }
}
</script>