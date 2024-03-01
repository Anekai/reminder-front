<template>
  <LayoutForm
    formTitle="Permissão"
    apiPath="/permissions"
    listPath="/admin/permissao/list"
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
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "PermissaoForm",
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