<template>
  <LayoutList
    title="Períodos"
    apiPath="/periodos"
    formPath="/cadastros/periodo/form"
    :model="model"
    :order="order"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome"
        :value.sync="model.nome.value"
      />

      <InputDatePeriod
        label="Data Inicial"
        id_1="dt_inicial_inicio"
        id_2="dt_inicial_fim"
        :value_1.sync="model.dt_inicial_inicio.value"
        :value_2.sync="model.dt_inicial_fim.value"
      />

      <InputDatePeriod
        label="Data Final"
        id_1="dt_final_inicio"
        id_2="dt_final_fim"
        :value_1.sync="model.dt_final_inicio.value"
        :value_2.sync="model.dt_final_fim.value"
      />
    </template>
    <template slot="header">
      <th scope="col">
        Nome
      </th>
      <th scope="col" style="width: 145px">
        Data Inicial
      </th>
      <th scope="col" style="width: 145px">
        Data Final
      </th>
      <th scope="col" style="width: 100px">
        Estudantes Ingressados
      </th>
      <th scope="col" style="width: 100px">
        Estudantes Formados
      </th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.nome }}
      </td>
      <td>
        {{ row.dt_inicial }}
      </td>
      <td>
        {{ row.dt_final }}
      </td>
      <td>
        {{ row.estudantes_ingressados }}
      </td>
      <td>
        {{ row.estudantes_formados }}
      </td>
    </template>
  </LayoutList>
</template>

<script>
export default {
  name: "PeriodoList",
  data() {
    return {
      model: {
        nome: {
          field: "nome",
          operator: "ilike",
          value: null
        },
        dt_inicial_inicio: {
          field: "dt_inicial",
          operator: ">=",
          value: null
        },
        dt_inicial_fim: {
          field: "dt_inicial",
          operator: "<=",
          value: null
        },
        dt_final_inicio: {
          field: "dt_final",
          operator: ">=",
          value: null
        },
        dt_final_fim: {
          field: "dt_final",
          operator: "<=",
          value: null
        },
      },
      order: [
        {
          field: "nome",
          type: "ASC"
        }
      ]
    }
  },
}
</script>