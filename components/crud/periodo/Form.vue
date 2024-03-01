<template>
  <LayoutForm
    formTitle="Período"
    apiPath="/periodos"
    listPath="/cadastros/periodo/list"
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

      <div class="row">
        <div class="col-6">
          <InputDate
            id="dt_inicial"
            label="Data Inicial *"
            :value.sync="model.dt_inicial"
            :errors="getErrors('dt_inicial')"
          />
        </div>
        <div class="col-6">
          <InputDate
            id="dt_final"
            label="Data Final"
            :value.sync="model.dt_final"
            :errors="getErrors('dt_final')"
          />
        </div>
      </div>

      <InputNumber
        id="quantidade_dias"
        label="Duração (Dias)"
        :value.sync="model.quantidade_dias"
        :errors="getErrors('quantidade_dias')"
      />

      <div class="row">
        <div class="col-6">
          <InputNumber
            id="estudantes_ingressados"
            label="Estudantes Ingressados"
            :value.sync="model.estudantes_ingressados"
            :errors="getErrors('estudantes_ingressados')"
          />
        </div>
        <div class="col-6">
          <InputNumber
            id="estudantes_formados"
            label="Estudantes Formados"
            :value.sync="model.estudantes_formados"
            :errors="getErrors('estudantes_formados')"
          />
        </div>
      </div>

      <InputSimpleSelect
        id="status"
        label="Status *"
        :showEmptyValue="false"
        :options="status"
        :value.sync="model.status"
        :errors="getErrors('status')"
      />
    </template>
  </LayoutForm>
</template>

<script>
import globalMixin from "@/lib/global"

export default {
  name: "PeriodoForm",
  mixins: [globalMixin],
  data() {
    return {
      model: {},
      errors: {},
      status: {
        ABERTO: "Aberto",
        EM_PROCESSAMENTO: "Em processamento",
        FECHADO: "Fechado",
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