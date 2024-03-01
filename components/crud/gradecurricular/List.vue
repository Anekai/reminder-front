<template>
  <LayoutList
    title="Grades Curriculares"
    apiPath="/grades-curriculares"
    formPath="/cadastros/grade-curricular/form"
    :model="model"
  >
    <template slot="form">
      <InputSelect
        id="periodo_id"
        label="Período"
        path="/periodos"
        field="nome"
        :value.sync="model.periodo_id.value"
      />

      <InputSelect
        id="modulo_id"
        label="Módulo"
        path="/modulos"
        field="nome"
        :value.sync="model.modulo_id.value"
      />

      <InputSelect
        id="local_id"
        label="Local"
        path="/locais"
        field="nome"
        :value.sync="model.local_id.value"
      />

      <InputSimpleSelect
        id="tipo"
        label="Tipo"
        :options="tipos"
        :value.sync="model.tipo.value"
      />

      <InputNumber
        id="semestre"
        label="Semestre"
        :value.sync="model.semestre.value"
      />
    </template>
    <template slot="header">
      <th scope="col">
        Período
      </th>
      <th scope="col">
        Módulo
      </th>
      <th scope="col">
        Local
      </th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.nome_periodo }}
      </td>
      <td>
        {{ row.nome_modulo }}
      </td>
      <td>
        {{ row.nome_local }}
      </td>
    </template>
  </LayoutList>
</template>

<script>
export default {
  name: "GradeCurricularList",
  data() {
    return {
      model: {
        periodo_id: {
          field: "grade_curricular.periodo_id",
          operator: "=",
          value: null
        },
        modulo_id: {
          field: "grade_curricular.modulo_id",
          operator: "=",
          value: null
        },
        local_id: {
          field: "grade_curricular.local_id",
          operator: "=",
          value: null
        },
        tipo: {
          field: "grade_curricular.tipo",
          operator: "=",
          value: null
        },
        semestre: {
          field: "grade_curricular.semestre",
          operator: "=",
          value: null
        },
      },
      tipos: {
        TEORICO: 'Teórico',
        PRATICO: 'Prático'
      }
    }
  },
}
</script>