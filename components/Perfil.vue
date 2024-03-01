<template>
  <LayoutForm
    formTitle="Perfil"
    apiPath="/dados-usuario"
    :model.sync="model"
    :showDeleteButton="false"
    :errors.sync="errors"
  >
    <template slot="form">
      <InputText
        id="name"
        label="Nome"
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
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "Perfil",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
    }
  },
  async created() {
    let response = await this.requestAPI('GET', '/authenticated-user')

    this.model = response.data
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