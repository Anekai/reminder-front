<template>
  <LayoutList
    ref="list"
    title="Professores"
    apiPath="/professores"
    formPath="/cadastros/professor/form"
    :model="model"
    :order="order"
  >
    <template slot="form">
      <InputText
        id="nome"
        label="Nome"
        :value.sync="model.nome.value"
      />
    </template>
    <template slot="header">
      <th scope="col">Nome</th>
    </template>
    <template slot="list" slot-scope="{ row }">
      <td>
        {{ row.nome }}
      </td>
    </template>
  </LayoutList>
</template>

<script>

export default {
  name: "ProfessorList",
  data() {
    return {
      model: {
        nome: {
          field: "nome",
          operator: "ilike",
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