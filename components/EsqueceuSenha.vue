<template>
  <div class="login">
    <div class="wrapper wrapper-login wrapper-login-full p-0">
      <div class="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient">
        <img :src="logo" alt="Educamente">
      </div>
      <div class="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
        <div class="container container-login container-transparent animated fadeIn">
          <h3 class="text-center">Esqueceu sua senha?</h3>
          <div class="login-form">
            <div class="form-group form-floating-label">
              <input ref="login" v-model="model.login" id="login" name="login" type="text" class="form-control input-border-bottom" required autofocus>
              <label for="login" class="placeholder">Informe seu usuário ou email</label>
            </div>
            <div class="form-action mb-3">
              <button @click="recoverPassword" class="btn btn-primary btn-rounded btn-login" style="width: 150px">Recuperar Senha</button>
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
  name: "EsqueceuSenha",
  mixins: [globalMixin],
  data() {
    return {
      //logo: require('../static/img/logoEducamente-big-white.png'),
      logo: '',
      model: {},
    }
  },
  methods: {
    async recoverPassword() {
      if (this.model.login == null || this.model.login == '') {
        this.$refs.login.setCustomValidity('Informe o usuário ou email')
        this.$refs.login.reportValidity()
        this.$refs.login.focus()
        return false
      } else {
        this.$refs.login.setCustomValidity('')
      }

      let response = await this.requestAPI('POST', '/forgot-password', this.model)

      if (response.status && response.status == 404) {
        swal({
          title: "Erro!",
          text: "Usuário ou email inválido.",
          icon: "error",
          buttons: {
            confirm: {
              className: 'btn btn-danger'
            }
          },
        })
      } else if (response.status && (response.status == 422)) {
        swal({
          title: "Erro!",
          text: "Ocorreu um erro inesperado.",
          icon : "error",
          buttons: {
            confirm: {
              className: 'btn btn-danger'
            }
          },
        })
      } else {
        let _this = this;
        swal({
          title: "Sucesso!",
          text: "Um email de recuperação de senha foi enviado para o endereço do usuário.",
          icon: "success",
          buttons: {
            confirm: {
              className: 'btn btn-primary'
            }
          },
        }).then(function() {
          _this.model = {}
        })
      }
    },
  }
}
</script>