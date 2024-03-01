<template>
  <LayoutSimpleForm
    formTitle="Perfil"
  >
    <template slot="form">
      <InputText
        id="current_password"
        label="Senha Atual"
        type="password"
        :value.sync="model.current_password"
        :errors="getErrors('current_password')"
      />
      <InputText
        id="new_password"
        label="Nova Senha"
        type="password"
        :value.sync="model.new_password"
        :errors="getErrors('new_password')"
      />
      <InputText
        id="new_confirm_password"
        label="Confirmar Nova Senha"
        type="password"
        :value.sync="model.new_confirm_password"
        :errors="getErrors('new_confirm_password')"
      />
    </template>
    <template slot="formButtons">
      <button @click="save" class="btn btn-primary font-weight-bold">Salvar</button>
    </template>
  </LayoutSimpleForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "AlterarSenha",
  mixins: [globalMixin],
  data() {
    return{
      model: {},
      errors: {}
    }
  },
  methods: {
    async save() {
      let response = await this.requestAPI('PUT', '/alterar-senha', this.model)

      if (response.status && response.status == 422) {
        this.errors = response.data.errors

        swal({
          title: "Erro ao atualizar!",
          text: "Informações inválidas",
          icon: "error",
          buttons: false,
          timer: 2000
        })
      } else {
        let _this = this;
        swal({
          title: "Registro atualizado!",
          text: " ",
          icon: "success",
          buttons: false,
          timer: 2000
        }).then(function() {
          _this.model = {}
          _this.errors = {}
        })
      }
    },
    getErrors(field) {
      if (this.errors) {
        return this.errors[field]
      } else {
        return null
      }
    }
  }
}
</script>