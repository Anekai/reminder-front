<template>
  <LayoutForm
    formTitle="Grupo de Usuário"
    apiPath="/roles"
    listPath="/admin/grupo/list"
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
        id="readable_name"
        label="Nome Legível *"
        :value.sync="model.readable_name"
        :errors="getErrors('readable_name')"
      />

      <InputCheckList
        id="permissions"
        label="Permissões"
        :value.sync="model.permissions"
        path="/permissions"
        field="readable_name"
        :errors="getErrors('permissions')"
      />
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "GrupoForm",
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