<template>
  <LayoutList
    ref="list"
    title="Módulos"
    apiPath="/modulos"
    formPath="/cadastros/modulo/form"
    :model="model"
    :order="order"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome"
        :value.sync="model.nome.value"
      />

      <InputSimpleSelect
        id="tipo"
        label="Tipo"
        :options="tipo"
        :value.sync="model.tipo.value"
      />

      <InputNumber
        id="semestre"
        label="Semestre"
        :value.sync="model.semestre.value"
      />
    </template>
    <template slot="header">
      <th scope="col">Nome</th>
      <th scope="col" style="width: 110px;">Tipo</th>
      <th scope="col" style="width: 100px; text-align: right">Semestre</th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.nome }}
      </td>
      <td>
        {{ row.tipo == 'TEORICO' ? 'Teórico' : 'Prático' }}
      </td>
      <td style="text-align: right">
        {{ row.semestre }}
      </td>
    </template>
  </LayoutList>
</template>

<script>
export default {
  name: "ModuloList",
  data() {
    return {
      model: {
        nome: {
          field: "nome",
          operator: "ilike",
          value: null
        },
        tipo: {
          field: "tipo",
          operator: "=",
          value: null
        },
        semestre: {
          field: "semestre",
          operator: "=",
          value: null
        },
      },
      order: [
        {
          field: "nome",
          type: "ASC"
        }
      ],
      tipo: {
        TEORICO: "Teórico",
        PRATICO: "Prático",
      }
    }
  },
}
</script>