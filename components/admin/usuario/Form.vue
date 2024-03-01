<template>
  <LayoutForm
    formTitle="Usuário"
    apiPath="/users"
    listPath="/admin/users/list"
    :model.sync="model"
    :errors.sync="errors"
  >
    <template slot="form">
      <InputText
        id="name"
        label="Nome *"
        :value.sync="model.name"
        :errors="getErrors('name')"
      />
      <InputText
        id="email"
        label="Email"
        type="email"
        :value.sync="model.email"
        :errors="getErrors('email')"
      />
      <InputText
        id="password"
        :label="'Senha' + (model.id ? '' : ' *')"
        type="password"
        :value.sync="model.password"
        :errors="getErrors('password')"
      />
      <InputSelect
        id="role"
        label="Tipo de Usuário *"
        path="/roles"
        field="readable_name"
        :value.sync="model.role_id"
        :errors="getErrors('role_id')"
      />
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "UsuarioForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
    }
  },
  methods: {
    getErrors(field) {
      if (this.errors) {
        return this.errors[field]
      } else {
        return null
      }
    },
  }
}
</script>