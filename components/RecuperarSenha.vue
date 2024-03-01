<template>
  <div class="login">
    <div class="wrapper wrapper-login wrapper-login-full p-0">
      <div class="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient">
        <img :src="logo" alt="Educamente">
      </div>
      <div class="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
        <div class="container container-login container-transparent animated fadeIn">
          <h3 class="text-center">Recuperação de senha</h3>
          <div class="login-form">
            <div class="form-group form-floating-label">
              <input ref="password" v-model="model.password" id="password" name="password" type="password" class="form-control input-border-bottom" required autofocus>
              <label for="password" class="placeholder">Nova senha</label>
            </div>
            <div class="form-group form-floating-label">
              <input ref="password_confirmation" v-model="model.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" class="form-control input-border-bottom" required autofocus>
              <label for="password_confirmation" class="placeholder">Confirmar nova senha</label>
            </div>
            <div class="form-action mb-3">
              <button @click="redefinePassword" class="btn btn-primary btn-rounded btn-login" style="width: 150px">Redefinir Senha</button>
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
  name: "RecuperarSenha",
  mixins: [globalMixin],
  data() {
    return {
      //logo: require('../static/img/logoEducamente-big-white.png'),
      logo: '',
      model: {},
    }
  },
  created() {
    this.model.email = this.$route.query.email
    this.model.token = this.$route.query.token
  },
  methods: {
    async redefinePassword() {
      if (this.model.password == null || this.model.password == '') {
        this.$refs.password.setCustomValidity('Informe a nova senha')
        this.$refs.password.reportValidity()
        this.$refs.password.focus()
        return false
      } else {
        this.$refs.password.setCustomValidity('')
      }

      if (this.model.password_confirmation == null || this.model.password_confirmation == '') {
        this.$refs.password_confirmation.setCustomValidity('Confirme a nova senha')
        this.$refs.password_confirmation.reportValidity()
        this.$refs.password_confirmation.focus()
        return false
      } else {
        this.$refs.password_confirmation.setCustomValidity('')
      }

      if (this.model.password != this.model.password_confirmation) {
        this.$refs.password_confirmation.setCustomValidity('A confirmação está diferente da senha')
        this.$refs.password_confirmation.reportValidity()
        this.$refs.password_confirmation.focus()
        return false
      } else {
        this.$refs.password_confirmation.setCustomValidity('')
      }

      let response = await this.requestAPI('PUT', '/recuperar-senha', this.model)

      if (response.status && response.status == 422) {
        swal({
          title: "Erro!",
          text: "Token inválido ou expirado.",
          icon: "error",
          buttons: {
            confirm: {
              className: 'btn btn-danger'
            }
          },
        })
      } else if (response.status && (response.status == 400)) {
        swal({
          title: "Erro!",
          text: "Ocorreu um erro inesperado!",
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
          text: "Senha redefinida.",
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsq: false,
          buttons: {
            confirm: {
              className: 'btn btn-primary'
            }
          },
        }).then(function() {
          _this.$router.push('/login')
        })
      }
    },
  }
}
</script>