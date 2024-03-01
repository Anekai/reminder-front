<template>
  <LayoutForm
    formTitle="Estudantes"
    apiPath="/estudantes"
    listPath="/cadastros/estudante/list"
    :model.sync="model"
    :errors.sync="errors"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome *"
        :value.sync="model.nome"
        :errors="getErrors('nome')"
      />

      <InputText
        id="codigo"
        label="Código *"
        :value.sync="model.codigo"
        :errors="getErrors('codigo')"
      />

      <InputText
        id="email"
        label="Email"
        type="email"
        :value.sync="model.email"
        :errors="getErrors('email')"
      />

      <InputText
        id="cpf"
        label="CPF"
        :value.sync="model.cpf"
        :errors="getErrors('cpf')"
      />

      <InputNumber
        id="semestre"
        label="Semestre *"
        :value.sync="model.semestre"
        :errors="getErrors('semestre')"
      />

      <InputSelect
        id="periodo_ingresso_id"
        label="Período de Ingresso *"
        path="/periodos"
        field="nome"
        :value.sync="model.periodo_ingresso_id"
        :errors="getErrors('periodo_ingresso_id')"
      />

      <InputSelect
        id="periodo_formatura_id"
        label="Período de Formatura"
        path="/periodos"
        field="nome"
        :value.sync="model.periodo_formatura_id"
        :errors="getErrors('periodo_formatura_id')"
      />
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "EstudanteForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
    }
  },
  mounted() {
    if (!this.$route.query.id) {
      this.model = {
        semestre: 1
      }
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
  },
}
</script>